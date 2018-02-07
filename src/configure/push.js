import  {send} from'../request'
import {
    pushInstallation,
    updateInstallation
} from '../request/leanCloud'
import  PushNotification from 'react-native-push-notification'
import DeviceInfo from 'react-native-device-info'

import {
    Platform,
    DeviceEventEmitter,
    NativeModules,
} from 'react-native'
import store from '../redux/configureStore'
import {doReceiveNotify} from './pushReceive'
import {dataStorage} from '../redux/actions/util'
import {user} from '../request/LCModle'
export default function pushConfig() {


    Platform.OS == 'ios' && PushNotification.setApplicationIconBadgeNumber(0)


    PushNotification.configure({

        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (value) {
            push(value.token)
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function (notification) {
            console.log('NOTIFICATION:', notification);
            if(notification.foreground && !notification.data.silent){
                // Toast.show(notification.message)
                store.dispatch(dataStorage('notify',{show:true,notification}))
            }else {
                doReceiveNotify(notification)
            }
        },

        // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
        senderID: "YOUR GCM SENDER ID",

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         */
        requestPermissions: true,
    });
    if (Platform.OS != 'ios') {


        const LeanCloudPushNative = NativeModules.LeanCloudPush;


        LeanCloudPushNative.getInstallationId().then(id=>{
            push(id)
        })

        LeanCloudPushNative.getInitialNotification().then((res)=> {
            console.log('InitialNotification:', res)
        }).catch((err)=> {
            console.log('message:', err.message)
        })

        DeviceEventEmitter.addListener(LeanCloudPushNative.ON_RECEIVE, (res) => {
            const data= JSON.parse(res.data);
            const foreground = res.foreground === '1'
            const notification = {'data': data, 'foreground': foreground}
            console.log("数据", res)
            if (!notification.data.silent && notification.foreground) {
                store.dispatch(dataStorage('notify', {show: true, notification}))
            } else {
                doReceiveNotify(notification)
            }
        });
        DeviceEventEmitter.addListener(LeanCloudPushNative.ON_ERROR, (res) => {
            console.log('ON_ERROR:', res)
        });

    }

}

let InstallationID
export function push(token) {
    // console.log('staticId:', staticId);
    if(token){
        const param = pushInstallation(Platform.OS,token)
        // console.log('push param:', param);
        send(param).then(res => res.json()).then(res =>{
            // console.log('response:',res)
            // store.dispatch(dataStorage('InstallationID',res.objectId))
            InstallationID = res.objectId
            const state =store.getState()
            const data = state.user.data
            if(data && data.objectId){
                updatePush(user(data.objectId))
            }
        })
    }
}



export function updatePush(owner) {
    if(InstallationID){

        const profile ={}
        if(Platform.OS === 'ios'){
            const devP = __DEV__ ? "dev" : "prod"
            const getBundleId = DeviceInfo.getBundleId()
            const enp = getBundleId === 'com.rn.combo' ? "":"_ep"

            profile.deviceProfile =  devP + enp

        }

        const param = updateInstallation(InstallationID,{...owner,
            badge:0,
            ...profile,
        })

        send(param).then((response)=>{
            console.log('response:',response)
        })
    }
}
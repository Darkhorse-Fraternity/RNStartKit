import  {send} from'../request'
import {pushInstallation} from '../request/leanCloud'
import Toast from 'react-native-simple-toast';
import  PushNotification from 'react-native-push-notification'

import DeviceInfo from 'react-native-device-info'
import {
    Platform,
    DeviceEventEmitter,
    NativeModules,
} from 'react-native'

export default function pushConfig() {


    Platform.OS == 'ios' && PushNotification.setApplicationIconBadgeNumber(0)


    PushNotification.configure({

        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (value) {
            console.log('tokenValue:', value)
            const param = pushInstallation(value.os, value.token)
            send(param).then((response)=> {
                console.log('push Registe Success:', response)
            })
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function (notification) {
            console.log('NOTIFICATION:', notification);
            if (notification.foreground) {
                Toast.show(notification.message)
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
            const param = pushInstallation(Platform.OS,id)
            send(param).then((response)=>{
                console.log('response:',response)
            })

        })

        LeanCloudPushNative.getInitialNotification().then((res)=> {
            console.log('InitialNotification:', res)
        }).catch((err)=> {
            console.log('message:', err.message)
        })

        DeviceEventEmitter.addListener(LeanCloudPushNative.ON_RECEIVE, (res) => {
            console.log('ON_RECEIVE:', res.data)
            Toast.show(res.data.toString())
        });
        DeviceEventEmitter.addListener(LeanCloudPushNative.ON_ERROR, (res) => {
            console.log('ON_ERROR:', res)
        });

    }

}
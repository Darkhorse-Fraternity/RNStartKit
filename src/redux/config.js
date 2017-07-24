/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import {loadUserData,loadAccount} from '../util/XGlobal'
// import jsCheckUpdate from '../../util/checkUpdate'
// import {lockToPortrait} from 'react-native-orientation'
// import umeng from '../util/umeng'
import React, {
    Platform,
    UIManager,
    ToastAndroid,
    StatusBar,
    BackAndroid,
    BackHandler,
    NetInfo
} from 'react-native';
import {loginSucceed,_loginFailed} from './actions/login'
// import {navigatePush} from './actions/nav'
import pushConfig from '../configure/push'
import {dataStorage} from '../redux/actions/util'
export const PRE_CONFIG_STATU = 'PRE_CONFIG_STATU'
import { NavigationActions } from 'react-navigation';

import {pop} from './nav'
import {dayNotification} from '../configure/localNotification'


//前置配置 在一进程序的时候就会
/**
 * 用于系统前置配置。
 */
function _preConfig() {

    // StatusBar.backgroundColor = 'white'
    //加载是否是第一次进入。
    // loadFirstJoin()

    // 加载缓存设置到公共参数


    //热跟新
    // jsCheckUpdate();


    // lockToPortrait();
    //配置友盟信息
    // umeng.configure();

    if (Platform.OS != 'ios') {
        UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    // Platform.OS=='ios'&& StatusBar.setBarStyle('light-content', true);

    pushConfig()




    dayNotification()


}


let lastBackPressed: number = 0;

function _backAnroid (getState) {
    // const BackHandler =  BackHandler || BackAndroid
    BackHandler.addEventListener('hardwareBackPress', ()=> {
        const state = getState().nav;
        const index = state.index;
        //idnex 前两个分别是登录和tabview
        if (index > 0) {
            pop();
            return true;
        }
        let times = Date.now();
        if (times - lastBackPressed >= 2500) {
            //再次点击退出应用
            lastBackPressed = times;
            ToastAndroid.show("再按一次退出应用", 0);
            return true;
        }
        lastBackPressed = 0;
        return false;
    });
}

function _isConnected(dispatch) {
    NetInfo.isConnected.addEventListener(
        'NetInfo_IsConnected',
        (isConnected)=>{
           // console.log('isConnected:', isConnected);
            dispatch(dataStorage('isConnected',isConnected))
        }
    );
}


export function preConfig():Function {
    _preConfig();

    return (dispatch,getState) =>{
        Platform.OS != 'ios' && _backAnroid(getState)
        _isConnected(dispatch)
        // dispatch(tabSwitch(0))
        //dispatch(navigatePush({key:'Home',applyAnimation:false}))
        loadUserData().then((response)=>{
            dispatch(loginSucceed(response))
            // console.log('test:',response)
            // dispatch(NavigationActions.navigate({ routeName: 'Home'}))
            dispatch(__preConfigResult())
        }).catch((error)=>{
            console.log('loadUserDataError:',error.message)
            dispatch(_loginFailed())
        });

    }

}

function __preConfigResult():Object {

    return {
        type: PRE_CONFIG_STATU,
        status:'done',
    };
}


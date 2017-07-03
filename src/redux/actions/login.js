/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import {request,send} from '../../request';
// import {requestLogin, requestUsersByMobilePhone,getUserByID} from '../../request/leanCloud';
import {leancloud_installationId} from '../../configure/push'
import {appRegister,
    appLogin,
    appLogout,
    getUserInfo,
} from '../../request/qzapi'
import {saveAccount,saveUserData, loadAccount, clearUserData} from '../../util/XGlobal'
// import {
//     navigatePush,
//     navigatePop,
//     navigateClearMiddleScene,
//     navigatePopToIndex,
//     navigateReplaceIndex
// } from './nav'
import { NavigationActions } from 'react-navigation';
import {setLeanCloudSession,setAPPAuthorization} from '../../configure'
// *** Action Types ***
export const ACCOUNT_CHANGE = 'ACCOUNTTEXT_CHANGE'
export const PASSWORD_CHANGE = 'PASSWORD_CHANGE'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCEED = 'LOGIN_SUCCEED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOAD_ACCOUNT = 'LOAD_ACCOUNT'
export const LOGOUT = 'LOGOUT'
export const UPDATE_USERDATA = 'UPDATE_USERDATA'
import {Toast} from '../../util'
//当为异步的时候这么写，返回一个函数
export function loadAccountAction():Function {

    return dispatch => {
        return loadAccount(ret => {
            dispatch(_loadAccount(ret));
        });
    }
}
function _loadAccount(ret:string):Object {
    return {
        type: LOAD_ACCOUNT,
        accountText: ret,
        passwordText: '',
    }
}

export function accountTextChange(text:string):Object {
    return {
        type: ACCOUNT_CHANGE,
        accountText: text,
    }
}

export function passwordTextChange(text:string):Object {
    return {
        type: ACCOUNT_CHANGE,
        passwordText: text,
    }
}

/**
 * 这边做了一个异步范例
 * dipacth 能够实现其异步，是通过 redux-thund 这个库来实现异步的。
 *
 */

/**
 * 登录
 * @param  {[type]} state:Object [description]
 * @return {[type]}              [description]
 */
export function login(state:Object):Function {

    // loginRequest.params.user_name = state.accountText;
    // loginRequest.params.password = state.passwordText;



    return  async (dispatch) => {
        dispatch(_loginRequest());


          try {
              const parame = appLogin(state.accountText, state.passwordText,leancloud_installationId);
              const response = await send(parame)
              if (response.isSuccess === '1') {
                  //加入sessionToken

                  dispatch(NavigationActions.back())
                  dispatch(_loginSucceed(response,state.accountText));
                  dispatch(passwordTextChange(''))
                  // dispatch(navigatePush('TabView'));
                  // Router.pop()


              } else {
                  Toast.show(response.msg)

                  dispatch(_loginFailed(response));
                  return;
              }
              const param = getUserInfo()

          }catch (e){
              console.log('test:', e.message);
              Toast.show(e.message)
              dispatch(_loginFailed(e.message));
          }

        // return request(parame, (response)=> {
        //
        //     if (response.data.isSuccess === '1') {
        //         //加入sessionToken
        //         dispatch(_loginSucceed(response,state.accountText));
        //         // dispatch(navigatePush('TabView'));
        //         // Router.pop()
        //         dispatch(NavigationActions.back())
        //
        //     } else {
        //         Toast.show(response.data.msg)
        //         dispatch(_loginFailed(response));
        //     }
        // });
    }
}


/**
 * 注册
 * @param  {[type]} state:Object [description]
 * @return {[type]}              [description]
 */
export function register(state:Object):Function {

    const params = appRegister(state.mobileNum,state.newPwd);

    return dispatch => {
        // dispatch(_loginRequest());
        request(params, function (response) {
            console.log('test:', response);
            if (response.data.isSuccess === '1') {
                // dispatch(_loginSucceed(response));
                // dispatch(navigatePop());
                // Router.pop()

                dispatch(NavigationActions.back())
                dispatch(NavigationActions.back())
                Toast.show('注册成功~!')
                // dispatch(NavigationActions.back())

            } else {
                Toast.show(response.data.msg)
                // dispatch(_loginFailed(response));
            }
        });
    }
}



function _loginRequest():Object {
    return {
        type: LOGIN_REQUEST,
        loaded: true,
    }
}

function _loginSucceed(response:Object,accountText:string):Object {
    const data = {...response,mobileNum:accountText,selectCommunityNum:0}
    saveUserData(data);
    saveAccount(accountText);
    return loginSucceed(data);
}

export function loginSucceed(data:Object):Object {
    //保存登录信息。
    // setLeanCloudSession(data.sessionToken);
    setAPPAuthorization(data.authorization);
    return {
        type: LOGIN_SUCCEED,
        loaded: false,
        accountText: data.mobileNum,
        data: data,
    }

}

function _loginFailed(response:Object):Object {
    return {
        type: LOGIN_FAILED,
        loaded: false
    }
}


export function logout():Function {

        console.log('test:', 'hhh');
    return async (dispatch,getState) => {

        try {
            const state = getState()
            const parame = appLogout(state.login.data.appUserId||'');
            const response = await send(parame)
            if (response.isSuccess === '1') {
                //加入sessionToken


                // dispatch(navigatePush('TabView'));
                // Router.pop()
                clearUserData();
                dispatch(logout2());//先退出
                console.log('test:', 'sssss');
                dispatch(NavigationActions.navigate({ routeName: 'Login'}))



                return loadAccount(ret => {
                    //加载本地数据。
                    dispatch(_loadAccount(ret));
                });
            } else {
                Toast.show(response.msg)

                // dispatch(_loginFailed(response));
            }
        }catch (e){
            console.log('test:', e.message);
            Toast.show(e.message)
            // dispatch(_loginFailed(e.message));
        }



    }


}

function logout2() {
    return {
        type: LOGOUT,
        index: 0,
    }
}

export function updateUserData(data:Object){
    return {
      type:UPDATE_USERDATA,
      data:data,
    }
}


export  function getUserByObjectID(objectID:string,callBack:Function) :Function{
    return dispatch => {
        dispatch(_loginRequest());
       const param = getUserByID(objectID);
        return request(param, (response)=> {

            if (response.statu) {
                //加入sessionToken
                dispatch(_loginSucceed(response));
                // dispatch(navigatePush('TabView'));
                dispatch(NavigationActions.back())
                dispatch(NavigationActions.back())
            } else {
                dispatch(_loginFailed(response));
            }
            callBack(response);
        });
    }
}

/**
 * Created by lintong on 10/19/16.
 * @flow
 */
'use strict';
import {send} from '../../request'
export const REQUEST_LOAD = 'REQUEST_LOAD'
export const REQUEST_SUCCEEED = 'REQUEST_SUCCEEED'
export const REQUEST_FAILED = 'REQUEST_FAILED'
export const REQUESR_CHANGE_DATA = 'REQUESR_CHANGE_DATA'
import Toast from 'react-native-simple-toast';
import {logout} from './login'
import  store from '../configureStore'
import {schemas} from '../scemes'
import {normalize} from 'normalizr';
import {addEntities} from '../module/normalizr'
export const RESCODE = 'code'
export const SUCCODE = -1000
export const MSG = 'error'
export const DATA = 'data'


export function reqY(params) {
    return send(params).then((response)=> {
        const contentType = response.headers.get("content-type")
        let responseData  = contentType.indexOf("application/json") !== -1 ? response.json() : {}
        console.log('test:', response);
        //对leancloud 的数据格式进行包装，做成通用型数据
        if(!params.host && response.ok){

            responseData = {data:responseData,code : -1000}
        }


        return responseData;
    })
}

export function reqS(params) {
    // const state = store.getState()
    // const isConnected = state.util.get('isConnected')
    // if(!isConnected) return
    return reqY(params).then(response => {

        // if (response[RESCODE] === "2" || response[RESCODE] === "3") {
        //     console.log('response[RESCODE]:', response[RESCODE]);
        //     store.dispatch(logout())
        // }
        return response
    })
}

//加入msg
export function reqM(params) {
    return reqS(params).then(response => {
        if(response[RESCODE]){
            // response[RESCODE] !== SUCCODE && console.log('Error:', response);
            response[RESCODE] !== SUCCODE && Toast.show(response.msg)
        }

        return response
    })
}
export function normalizr(key, data) {
    //根据key 进行normalizr处理
    return normalize(data, schemas[key]);
}

export function cleanData(key, response, option) {
    // let data = response[DATA] ? response[DATA] : response
    let data = response
    data = !option.dataMap ? data : option.dataMap(data) || data

    if (option.normalizr && data) {
        data = normalizr(key, data)
        const dispatch = store.dispatch
        data && data.entities&&  dispatch(addEntities(data.entities))
        return data.result[DATA]
    }
    return data;
}


//加入 根据key 存入store
export function req(params: Object, key: string, option: Object = {}) {
    if (!key) {
        return reqM(params)
    }
    const dispatch = store.dispatch
    dispatch(requestStart(key))
    return reqM(params).then(response => {
            const data = cleanData(key, response, option)
            dispatch(requestSucceed(key, data))
              return response
    }).catch(e => {
        console.warn('message:', e.message);
        Toast.show(e.message,Toast.LONG)
        dispatch(requestFailed(key, e.message))
    })
}

export function load(params: Object, key: stringg) {
    return req(params, key, {'normalizr': true})
}


export function request(key: string, params: Object, callBack: Function): Function {
    const callback2 = callBack
    return (dispatch) => {

        dispatch(requestStart(key));//当page 不为0 的时候则表示不是加载多页。
        reqM(params).then(response => {
            if (callback2) callback2(response)
            if (response[RESCODE] === SUCCODE) {
                dispatch(requestSucceed(key, response))
            } else {
                dispatch(requestFailed(key, response.msg))
            }

        }).catch(e => {
            Toast.show(e.message)
            dispatch(requestFailed(key, e.message))
        })
    }
}

function requestSucceed(key: string, data: Object): Object {
    return {
        type: REQUEST_SUCCEEED,
        load: false,
        payload: data,
        key,
    }

}


/**
 * 请求失败
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
function requestFailed(key: string, err: any): Object {
    return {
        type: REQUEST_FAILED,
        load: false,
        key,
        err,
    }
}

/**
 * 开始请求，使得loaded 变动。
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
function requestStart(key: string): Object {
    return {
        type: REQUEST_LOAD,
        load: true,
        key,
    }
}

export function reqChangeData(key: string, data: Object): Object {
    return {
        type: REQUESR_CHANGE_DATA,
        payload: data,
        key,
    }
}
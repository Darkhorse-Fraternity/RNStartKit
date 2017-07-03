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
import {Toast} from '../../util'
import {logout} from './login'
import  store from '../configureStore'
import {schemas} from '../scemes'
import {normalize} from 'normalizr';
import {addEntities} from '../module/normalizr'
export const RESCODE = 'isSuccess'
export const SUCCODE = '1'
export const MSG = 'msg'
export const DATA = 'data'

export function reqS(params) {
    // const state = store.getState()
    // const isConnected = state.util.get('isConnected')
    // if(!isConnected) return
    return send(params).then(response => {
        if (response[RESCODE] === "2" || response[RESCODE] === "3") {
            console.log('response[RESCODE]:', response[RESCODE]);
            store.dispatch(logout())
        }
        return response
    })
}

//加入msg
export function reqM(params) {
    return reqS(params).then(response => {
        response[RESCODE] !== SUCCODE && console.log('Error:', response);
        response[RESCODE] !== SUCCODE && Toast.show(response.msg)
        return response
    })
}
export function normalizr(key, data) {
    //根据key 进行normalizr处理
    return normalize(data, schemas[key]);
}

export function cleanData(key, response, option) {
    let data = response[DATA] ? response[DATA] : response
    data = !option.dataMap ? data : option.dataMap(data) || data


    if (option.normalizr && data) {
        data = normalizr(key, data)
        const dispatch = store.dispatch
        dispatch(addEntities(data.entities))
        return data.result[key]
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
        if (response[RESCODE] === SUCCODE) {
            const data = cleanData(key, response, option)
            dispatch(requestSucceed(key, data))
        } else {
            dispatch(requestFailed(key, response[MSG]))
        }
        return response
    }).catch(e => {
        console.log('message:', e.message);
        // Toast.show(e.message)
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
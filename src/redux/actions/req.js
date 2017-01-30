/**
 * Created by lintong on 10/19/16.
 * @flow
 */
'use strict';
import {send} from '../../request'
export const REQUEST_LOAD = 'REQUEST_LOAD'
export const REQUEST_SUCCEEED = 'REQUEST_SUCCEEED'
export const REQUEST_FAILED = 'REQUEST_FAILED'

export function request(key: string, params: Object): Function {

    return (dispatch) => {
        dispatch(requestStart(key));//当page 不为0 的时候则表示不是加载多页。
        send(params).then(response => {
            dispatch(requestSucceed(key, response))
        }).catch(e => {
            dispatch(requestFailed(key, e.message))
        })
    }
}

function requestSucceed( key: string,data: Object): Object {
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
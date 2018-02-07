/**
 * Created by lintong on 10/19/16.
 * @flow
 */
'use strict';

import {
    LIST_FIRST_JOIN,
    LIST_NO_DATA,
    LIST_LOAD_DATA,
    LIST_LOAD_MORE,
    LIST_LOAD_NO_MORE,
    LIST_LOAD_ERROR,
    LIST_NORMAL,
} from '../../components/Base/BaseSectionView'

export const LIST_START = 'LIST_START'
export const LIST_FAILED = 'LIST_FAILED'
export const LIST_SUCCEED = 'LIST_SUCCEEDT'
export const LIST_SELECT = 'LIST_SELECT'
export const LIST_DELETE = 'LIST_DELETE'
export const LIST_ADD = 'LIST_ADD'
import Toast from 'react-native-simple-toast';

const pageSize = 20;
import {addNormalizrEntity} from '../module/normalizr'
/**
 * 保证加载的时候，同个请求不窜行。
 */

import {
    RESCODE,
    SUCCODE,
    DATA,
    MSG,
    reqA,
    cleanData
} from './req'

const pageKey = 'pageIndex'

export function listReq(key: string = '', params: Object, more: bool = false, option: Object = {}) {
    return (dispatch, getState) => {
        const listKey = option.sKey || key
        const page = !more ? 0 : getState().list.getIn([listKey, 'page']) + 1;
        const load = getState().list.getIn([listKey, 'loadStatu'])
        if (load != LIST_LOAD_DATA && load != LIST_LOAD_MORE) {//not serial
            // params.params[pageKey] = page + '';
            dispatch(_listStart(page !== 0, load == undefined, listKey));//当page 不为0 的时候则表示不是加载多页。
            reqA(params).then(response => {
                if (response[RESCODE]) {
                    if (response[RESCODE] === SUCCODE) {
                        const data = cleanData(key, response[DATA], {...option, 'normalizr': true})
                        if (!data) {
                            console.log(key, response[DATA], '数据为空');
                            return dispatch(_listFailed(listKey));
                        }
                        dispatch(_listSucceed(data, page, listKey));
                    } else {
                        console.log('response:', response);
                        dispatch(_listFailed(listKey, response[MSG]))
                    }
                }
            }).catch((e) => {
                console.log('error:', e.message)
                Toast.show(e.message)
                dispatch(_listFailed(listKey));
            })

        }
    }
}


export function listLoad(key: string, params: Object, more: bool = false, dataMap: Function): Function {
    return (dispatch, getState) => {
        const page = !more ? 0 : getState().list.getIn([key, 'page']) + 1;
        const load = getState().list.getIn([key, 'loadStatu'])
        if (load != LIST_LOAD_DATA && load != LIST_LOAD_MORE) {//not serial
            params.params[pageKey] = page + '';
            // const newParams = limitSearch(path,page,pageSize,params);
            dispatch(_listStart(page !== 0, load == undefined, key));//当page 不为0 的时候则表示不是加载多页。
            req(params).then(response => {
                // console.log('response:', response);
                if (response[RESCODE] === SUCCODE) {
                    const res = response[DATA] || response
                    let data = dataMap ? dataMap(res) : res.results
                    // console.log('response:', data);
                    dispatch(_listSucceed(data, page, key));
                } else {
                    dispatch(_listFailed(key));
                }

            }).catch((e) => {
                console.log('error:', e.message)
                Toast.show(e.message)
                dispatch(_listFailed(key));
            })

        }
    }
}


/**
 * 请求成功
 * @param  {[type] data:Object [成功返回的数据]
 * @param  {[type]} page:number =  0 [当前的页数。]
 * @return {[type]}             [description]
 */

function _listSucceed(data: Object, page: number = 0, key: string): Object {
    let loadStatu = LIST_NORMAL
    if (data.length < pageSize) {
        loadStatu = LIST_LOAD_NO_MORE
    }
    if (page === 0 && data.length === 0) {
        loadStatu = LIST_NO_DATA
    }
    return {
        type: LIST_SUCCEED,
        page,
        loadStatu: loadStatu,
        data,
        key,
    }

}


/**
 * 请求失败
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
function _listFailed(key: string): Object {

    return {
        type: LIST_FAILED,
        loadStatu: 'LIST_LOAD_ERROR',
        key,
    }
}

/**
 * 开始请求，使得loaded 变动。
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
function _listStart(isLoadMore: bool, isFirst: bool, key: string): Object {
    let loadStatu = LIST_FIRST_JOIN
    if (!isFirst) {
        loadStatu = isLoadMore ? LIST_LOAD_MORE : LIST_LOAD_DATA
    }
    return {
        type: LIST_START,
        loadStatu: loadStatu,
        key,
    }
}


export function clear(key: string, rowID: number, loadStatu: string) {
    return {
        type: LIST_DELETE,
        rowID,
        key,
        loadStatu
    }
}

//用于normalizr 数据化后的处理，find value 对应的index
export function claerByID(key: string, objID: string) {
    return (dispatch, getState) => {
        const list = getState().list.get(key).get("listData").toJS()
        const rowID = list.indexOf(objID)
        if (rowID > -1) {
            const loadStatu = list.length <= 1 ? LIST_NO_DATA : LIST_NORMAL
            return dispatch(clear(key, rowID, loadStatu))
        }
    }
}

export function add(key, data) {
    return {
        type: LIST_ADD,
        key,
        data,
        loadStatu: LIST_NORMAL,
    }
}

export function addListNormalizrEntity(key, data): Function {
    return (dispatch) => {
        dispatch(addNormalizrEntity(key, data))
        // dispatch(addNormalizrEntities(key,data))
        dispatch(add(key, data.objectId))
    }
}
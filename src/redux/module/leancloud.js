/**
 * Created by lintong on 2016/11/6.
 * @flow
 */
'use strict';
import {limitSearch,classDelete,classCreatNewOne, classUpdate} from '../../request/leanCloud';
import {req} from'../actions/req'
import {listReq} from '../actions/list'
export function add(params: Object, key: string, option: Object = {}) {

    const lParams = classCreatNewOne(key,params)
    return req(lParams,key,option)
}

export function update(objectId: string,params: Object, key: string, option: Object = {}) {
    const lParams = classUpdate(key,objectId,params)
    return req(lParams,key,option)

}

export function remove(objectId: string, key: string, option: Object = {}) {

    const lParams = classDelete(key,objectId)
    return req(lParams,key,option)
}

export function search(more:bool,params: Object, key: string,option: Object,pageSize:number = 40) {

    return (dispatch, getState) => {
        const page = !more ? 0 : getState().list.getIn([key, 'page']) + 1;
        const lParams = limitSearch(key, page, pageSize, params)
        return dispatch(listReq(key, lParams,more, option))
    }
}
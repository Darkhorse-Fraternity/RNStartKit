/**
 * Created by lintong on 10/19/16.
 * @flow
 */
'use strict';



import {registerListKeys} from '../reqKeys'

import {
    LIST_START,
    LIST_FAILED,
    LIST_SUCCEED,
    LIST_SELECT,
    LIST_DELETE
} from '../actions/list'
import * as immutable from 'immutable';



const registerKeys = (keys = [])=>{
    const data = {
        loadStatu: 'LIST_FIRST_JOIN',
        page:0,
        listData: [],
    }
    const newKyes = {}
    keys.forEach((key)=>{
        newKyes[key] = data
    })
    return newKyes
}

const initialState = immutable.fromJS({...registerKeys(registerListKeys)});

export default function listState(state: immutable.Map<string,any> = initialState, action: Object) {
    switch (action.type) {

        case LIST_FAILED:
        case LIST_START:
            return state.setIn([action.key, 'loadStatu'], action.loadStatu);

        case LIST_SUCCEED:{

            return   state.updateIn([action.key],(oldObj)=>{
                const oldData = action.page ==0 ?{}:oldObj.get("listData") || {}
                const listData = {
                    loadStatu:action.loadStatu,
                    page:action.page,
                    listData:[...oldData,...action.data],//做排序去重
                }
                return immutable.fromJS(listData)
            })
        }

        case LIST_SELECT:
            return state.setIn([action.key, 'index'], action.index);
        case LIST_DELETE:{
            // state.deleteIn([action.key,'listData'])
            // console.log(action.key, action.rowID);
            // console.log('test:', state);
            return state.deleteIn([action.key,'listData',action.rowID])
        }

        default:
            return state;
    }
}


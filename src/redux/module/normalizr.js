/**
 * Created by lintong on 2016/11/6.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';


import {registerNormalizrKeys} from '../reqKeys'
const registerKeys = (keys = [])=>{
    const newKyes = {}
    keys.forEach((key)=>{
        newKyes[key] = {}
    })
    return newKyes
}

const initialState = immutable.fromJS( {...registerKeys(registerNormalizrKeys)});

export const ADD_NORMALIZR = 'ADD_NORMALIZR'

export function addEntities(data: Object): Object {
    return {
        type: ADD_NORMALIZR,
        payload: data,
    }
}


export default function itemState(state: immutable.Map<string,any> = initialState, action: Object) {
    switch (action.type) {

        case ADD_NORMALIZR:{

            // const { fromJS } = require('immutable')
            // const nested = fromJS({ a: { b: { d:{s:1,k:4}  } } })
            // const nested2 = nested.mergeDeep({ a: { b: {d:{s:2,m:3} } } })
            // console.log('nested2:', nested2.toJS());
            // { a: { b: { d:{s:2,m:3,k:4}  } } }  只会去覆盖 存在的属性，如eg

            return   state.mergeDeep(action.payload)
        }

        default:
            return state
    }

}
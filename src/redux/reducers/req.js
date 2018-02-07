/**
 * Created by lintong on 10/19/16.
 * @flow
 */
'use strict';




import {registerReqKeys} from '../reqKeys'

import {
    REQUEST_LOAD,
    REQUEST_FAILED,
    REQUEST_SUCCEEED,
    REQUESR_CHANGE_DATA
} from '../actions/req'



const registerKeys = (keys = [])=>{
    const data = {
        load: false,
        data: {},
    }
    const newKyes = {}
     keys.forEach((key)=>{
         newKyes[key] = data
    })
    return newKyes
}

import * as immutable from 'immutable';
const initialState = immutable.fromJS(
    {...registerKeys(registerReqKeys)}
);

export default function reqState(state: immutable.Map<string,any> = initialState, action: Object) {

    switch (action.type) {
        case REQUEST_LOAD:{
            return state.setIn([action.key,'load'], action.load);

        }
        case REQUEST_FAILED:{
            return state.mergeDeep({[action.key]:{load:action.load,err:action.err}});
        }
        case REQUEST_SUCCEEED:{
            return state.set(action.key,immutable.fromJS({
                load:action.load,
                data:action.payload
            }));
        }
        case REQUESR_CHANGE_DATA:{
            return state.mergeDeep({[action.key]:{data:action.payload}});
        }
        default:
            return state;
    }
}


/* @flow */

'use strict';


import {
    LOAD_AVATAR,
    DATA_STORAGE,
    UPLOAD_IMAGES
} from '../actions/util'
import * as immutable from 'immutable';
const initialUtilState = immutable.fromJS({
    loadAvatar: {
        statu: "success",
    }
});

export default function drawState(state: immutable.Map<string,any> = initialUtilState, action: Object) {
    switch (action.type) {
        case LOAD_AVATAR: {
            return state.setIn(['loadAvatar', 'statu'], action.statu);
        }

        case DATA_STORAGE: {
            const data = typeof action.data == 'object' ? immutable.fromJS(action.data) : action.data
            return state.set(action.key, data);
        }
        case UPLOAD_IMAGES:{
            return state.set(action.key, action.statu);
        }
        default:
            return state
    }

}

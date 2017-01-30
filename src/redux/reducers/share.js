/**
 * Created by lintong on 2016/11/6.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
const initialState = immutable.fromJS({});

export default function itemState(state: immutable.Map<string,any> = initialState, action: Object) {
    switch (action.type) {

        default:
            return state
    }

}
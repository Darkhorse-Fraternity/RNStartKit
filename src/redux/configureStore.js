/**
 * Created by lintong on 9/21/16.
 * @flow
 */
'use strict';

 import { createStore, applyMiddleware, compose,combineReducers } from 'redux';
 import thunk from 'redux-thunk';

import * as immutable from 'immutable';
 import { Platform } from 'react-native';
 import * as reducers from './reducers'
import {reducer as form} from 'redux-form';

import { AppNavigator } from '../components/Nav/navigators/AppNavigator';
import { NavigationActions } from 'react-navigation';
// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const StacksOverTabs = AppNavigator.router.getActionForPathAndParams('StacksOverTabs')
const initialNavState = AppNavigator.router.getStateForAction(
     // secondAction,
    tempNavState
);
function nav(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        case 'Login':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
        case 'Logout':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Login' }),
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
    switch (action.type) {
        case 'Login':
            return { ...state, isLoggedIn: true };
        case 'Logout':
            return { ...state, isLoggedIn: false };
        default:
            return state;
    }
}

 const reducer = combineReducers({
     ...reducers,
     form,
     nav,
     auth
 });


 const rootReducer = (state, action) => {
   if (action.type === 'LOGOUT') {
 	// 	umeng.pageEnd('设置');
 	// 	umeng.pageStart("登录");
     state = undefined
   }

 	if (action.type === "NAV_PUSH") {
    //  const navigationState =  state.route.navigationState
 	// 	umeng.pageStart(navigationState.routes[navigationState.index].title);
 	}else if(action.type === 'NAV_POP'){
 	// 	const navigationState =  state.route.navigationState;
 	// 	umeng.pageEnd(navigationState.routes[navigationState.index].title);
 	}

   return reducer(state, action)
 }
 const middlewares = [thunk];
 let enhancer;
 if (__DEV__) {
   const installDevTools = require('immutable-devtools');
   installDevTools(immutable);

   enhancer = compose(
     applyMiddleware(...middlewares),
     global.reduxNativeDevTools ?
       global.reduxNativeDevTools() :
       nope => nope
   );
   // enhancer = applyMiddleware(...middlewares);
 } else {
   enhancer = applyMiddleware(...middlewares);
 }




 // export default function configureStore(initialState) {
 //   const enhancer = compose(
 //     applyMiddleware(thunk),
 //     tools,//安卓无法使用，bug on
 //   );
 //   return createStore(rootReducer, initialState, enhancer);
 // }


// function configureStore(initialState:Object ={}) {
   const store = createStore(rootReducer, {}, enhancer);
   if (global.reduxNativeDevTools) {
     global.reduxNativeDevToolsCompose(store);
   }
   // return store;
 // }

export default store
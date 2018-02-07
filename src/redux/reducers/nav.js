/**
 * Created by lintong on 10/19/16.
 * @flow
 */
'use strict';
import { AppNavigator } from '../../components/Nav/navigators/AppNavigator';
import { NavigationActions } from 'react-navigation';

const firstAction = AppNavigator.router.getActionForPathAndParams('Tab');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const StacksOverTabs = AppNavigator.router.getActionForPathAndParams('StacksOverTabs')
const initialNavState = AppNavigator.router.getStateForAction(
    tempNavState
);
export default function nav(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        // case 'Login':
        //     nextState = AppNavigator.router.getStateForAction(
        //         NavigationActions.back(),
        //         state
        //     );
        //     break;
        // case 'Logout':
        //     nextState = AppNavigator.router.getStateForAction(
        //         NavigationActions.navigate({ routeName: 'Login' }),
        //         state
        //     );
        //     break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}
import {combineReducers} from 'redux'
// import {userManager} from '../../util/XGlobal'
import {
    TAB_SWITCH,
} from '../actions/tab'
//import {checkPhoneNum} from '../../util';
import {
    LOGIN_SUCCEED,
    LOGOUT,
} from '../actions/login'


//TODO:这边要做统一的tab 上 navBar 的管理，不让装载的view 做特殊处理。

/**
 * tabs:装载的view 的key
 * @type {Object}
 */

    // const my_lesson = require('../../../source/img/xy_courses/xy_courses.png');
    // const my_lesson_hover = require('../../../source/img/xy_courses_hover/xy_courses_hover.png');
    // const person_center = require('../../../source/img/xy_person/xy_person.png');
    // const person_center_hover = require('../../../source/img/xy_person_hover/xy_person_hover.png');
const unLoginTabs = [

        {
            key: 'Buy', name: 'logo-freebsd-devil', title: '抢购'
        },
        {
            key: 'RedPocket', name: 'logo-freebsd-devil', title: '红包'
        },
        {
            key: 'Order', name: 'logo-freebsd-devil', title: '订单'
        },
        {
            key: 'PersonCenter', name: 'ios-happy', title: '我的'
        },
    ]

const loginTabs = unLoginTabs

const initialTabState = {
    index: 0,
    tabs: unLoginTabs,
}

function tabState(state = initialTabState, action) {
    switch (action.type) {
        case TAB_SWITCH:
            // if (action.index == state.index) {
            //     return state
            // }
            return {
                ...state,
                index: action.index,
                navState:action.navState,
            }
        // case LOGIN_SUCCEED:
        //
        //     return {
        //         ...state,
        //         tabs: loginTabs,
        //         index:state.index ==0?0:2
        //     }
        case LOGOUT:
            return initialTabState

        default:
            return state;

    }


}


const tabReducers = combineReducers({
    tabState
})

export default tabReducers

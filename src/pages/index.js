import Home from './Home'
import PersonCenter from './PersonInfo'
import Order from './Order'
import theme from '../Theme'
import Withdraw from './Withdraw'
import Record from './Withdraw/Record'
import Discounts from  './Discounts'
import Explain from './Discounts/Explain'

export const route = {
    // Login: {screen: LoginView},
    Home: {screen: Home},
    Order: {screen: Order},
    PersonCenter: {screen: PersonCenter},
    Withdraw: {screen: Withdraw},
    Record: {screen: Record},
    Discounts: {screen: Discounts},
    Explain:{screen:Explain}
}

export const tabRoute = {
    Home: {
        screen: Home,
        path: '',
    },
    Order: {
        screen: Order,
        path: '',
    },
    PersonCenter: {
        screen: PersonCenter,
        path: '',
    },
}

export const initialRouteName = {
    initialRouteName: 'Home',
}

export const tabiCon = {
    Home: {
        label: "Home",
        color: theme.tabColor,
        activityColor: 'rgb(200,200,200)',
        icon: 'ios-home',
        name: '消息'
    },
    Order: {
        label: "Order",
        color: theme.tabColor,
        activityColor: 'rgb(200,200,200)',
        icon: "md-list-box",
        name: '消息包管理'
    },
    PersonCenter: {
        label: "Setting",
        color: theme.tabColor,
        activityColor: 'rgb(200,200,200)',
        icon: "md-person",
        name: '我的'
    },

}
// import Setting from './Setting'
import Home from './Home'
// import LoginView from './Setting/LoginView'
import PersonCenter from './PersonInfo/PersonCenter'
import PersonInfo from './PersonInfo'


export const route = {
    // Login: {screen: LoginView},
    Home: {screen: Home},
    PersonCenter: {screen: PersonCenter},
    PersonInfo: {screen: PersonInfo},
}

export const tabRoute = {
    Home: {
        screen: Home,
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
        color: '#F3AC41',
        activityColor: '#F0C98B',
        icon: 'md-sunny'
    },
    PersonCenter: {
        label: "Setting",
        color: '#F3AC41',
        activityColor: '#F0C98B',
        icon: "ios-happy"
    },

}
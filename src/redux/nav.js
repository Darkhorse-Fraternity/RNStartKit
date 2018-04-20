import  store from './configureStore'
import { NavigationActions } from 'react-navigation'

export function push(key,params) {
    store.dispatch( NavigationActions.navigate(key,params))
}

export function pop() {
    store.dispatch( NavigationActions.back())
}
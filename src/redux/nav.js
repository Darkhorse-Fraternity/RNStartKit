import  store from './configureStore'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
export function push(key) {
    const state = store.getState()
    const  navigation= addNavigationHelpers({ dispatch: store.dispatch, state: state.nav })

    navigation.navigate(key)
}

export function pop(key) {
    const state = store.getState()
    const  navigation= addNavigationHelpers({dispatch: store.dispatch, state: state.nav })
    navigation.pop(key)
    // store.dispatch(nav.navigatePop(key))
}
export function navigation() {
    const state = store.getState()
    return addNavigationHelpers({  dispatch:store.dispatch, state: state.nav })
}
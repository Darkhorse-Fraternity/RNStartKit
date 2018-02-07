/**
 * Created by lintong on 9/21/16.
 * @flow
 */
'use strict';


import React, {Component} from 'react'
import { Provider } from 'react-redux'
import {AppRegistry} from 'react-native';
import configureStore from './redux/configureStore'
import {preConfig} from './redux/config'
import AppWithNavigationState from './components/Nav/navigators/AppNavigator';
//启动初始配置
configureStore.dispatch(preConfig())
// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
// const store = configureStore()


// import App from './components/js/App'
class App extends Component {

	render() {
		return (
			<Provider store={configureStore}>
				{/*{Route(store)}*/}
				{/*<Route/>*/}
				<AppWithNavigationState />
			</Provider>
		)
	}
}

// var WhiteBoardRN = require('../example_advanced');
AppRegistry.registerComponent('RNStartKit', () => App);

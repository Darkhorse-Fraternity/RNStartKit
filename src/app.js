/**
 * Created by lintong on 9/21/16.
 * @flow
 */
'use strict';


import React, {Component} from 'react'
import { Provider } from 'react-redux'
import {AppRegistry} from 'react-native';
import configureStore from './redux/configureStore'
import Main from './pages/Main'
import Route from './pages'
// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
// const store = configureStore()
export default class App extends Component {

	render() {
		return (
			<Provider store={configureStore}>
				{/*{Route(store)}*/}
				<Main/>
			</Provider>
		)
	}
}

// var WhiteBoardRN = require('../example_advanced');
AppRegistry.registerComponent('RNStartKit', () => App);

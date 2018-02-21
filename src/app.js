/**
 * Created by lintong on 9/21/16.
 * @flow
 */
'use strict';


import React, {
    Component,
} from 'react'
import {
    Platform,
    StatusBar,
    Dimensions
} from 'react-native'
import {Provider} from 'react-redux'
import {AppRegistry, View} from 'react-native';

import configureStore from './redux/configureStore'
import {preConfig} from './redux/config'
import InfoBar from './components/InfoBar'
import AppWithNavigationState from './components/Nav/navigators/AppNavigator';
import {ThemeProvider} from 'styled-components'
import theme from './Theme'
// import Form from './components/Form/Form'
//启动初始配置
configureStore.dispatch(preConfig())
// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
// const store = configureStore()

const X_WIDTH = 375;
const X_HEIGHT = 812;
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');
const isIPhoneX = (() => {
    return (
        Platform.OS === 'ios' &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
            (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
    );
})();


// import App from './components/js/App'
class App extends Component {


    render() {
        return (
            <Provider store={configureStore}>
                {/*{Route(store)}*/}
                {/*<Route/>*/}
                <ThemeProvider theme={theme} >
                    <View style={{flex: 1}}>
                        {Platform.OS !== 'ios' && Platform.Version >= 20 && (
                            <StatusBar
                                translucent={true}
                                backgroundColor="transparent"
                                // barStyle="dark-content"
                            />
                        )}
                        <AppWithNavigationState/>
                        <InfoBar/>
                        {/*<Form/>*/}
                        {isIPhoneX &&(<View style={{height:20,backgroundColor:'white'}}/>)}
                    </View>

                </ThemeProvider>
            </Provider>
        );
    }
}

// var WhiteBoardRN = require('../example_advanced');
AppRegistry.registerComponent('RNStartKit', () => App);

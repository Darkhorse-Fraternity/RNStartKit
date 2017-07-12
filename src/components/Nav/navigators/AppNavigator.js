import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator} from 'react-navigation';


import {route} from '../../../pages'
import BaseWebView from  '../../Base/BaseWebView.js'
export const AppNavigator = StackNavigator({
    ...route,
    WebView: {screen: BaseWebView,},
}, {
    navigationOptions: {
        headerStyle:{
            backgroundColor:'#F5FCFF',
            shadowColor:'#F5FCFF'
            //headerBackTitle:' '
        },
        headerTintColor:'#0093cb',
        headerTitleStyle:{
            color: 'black',
            alignItems:'center',
        },
        headerBackTitle:'     ',

    },
});

const AppWithNavigationState = ({dispatch, nav}) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })}/>
);

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator} from 'react-navigation';
import {TransitionConfiguration} from './TransitionConfiguration'
import Tab from '../components/Tab'
import {route} from '../../../pages'
import {Platform} from 'react-native'
import theme from '../../../Theme'
export const AppNavigator = StackNavigator({
    Tab: {screen: Tab},
    ...route,

}, {
    // initialRouteName:'Home',
    navigationOptions: {
        headerStyle:{
            backgroundColor:theme.mainColor,
            shadowColor: 'red',
            shadowOpacity: 0.1,
            shadowRadius: 0,
            shadowOffset: {
                height: 0,
            },
            borderBottomColor:theme.mainColor,
            elevation:0,
            paddingTop: (Platform.OS === "ios"  ||  Platform.Version < 20)  ? 0 : 25,
            //headerBackTitle:' '
        },
        headerTintColor:'white',
        headerTitleStyle:{
            color: 'white',
            alignItems:'center',
            fontSize:15,
        },
        headerBackTitle:null,

    },
    //使得视图和头部一起运动，
    // 目前没有办法单独设置，除非使页面单独存在一个栈中
    //https://github.com/react-community/react-navigation/issues/1276
    headerMode:'screen',


    transitionConfig: TransitionConfiguration,
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

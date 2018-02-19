/**
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
    Platform,
    Text
} from 'react-native';
import {
    createNavigator,
    createNavigationContainer,
    TabRouter,
} from 'react-navigation';
import {connect} from 'react-redux'
import {TabViewAnimated, TabViewPagerPan, TabBar, SceneMap} from 'react-native-tab-view';
import SceneView from './SceneView';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons'

const AniView = Animatable.createAnimatableComponent(Icon);

import {tabRoute, initialRouteName, tabiCon} from '../../../pages'


const CustomTabRouter = TabRouter(tabRoute, initialRouteName);


@connect(
    state => ({}),
    dispatch => ({})
)

class CustomTabView extends Component {


    CustomTabBar = ({navigation}) => {
        // console.log('navigation:', navigation);
        const {routes} = navigation.state;
        const routeView = routes.map((route, index) => {
            const focused = index === navigation.state.index;
            let tabInfo = tabiCon[route.routeName]
            const color = focused ? tabInfo.color : tabInfo.activityColor
            const refs = {}
            return (<TouchableOpacity
                    onPress={() => {
                        refs[tabInfo.label] && refs[tabInfo.label].bounceIn(1000);
                        navigation.navigate(route.routeName)
                    }}
                    style={styles.tab}
                    key={route.routeName}
                >
                    {/*<Image style={{width:20,height:20}} source={icon}/>*/}
                    <AniView
                        ref={node => refs[tabInfo.label] = node}
                        name={tabInfo.icon}
                        size={30}
                        color={color}
                        //backgroundColor="transparent"
                        //resizeMode = 'contain'
                        //source={image}
                        style={styles.icon}/>


                    <Text style={[styles.tabLinkText,
                        {color: color}]}>
                        {tabInfo.name}
                    </Text>
                </TouchableOpacity>
            )
        })
        return (

            <View style={styles.tabContainer}>
                {routeView}
            </View>
        );
    };

    _renderScene = ({route}: any) => {
        // console.log('this.props:', this.props);
        const {screenProps} = this.props;
        // const childNavigation = this.props.childNavigationProps[route.key];
        const TabComponent = this.props.router.getComponentForRouteName(
            route.routeName
        );
        // TabComponent.navigationOptions.gesturesEnabled = false
        return (
            <View style={styles.page}>
                <SceneView
                    screenProps={screenProps}
                    component={TabComponent}
                    navigation={this.props.navigation}
                />
            </View>
        );
    };


    _handlePageChanged = (e) => {
        console.log('test:', e);
    }
    _renderPager = props => <TabViewPagerPan {...props} />;




    render() {
        const {navigation,} = this.props;

        const props = {
            lazy: true,
            animationEnabled: false,
            swipeEnabled: false,
            renderPager: this._renderPager,
            // renderHeader,
            //renderFooter,
            renderScene: this._renderScene,
            onRequestChangeTab: this._handlePageChanged,
            navigationState: this.props.navigation.state,
            screenProps: this.props.screenProps,
            style: styles.container,
        };


        return (
            <View style={styles.container}>
                <this.CustomTabBar navigation={navigation}/>
                <TabViewAnimated {...props} onIndexChange={() => {

                }}/>
            </View>
        );
    }

}


const CustomTabs = createNavigationContainer(
    createNavigator(CustomTabRouter)(CustomTabView)
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column-reverse',
        //marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    tabContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: Platform.OS === 'android' ? 50 : 60,
        borderTopColor: 'rgb(230,230,230)',
        borderTopWidth:1
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        backgroundColor: 'white'
    },
    centerBtnImage: {
        width: 70,
        height: 70,
        //top: 12.5
    },
    tabLinkText: {
        marginTop: Platform.OS == 'ios' ? 4 : 2,
        fontSize: 11,
        color: 'rgb(100,100,100)'
    },
    centerBtn: {
        width: 70,
        height: 70,
        bottom: 5,
        left: (Dimensions.get('window').width - 70) / 2,
        alignItems: 'center',
        //backgroundColor: '#9A5CB4',
        //borderRadius: 35,
        position: 'absolute',
    },
    page: {
        flex: 1,
        overflow: 'hidden',
    },
    icon: {
        alignSelf: 'center'
    }
});


export default CustomTabs;

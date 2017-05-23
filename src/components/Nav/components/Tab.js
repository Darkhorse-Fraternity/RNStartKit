/**
 * @flow
 */

import React from 'react';
import {
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import {
    createNavigator,
    createNavigationContainer,
    TabRouter,
    addNavigationHelpers,
} from 'react-navigation';
import MainScreen from './MainScreen'
import WidgetForm from '../../WidgetForm/WidgetForm'
import Settings from '../../../pages/Setting'
import {placeholder} from '../../../../source/'
const CustomTabBar = ({ navigation }) => {
    const { routes } = navigation.state;

    return (
        <View style={styles.tabContainer}>
            {routes.map((route,index) => {
                const focused = index === navigation.state.index;
                let icon = tabiCon[route.routeName]
                icon = focused?icon.activeImage:icon.inActiveImage
                return (<TouchableOpacity
                    onPress={() => navigation.navigate(route.routeName)}
                    style={styles.tab}
                    key={route.routeName}
                >
                    <Image style={{width:20,height:20}} source={icon}/>
                    <Text style={{color:focused?"red":'black'}}>{route.routeName}</Text>
                </TouchableOpacity>
            )})}
        </View>
    );
};


const CustomTabView = ({ router, navigation }) => {
    const { routes, index } = navigation.state;
    const ActiveScreen = router.getComponentForState(navigation.state);
    return (
        <View style={styles.container}>
            <CustomTabBar navigation={navigation} />
            <ActiveScreen
                navigation={addNavigationHelpers({
          ...navigation,
          state: routes[index],
        })}
            />

        </View>
    );
};

const tabiCon = {
    Home: {
        activeImage:placeholder,
        inActiveImage:placeholder
    },
    Notifications: {
        activeImage:placeholder,
        inActiveImage:placeholder
    },
    Settings: {
        activeImage:placeholder,
        inActiveImage:placeholder
    },
}

const CustomTabRouter = TabRouter(
    {
        Home: {
            screen: MainScreen,
            path: '',
        },
        Notifications: {
            screen: WidgetForm,
            path: 'notifications',
        },
        Settings: {
            screen: Settings,
            path: 'settings',
        },
    },
    {
        // Change this to start on a different tab
        initialRouteName: 'Home',
    }
);

const CustomTabs = createNavigationContainer(
    createNavigator(CustomTabRouter)(CustomTabView)
);


const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column-reverse',
        //marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    tabContainer: {
        flexDirection: 'row',
        height: 48,
        zIndex:100,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
    },
});


export default CustomTabs;

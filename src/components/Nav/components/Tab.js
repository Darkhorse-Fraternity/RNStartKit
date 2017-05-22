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
} from 'react-native';
import {
    createNavigator,
    createNavigationContainer,
    TabRouter,
    addNavigationHelpers,
} from 'react-navigation';
import MainScreen from './MainScreen'
import WidgetForm from '../../WidgetForm/WidgetForm'

const CustomTabBar = ({ navigation }) => {
    const { routes } = navigation.state;
    return (
        <View style={styles.tabContainer}>
            {routes.map(route => (
                <TouchableOpacity
                    onPress={() => navigation.navigate(route.routeName)}
                    style={styles.tab}
                    key={route.routeName}
                >
                    <Text>{route.routeName}</Text>
                </TouchableOpacity>
            ))}
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
            screen: MainScreen,
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
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
});


export default CustomTabs;

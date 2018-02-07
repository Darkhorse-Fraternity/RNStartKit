/**
 * Created by lintong on 2017/9/7.
 * @flow
 */
'use strict';

import {
    Platform,
    Animated,
    Easing
} from 'react-native'

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import * as Transition from './Transition'


//https://github.com/react-community/react-navigation/issues/85  穿透共享元素讨论

export  const TransitionConfiguration = () => ({
    screenInterpolator: (sceneProps) => {
        const { scenes} = sceneProps;
        const scene =scenes[scenes.length-1]
        const { route } = scene;
        const params = route.params || {};

        let transition = params.transition || 'forHorizontal';
        if(params.transition == 'none'){return null}

        // andorid 上拉不同。翻转动画实现，如果需要和ios一致，则在这边修改
        if(transition === 'forVertical' && Platform.OS === 'android')
        {transition = 'forFadeFromBottomAndroid'}

        const StackTransitions = {
            ...CardStackStyleInterpolator,
            ...Transition
        }

        return StackTransitions[transition](sceneProps);
    },
    transitionSpec: {
        duration: 500,
        easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
        timing: Animated.timing,
        //useNativeDriver:false,
    },
});
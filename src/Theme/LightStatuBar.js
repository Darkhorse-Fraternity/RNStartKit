/**
 * Created by lintong on 2018/4/19.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Platform,
    StatusBar,
    View
} from 'react-native'
import DeviceInfo from 'react-native-device-info'

export default class LightStatuBar extends Component {
    constructor(props: Object) {
        super(props);
    }

    render() {

        //判断不为小米或者魅族


       // if(DeviceInfo.getBrand() === 'Xiaomi'){
       //     return <View/>
       // }

       //魅族下是正常的 Version < 23

        return (<View>
            {Platform.OS !== 'ios' && Platform.Version >= 21 && Platform.Version < 23 && (
                <StatusBar
                    translucent={true}
                    backgroundColor='white'
                />
            )}
            {Platform.OS !== 'ios' && Platform.Version >= 21 && Platform.Version >= 23 && (
                <StatusBar
                    translucent={true}
                    backgroundColor='transparent'
                    barStyle={'dark-content'}
                />
            )}
        </View>)

    }
}

/**
 * Created by lintong on 2017/7/21.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Animatable from 'react-native-animatable';
export const Btn = Animatable.createAnimatableComponent(TouchableOpacity);
import Icon from 'react-native-vector-icons/Ionicons'
//static displayName = BG
@connect(
    state =>({
        //data:state.req.get()
    }),
    dispatch =>({
        //...bindActionCreators({},dispatch),
    })
)
export  default  class BG extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '主页',
        }
    };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }

    render(): ReactElement<any> {
        return (
            <View style={this.props.style}>
                <Btn
                    useNativeDriver
                    iterationCount="infinite"
                    duration={40000}
                    easing="ease-in-out"
                    animation="cloudMoveLeft"
                    style={styles.sunny}>
                    <Icon name="md-sunny" size={100} color="#f4be36"/>
                </Btn>
                <Btn
                    useNativeDriver
                    iterationCount="infinite"
                    duration={18000}
                    easing="ease-in-out"
                    animation="cloudMoveLeft"
                    style={[styles.cloud,{marginTop:20}]}>
                    <Icon name="ios-cloud" size={100} color="rgb(240,235,250)"/>
                </Btn>
                <Btn
                    delay={3000}
                    useNativeDriver
                    iterationCount="infinite"
                    duration={20000}
                    easing="ease-in-out"
                    animation="cloudMoveLeft"
                    style={[styles.cloud,{marginTop:50}]}>
                    <Icon name="ios-cloud" size={100} color="rgb(230,240,240)"/>
                </Btn>
                <Btn
                    delay={5000}
                    useNativeDriver
                    iterationCount="infinite"
                    duration={15000}
                    easing="ease-in-out"
                    animation="cloudMoveLeft"
                    style={[styles.cloud,{marginTop:80}]}>
                    <Icon name="ios-cloud" size={100} color="rgb(240,240,240)"/>
                </Btn>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    cloud: {
        left: 400,
    },
    sunny: {
        left: 400,
    },
})

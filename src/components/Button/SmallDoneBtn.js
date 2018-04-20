/**
 * Created by lintong on 2017/7/12.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native'

import * as Animatable from 'react-native-animatable';



function makeScaleInTranslation(translationType, fromValue) {
    return {
        from: {
            [translationType]: 0.9,
        },
        to: {
            [translationType]: fromValue,
        },
    };
}

const scaleSpring = makeScaleInTranslation('scale', 1);
Animatable.initializeRegistryWithDefinitions({ scaleSpring })

export default class SmallDoneBtn extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {};
    }


    static propTypes = {
        radius: PropTypes.number,
        load: PropTypes.bool
    };
    static defaultProps = {
        radius: 20,
        load: false
    };


    __renderdot = () => {
        return (
            <View style={styles.dot1}>
                <View style={styles.dot2}/>
            </View>
        )

    }

    render() {
        const { title, radius } = this.props
        // console.log('radius:', radius);
        return (
            <TouchableWithoutFeedback
                disabled={this.props.load}
                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                onPress={this.props.onPress}>
                {!this.props.load ? (<View style={styles.background}>
                    {this.__renderdot()}
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                </View>) : (<ActivityIndicator size="large" color={"white"}/>)}
            </TouchableWithoutFeedback>
        );
    }
}
const styles = StyleSheet.create({

    background: {
        // backgroundColor: 'rgba(200,200,200,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        // borderRadius: 10,
        // backgroundColor:'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row'
    },

    title: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    dot1: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: 'rgba(150,150,150,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot2: {
        width: 12.5,
        height: 12.5,
        borderRadius: 12.5 / 2,
        backgroundColor: 'white',
    }
})
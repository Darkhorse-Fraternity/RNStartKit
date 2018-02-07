/**
 * Created by lintong on 2017/7/12.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TouchableHighlight
} from 'react-native'

import * as Animatable from 'react-native-animatable';
export const Btn = Animatable.createAnimatableComponent(TouchableWithoutFeedback);
// function makeSlideInTranslation(translationType, fromValue) {
//     return {
//         from: {
//             [translationType]: 0,
//         },
//         to: {
//             [translationType]: fromValue,
//         },
//     };
// }
// const slideOutDownBig = makeSlideInTranslation('translateY', 10);
// Animatable.initializeRegistryWithDefinitions({slideOutDownBig})

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
Animatable.initializeRegistryWithDefinitions({scaleSpring})

export default class BounceBtn extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {};
    }


    static propTypes = {
        title: PropTypes.string,
        color: PropTypes.string,
        moveColor: PropTypes.string,
        radius: PropTypes.number,
    };
    static defaultProps = {
        color: '#0094cb',
        moveColor: '#cce9f4',
        radius: 70
    };
    static
    navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '主页',
        }
    };

    render() {
        const {title, radius} = this.props
        // console.log('radius:', radius);
        return (
            <Btn
                {...this.props}
                useNativeDriver
                duration={2000}
                easing="ease-in-out"
                animation="bounceIn"
                >
                <View style={[this.props.style,styles.wrap]}>
                    <Animatable.View
                        useNativeDriver
                        iterationCount="infinite"
                        direction="alternate"
                        duration={2000}
                        easing="ease-in-out"
                        animation="scaleSpring"
                        style={[styles.background1,
                    {backgroundColor:this.props.moveColor,
                    height:radius+20,
                     width: radius+20,
                     borderRadius:radius+20,
                    }]}>

                    </Animatable.View>
                    <View
                        style={[styles.background2,
                    {backgroundColor:this.props.color,
                     height:radius,
                     width: radius,
                     borderRadius:radius,
                     marginTop:-radius - 10
                    }]}>
                        <Text style={styles.title}>{title}</Text>
                        {/*<Icon name="md-checkmark" size={50} color='white'/>*/}
                    </View>
                </View>
            </Btn>
        );
    }
}
const styles = StyleSheet.create({
    wrap: {
        alignItems: 'center',
        // backgroundColor:'red',
        padding: 10,
    },
    background1: {
        height: 90,
        width: 90,
        backgroundColor: '#cce9f4',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 45,
    },
    background2: {
        height: 70,
        width: 70,
        borderRadius: 70,
        backgroundColor: '#0094cb',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -80,
    },
    title: {
        width: 40,
        color: 'white',
        textAlign: 'center',
        lineHeight: 18,
        fontSize: 16,
    }
})
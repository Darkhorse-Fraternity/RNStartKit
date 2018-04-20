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
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import Button from './'

export default class SmallDoneBtn extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {};
    }


    render() {

        const disabled = this.props.load || this.props.disabled
        return (
            <Button

                {...this.props}
                disabled={disabled}
                style={[styles.btn,{
                    paddingVertical:this.props.load?5:7,
                    backgroundColor:disabled?'rgb(150,150,150)':'black'
                }, this.props.style]}
                hitSlop={this.props.hitSlop ||
                {top: 20, left: 50, bottom: 20, right: 50}}
            >
                {!this.props.load ? (
                        <Text
                            numberOfLines={1}
                            style={styles.title}>
                            {this.props.title}
                        </Text>) :
                    (<ActivityIndicator size="small" color={"white"}/>)}
            </Button>
        );
    }
}
const styles = StyleSheet.create({

    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        height:35,
        backgroundColor: 'black',
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },

})
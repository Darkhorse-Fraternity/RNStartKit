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


export default class SmallDoneBtn extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {};
    }


    render() {

        const disabled = this.props.load || this.props.disabled
        return (
            <TouchableOpacity
                {...this.props}
                disabled={disabled}
                style={[styles.btn,{
                    paddingVertical:this.props.load?5:7,
                    backgroundColor:disabled?'rgb(150,150,150)':'black'
                }, this.props.style]}
                hitSlop={this.props.hitSlop ||
                {top: 50, left: 100, bottom: 50, right: 100}}
            >
                {!this.props.load ? (
                        <Text
                            numberOfLines={1}
                            style={styles.title}>
                            {this.props.title}
                        </Text>) :
                    (<ActivityIndicator size="small" color={"white"}/>)}
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({

    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'black',
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },

})
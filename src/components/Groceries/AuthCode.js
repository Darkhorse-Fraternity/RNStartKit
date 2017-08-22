/**
 * Created by lintong on 2017/8/22.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native'
import styled from 'styled-components/native';

export default class AuthCode extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {};
    }

    state: {};
    static propTypes = {};
    static defaultProps = {};


    render() {
        return (
            <View style={[this.props.style,styles.wrap]}>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
})
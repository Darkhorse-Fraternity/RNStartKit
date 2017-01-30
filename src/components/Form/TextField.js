/**
 * Created by lintong on 2017/1/28.
 * @flow
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    TextInput,
} from 'react-native'

export default class TextField extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {
        style: PropTypes.number,
        meta: PropTypes.object.isRequired,
        input: PropTypes.object.isRequired,
    };
    static defaultProps = {};

    render() {

        const {
            style,
            input: {onChange,otherInput},
            meta: { error, touched,submitFailed }, //otherMeta
            ...otherProps,
        } = this.props;

        return (
            <TextInput
                // Let's only change the text color instead of showing error messages
                style={(touched && error) ? [style, styles.error] : style}
                underlineColorAndroid="transparent"
                onChangeText={text => onChange(text)}
                {...otherInput}
                {...otherProps}
            />
        );
    }
}
const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
})
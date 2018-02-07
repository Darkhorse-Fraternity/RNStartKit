/**
 * Created by lintong on 2018/2/1.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import {StyleBtnText,StyledBtn} from './style'
import theme from '../../../Theme'



export default class  CleanBtn extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {};
    }

    state: {};
    static propTypes = {};
    static defaultProps = {};

    render() {
        const {onPress,text,submitting,hitSlop,...rest} = this.props
        return (
            <StyledBtn {...rest} hitSlop={hitSlop} onPress={onPress}  >
                {submitting?
                    (<ActivityIndicator size="small"
                                        color={theme.normalBtn.activityIndicatorColor} />):
                    (<StyleBtnText  {...rest}>
                        {text}
                    </StyleBtnText>)}
            </StyledBtn>
        );
    }
}

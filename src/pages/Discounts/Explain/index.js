/**
 * Created by lintong on 2018/2/22.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
} from 'react-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {discontExplain} from '../../../../source/text'

import {
    StyledContent,
    StyledText
} from './style'

import {shouldComponentUpdate} from 'react-immutable-render-mixin';


@connect(
    state => ({}),
    dispatch => ({})
)


export default class Explain extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '优惠券介绍',
        }
    };


    render(): ReactElement<any> {


        return (
            <StyledContent>
                <StyledText>
                    {discontExplain}
                </StyledText>

            </StyledContent>
        );
    }
}



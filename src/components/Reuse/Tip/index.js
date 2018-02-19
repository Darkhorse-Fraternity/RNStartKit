/**
 * Created by lintong on 2018/2/16.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
} from 'react-native'
import {connect} from 'react-redux'


import {
    StyledTipView,
    StyledTipLine,
    StyledTipText
} from './style'
import PropTypes from 'prop-types';

import {shouldComponentUpdate} from 'react-immutable-render-mixin';


@connect(
    state => ({}),
    dispatch => ({})
)


export default class Tip extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {
        text: PropTypes.string,
        size: PropTypes.number
    };
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '',
        }
    };


    render(): ReactElement<any> {


        return (
            <StyledTipView style={this.props.style}>
                <StyledTipLine size ={this.props.size}/>
                <StyledTipText size ={this.props.size}>
                    {this.props.text}
                </StyledTipText>
            </StyledTipView>
        );
    }
}



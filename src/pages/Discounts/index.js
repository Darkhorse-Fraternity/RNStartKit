/**
 * Created by lintong on 2018/2/21.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';


import {
    StyledContent,
    StyledRow,
    StyledRowInner,
    StyledRowLeft,
    StyledRowLine,
    StyledRowRight,
    StyledRowTitle,
    StyledRowDiscrib,
    StyledRowPrice
} from './style'

import {shouldComponentUpdate} from 'react-immutable-render-mixin';


@connect(
    state => ({}),
    dispatch => ({})
)


export default class Discount extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '优惠券',
            headerRight: (
                <TouchableOpacity style={{margin: 15}} onPress={() => {
                    navigation.navigate('Explain')
                }}>
                    <Text style={{color: 'white', fontWeight: '500'}}>
                        说明
                    </Text>
                </TouchableOpacity>)
        }
    };


    __renderRow = () => {

        return (
            <StyledRow>
                <StyledRowInner>
                    <StyledRowLeft>
                        <StyledRowPrice>
                            88
                            <StyledRowPrice style={{fontSize:13,fontWeight:'100'}}>
                                元
                            </StyledRowPrice>
                        </StyledRowPrice>
                    </StyledRowLeft>
                    <StyledRowLine/>
                    <StyledRowRight>
                        <StyledRowTitle numberOfLines={1}>
                            [加分劵]xxxxxx
                        </StyledRowTitle>
                        <StyledRowDiscrib numberOfLines={2}>
                            xxxxxxxxxxxxxxxxxxxxxxxxxx
                            xxxxxxxxxxxxxxxxxxxxxxxx
                        </StyledRowDiscrib>
                    </StyledRowRight>
                </StyledRowInner>
            </StyledRow>
        )

    }

    render(): ReactElement<any> {

        return (
            <StyledContent>
                {this.__renderRow()}
            </StyledContent>
        );
    }
}



/**
 * Created by lintong on 2018/2/16.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text, z
} from 'react-native'
import {connect} from 'react-redux'
import WithdrawForm from '../../components/Form/Withdraw'

import {
    StyledContent,
    StyledWithdrawText,
    StyledWithdrawTitleText,
    StyleWithdrawTipView
} from './style'
import {
    withdrawal
} from '../../../source/text'

import {shouldComponentUpdate} from 'react-immutable-render-mixin';


@connect(
    state => ({}),
    dispatch => ({})
)


export default class Withdraw extends Component {
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
            title: '提现',
            headerRight: (
                <TouchableOpacity style={{margin: 15}} onPress={() => {
                    navigation.navigate('Record')
                }}>
                    <Text style={{color: 'white', fontWeight: '500'}}>
                        提现记录
                    </Text>
                </TouchableOpacity>)

        }
    };


    render(): ReactElement<any> {


        return (
            <StyledContent>
                <WithdrawForm/>
                <StyleWithdrawTipView>
                    <StyledWithdrawTitleText>
                        提现提示
                    </StyledWithdrawTitleText>
                    <StyledWithdrawText>
                        {withdrawal}
                    </StyledWithdrawText>
                </StyleWithdrawTipView>
            </StyledContent>
        );
    }
}



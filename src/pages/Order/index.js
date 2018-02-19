/**
 * Created by lintong on 2018/1/16.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
    Clipboard
} from 'react-native'
import {connect} from 'react-redux'
import {
    orderDiscrib,
    wechatServe,
    buyDiscrib,
    answer
} from '../../../source/text'

import {
    StyledContent,
    StyledAccountInfo,
    StyledAcountText,
    StyledBodyRow,
    StyledBodyText,
    StyledBodyLowText,
    StyledTouch,
} from './style'

import Tip from '../../components/Reuse/Tip'

import {shouldComponentUpdate} from 'react-immutable-render-mixin';
import {Button} from 'react-native-clean-form'
import OrderItem from './Item'

@connect(
    state => ({}),
    dispatch => ({})
)


export default class Order extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        this.state= {
            open:false
        }
    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '订单',
        }
    };


    __renderAccount = () => {

        return (
            <StyledAccountInfo>
                <StyledAcountText>
                    会员号：xxx
                </StyledAcountText>
                <StyledAcountText>
                    账户余额：100 元
                </StyledAcountText>
            </StyledAccountInfo>
        )
    }


    __renderAnswer = () => {

        const answerItmes = answer.map((item,index) => {
            return (
                <View key={index+""}>
                    <StyledBodyText>
                        {item.question}
                    </StyledBodyText>
                    <StyledBodyLowText
                        selectable={true}
                    //     onLongPress={()=>[
                    //         // Clipboard.setString(item.answer)
                    // ]}>
                        >
                        {item.answer}
                    </StyledBodyLowText>
                </View>
            )
        })

        return (
            <StyledBodyRow>
                <Tip text='常见问题'/>
                <View style={{height:10}}/>
                {answerItmes}
            </StyledBodyRow>
        )

    }

    render(): ReactElement<any> {


        return (
            <StyledContent>
                {this.__renderAccount()}
                <View style={{padding: 10, width:"100%",height:80}}>
                    <Button onPress={()=>{
                        this.props.navigation.navigate('Withdraw')
                    }}>
                        提现
                    </Button>
                </View>
                <StyledBodyRow>
                    <StyledBodyText>
                        {orderDiscrib}
                    </StyledBodyText>
                </StyledBodyRow>
                <StyledBodyRow>
                    <StyledBodyText fontSize={20}>
                        {wechatServe}
                    </StyledBodyText>
                    <OrderItem/>
                </StyledBodyRow>
                <StyledBodyRow>
                    <StyledBodyText>
                        {buyDiscrib}
                    </StyledBodyText>
                </StyledBodyRow>
                <StyledTouch onPress={()=>{
                    this.setState({open:!this.state.open})
                }}>
                    <StyledBodyText>
                        更多常见问题
                    </StyledBodyText>
                </StyledTouch>
                {this.state.open ? this.__renderAnswer():<View style={{height:200}}/>}
            </StyledContent>
        );
    }
}



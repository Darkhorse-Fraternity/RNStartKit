/**
 * Created by lintong on 2018/2/13.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
} from 'react-native'
import {connect} from 'react-redux'
const placehold = 'http://yikaxi.com/blog/wp-content/uploads/2015/04/placeholder_5.jpg'


import {
    StyledContent,
    StyledAccountInfo,
    StyledAcountText,
    StyledAvatar,
    StyledTouch,
    StyledTouchText,
    StyledGetRow
} from './style'

import {
    StyledBodyRow,
    StyledBodyText,
    StyledBodyLowText,
} from '../Order/style'

import Tip from '../../components/Reuse/Tip'


import {
    orderDiscrib,
    wechatServe,
    answer
} from '../../../source/text'

import {shouldComponentUpdate} from 'react-immutable-render-mixin';


@connect(
    state => ({}),
    dispatch => ({})
)


export default class PersonInfo extends Component {
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
            title: '我的',
        }
    };

    __renderAccount = () => {

        return (
            <StyledAccountInfo>
                <StyledAvatar source={{uri: placehold}}/>
                <StyledAcountText>
                    会员号：xxx
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
                <StyledGetRow >
                    <StyledBodyText>
                        账户余额：
                        <StyledBodyText style={{color:'red'}}>
                            50.0 元
                        </StyledBodyText>
                    </StyledBodyText>
                    <StyledTouch onPress={()=>{
                        this.props.navigation.navigate('Withdraw')
                    }}>
                        <StyledTouchText>
                            提现
                        </StyledTouchText>
                    </StyledTouch>
                </StyledGetRow>
                <StyledBodyRow>
                    <StyledBodyText>
                        {orderDiscrib}
                    </StyledBodyText>
                </StyledBodyRow>
                <StyledBodyRow>
                    <StyledBodyText fontSize={20}>
                        {wechatServe}
                    </StyledBodyText>
                </StyledBodyRow>
                {this.__renderAnswer()}
            </StyledContent>
        );
    }
}



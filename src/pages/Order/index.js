/**
 * Created by lintong on 2018/1/16.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    Clipboard
} from 'react-native'
import { connect } from 'react-redux'


import {
    StyledItem,
    StyledContent,
    StyledBottom,
    StyledItemTitle,
    StyledItemDiscrib,
    StyledBottomText,
    StyledArrow,
    StyledItemButton1,
    StyledItemButton2,
    StyledItemButtonText,
    StyledTopView,
    StyledItemButtonText2
} from './style'


import { shouldComponentUpdate } from 'react-immutable-render-mixin';


@connect(
    state => ({}),
    dispatch => ({})
)


export default class Order extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        this.state = {
            open: false
        }
    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '消息包管理',
        }
    };



    _renderButton = (subscription = true)=> {
        if(subscription){
            return (
                <StyledItemButton1 innerView>
                    <StyledItemButtonText>
                        1分钱体验
                    </StyledItemButtonText>
                    <StyledItemButtonText
                        style={{color:'rgba(255,255,255,0.5)',paddingHorizontal:5}}>
                        |
                    </StyledItemButtonText>
                    <StyledItemButtonText>
                        订阅
                    </StyledItemButtonText>
                </StyledItemButton1>
            )
        }else {
            return (
                <StyledItemButton2 innerView>
                    <StyledItemButtonText2>
                        剩7天
                    </StyledItemButtonText2>
                    <StyledItemButtonText2
                        style={{color:'rgba(0,0,0,0.3)',paddingHorizontal:5}}>
                        |
                    </StyledItemButtonText2>
                    <StyledItemButtonText2>
                        续费
                    </StyledItemButtonText2>
                </StyledItemButton2>
            )
        }

    }

    __render = (subscription) => {

        return (
            <StyledItem
                onPress={() => {
                    this.props.navigation.navigate('Vote')
                }}>
                <StyledTopView>
                    <StyledItemTitle numberOfLines={1} color="blue">
                        交易所公告包
                    </StyledItemTitle>
                    {this._renderButton(subscription)}
                </StyledTopView>

                <StyledItemDiscrib numberOfLines={2}>
                    智能爬取并翻译[币安、火币、Bitfinex...]等国内外20余个交易所最新公告。
                </StyledItemDiscrib>
                <StyledBottom>
                    <StyledBottomText>
                        进入查看所有渠道
                    </StyledBottomText>
                    <StyledArrow/>
                </StyledBottom>
            </StyledItem>
        )
    }

    render(): ReactElement<any> {


        return (
            <StyledContent>
                {this.__render()}
                {this.__render(false)}
                {this.__render()}
                {this.__render()}
            </StyledContent>
        );
    }
}



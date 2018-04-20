/**
 * Created by lintong on 2018/2/13.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,

} from 'react-native'
import { connect } from 'react-redux'


import {
    StyledContent,
    StyledBanner,
    StyledSmallBanner,
    StyledItemsView,
    StyledItem,
    StyledLeftImage,
    StyledBottom,
    StyledItemTitle,
    StyledItemDiscrib,
    StyledBottomText
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';


const placehold = 'http://yikaxi.com/blog/wp-content/uploads/2015/04/placeholder_5.jpg'


@connect(
    state => ({}),
    dispatch => ({})
)
export default class Home extends Component {
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
            title: '消息',
        }
    };


    __render = () => {

        return (
            <StyledItem
                onPress={() => {

                }}>
                <StyledItemTitle numberOfLines={2} color="blue">
                    加速全球布局，公信宝的大航海时代来
                </StyledItemTitle>
                <StyledItemDiscrib numberOfLines={2}>
                    据金色财经合作媒体,据金色财经合作媒体据金色财经合作媒体据金色财经合作媒体据金色财经合作媒体据金色财经合作媒体
                    据金色财经合作媒体据金色财经合作媒体据金色财经合作媒体据金色财经合作媒体据金色财经合作媒体
                </StyledItemDiscrib>
                <StyledBottom>
                    <StyledBottomText>
                        EOS(EOS)
                    </StyledBottomText>
                    <StyledBottomText>
                        2016-04-17
                    </StyledBottomText>
                </StyledBottom>
            </StyledItem>
        )
    }

    render(): ReactElement<any> {
        return (
            <StyledContent>
                <StyledItemsView>
                    {this.__render()}
                    {this.__render()}
                    {this.__render()}
                    {this.__render()}
                </StyledItemsView>
            </StyledContent>
        );
    }
}



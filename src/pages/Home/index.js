/**
 * Created by lintong on 2018/2/13.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,

} from 'react-native'
import {connect} from 'react-redux'


import {
    StyledContent,
    StyledBanner,
    StyledSmallBanner,
    StyledItemsView,
    StyledItem,
    StyledLeftImage,
    StyledRight,
    StyledItemTitle,
    StyledItemDiscrib
} from './style'

import {shouldComponentUpdate} from 'react-immutable-render-mixin';


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
            title: '首页',
        }
    };


    __render = (insert) => {

        return (
            <StyledItem
                onPress={() => {
                    this.props.navigation.navigate('Vote')
                }}
                insert={insert}>
                <StyledLeftImage source={{uri: placehold}}/>
                <StyledRight>
                    <StyledItemTitle color="blue">
                        测试
                    </StyledItemTitle>
                    <StyledItemDiscrib>
                        disssss
                    </StyledItemDiscrib>
                </StyledRight>
            </StyledItem>
        )
    }

    render(): ReactElement<any> {
        return (
            <StyledContent>
                <StyledBanner source={{uri: placehold}}/>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('Discounts')
                }}>
                    <StyledSmallBanner source={{uri: placehold}}/>
                </TouchableOpacity>
                <StyledItemsView>
                    {this.__render(true)}
                    {this.__render()}
                    {this.__render(true)}
                    {this.__render()}
                </StyledItemsView>
            </StyledContent>
        );
    }
}



/**
 * Created by lintong on 2018/2/13.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
} from 'react-native'
import { connect } from 'react-redux'

const placehold = 'http://yikaxi.com/blog/wp-content/uploads/2015/04/placeholder_5.jpg'

import DeviceInfo from 'react-native-device-info'
import {
    StyledContent,
    StyledAccountInfo,
    StyledAcountText,
    StyledAvatar,
    StyledTouch,
    StyledTouchText,
    StyledTouchImg,
    StyledTouchInner,
    StyledArrow,
    StyledRow,
    StyledSwitch,
    StyledBottonText,
    StyledBanner,
    StyledBannerImage,
    StyledBannerText
} from './style'


import { shouldComponentUpdate } from 'react-immutable-render-mixin';


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
                <StyledAvatar source={{ uri: placehold }}/>
                <StyledAcountText>
                    xxxxxxx
                </StyledAcountText>
            </StyledAccountInfo>
        )
    }


    __renderTouchRow = (title) => {
        return (
            <StyledTouch innerView>
                <StyledTouchInner>
                    <StyledTouchImg source={{ uri: placehold }}/>
                    <StyledTouchText>
                        {title}
                    </StyledTouchText>
                </StyledTouchInner>
                <StyledArrow/>
            </StyledTouch>
        )
    }

    __renderRow = (title, dis) => {
        return (
            <StyledRow>
                <StyledTouchInner style={{ padding: 15 }}>
                    <StyledTouchInner>
                        <StyledTouchImg source={{ uri: placehold }}/>
                        <StyledTouchText>
                            {title}
                        </StyledTouchText>
                    </StyledTouchInner>
                    <StyledSwitch/>
                </StyledTouchInner>
                <StyledBottonText>
                    {dis}
                </StyledBottonText>
            </StyledRow>
        )
    }


    render(): ReactElement<any> {


        return (
            <StyledContent>
                {this.__renderAccount()}
                {this.__renderTouchRow('购买记录')}
                {this.__renderRow('是否推送', '关闭后，将无法收到推送消息')}
                {this.__renderRow('夜间勿扰', '开启后，0:00-8:00间的消息会在晨间推送')}
                {this.__renderTouchRow('退出登录')}
                <StyledBanner>
                    <StyledBannerImage source={{ uri: placehold }}/>
                    <StyledBannerText>
                        Bitui V{DeviceInfo.getVersion()}
                    </StyledBannerText>
                </StyledBanner>

            </StyledContent>
        );
    }
}



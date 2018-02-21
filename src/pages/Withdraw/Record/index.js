/**
 * Created by lintong on 2018/2/16.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
    Linking
} from 'react-native'
import {connect} from 'react-redux'


import {
    StyledContent,
    StyledRow,
    StyledRowInnerView,
    StyledRowText,
    StyledRowTitleText,
    StyledHeaderView,
    PhoneIcon,
    StyledHeaderInnerView
} from './style'

import {shouldComponentUpdate} from 'react-immutable-render-mixin';


@connect(
    state => ({}),
    dispatch => ({})
)


export default class Record extends Component {
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
            title: '提现记录',
        }
    };

    _renderRow = () => {
        return (
            <StyledRow>
                <StyledRowInnerView>
                    <StyledRowText>
                        <StyledRowTitleText>
                            编号：
                        </StyledRowTitleText>
                        1000
                    </StyledRowText>
                    <StyledRowText>
                        <StyledRowTitleText>
                            金额：
                        </StyledRowTitleText>
                        1000元
                    </StyledRowText>
                </StyledRowInnerView>
                <StyledRowInnerView>
                    <StyledRowText>
                        <StyledRowTitleText>
                            时间：
                        </StyledRowTitleText>
                        2017-5-3
                    </StyledRowText>
                    <StyledRowText>
                        <StyledRowTitleText>
                            状态：
                        </StyledRowTitleText>
                        已结算
                    </StyledRowText>
                </StyledRowInnerView>
            </StyledRow>
        )

    }

    __renderHeader = () => {
        return (
            <StyledHeaderView onPress={() => {
                Linking.openURL("tel:13588833404");
            }}>
                <PhoneIcon size={50} name={"ios-phone-portrait"}/>
                <StyledHeaderInnerView>
                    <StyledRowTitleText>
                        客服电话：xxxx
                    </StyledRowTitleText>
                    <StyledRowText style={{marginTop: 10}}>
                        在线时间：9:00-22:00
                    </StyledRowText>
                </StyledHeaderInnerView>
            </StyledHeaderView>
        )
    }

    render(): ReactElement<any> {


        return (
            <StyledContent>
                {this.__renderHeader()}
                {this._renderRow()}
            </StyledContent>
        );
    }
}



/**
 * Created by lintong on 2018/2/15.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'


import {
    StyledContent,
    StyledInnerContent,
    StyledPriceText,
    StyledInnerText,
    StyledDateText,
    StyledDiscirbText1,
    StyledDiscirbText2,
    StyledLine,
    StyleInnerTopView
} from './style'

import {shouldComponentUpdate} from 'react-immutable-render-mixin';


@connect(
    state => ({}),
    dispatch => ({})
)


export default class OrderItem extends Component {
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
            title: '',
        }
    };


    render(): ReactElement<any> {


        return (
            <StyledContent>
                <StyledInnerContent>
                    <StyleInnerTopView>
                        <StyledInnerText>
                            订单:10000
                        </StyledInnerText>
                        <StyledInnerText>
                            已发货
                        </StyledInnerText>
                    </StyleInnerTopView>
                    <StyledInnerText>
                        选手：8号 张某某
                    </StyledInnerText>
                    <StyledInnerText>
                        链接：www.baidu.com
                    </StyledInnerText>
                    <TouchableOpacity>
                        <StyledInnerText right>
                            查看截图
                        </StyledInnerText>
                    </TouchableOpacity>
                </StyledInnerContent>
                <StyledPriceText right>
                    200票/24元
                </StyledPriceText>
                <StyledDateText>
                    创建时间：2018-12
                </StyledDateText>
                <StyledDateText>
                    创建时间：2018-12
                </StyledDateText>
                <StyledDateText>
                    创建时间：2018-12
                </StyledDateText>
                <StyledLine/>
                <StyledDiscirbText1>
                    asdasd
                </StyledDiscirbText1>
                <StyledLine/>
                <StyledDiscirbText2>
                    asdasd
                </StyledDiscirbText2>
            </StyledContent>
        );
    }
}



/**
 * Created by lintong on 2017/7/3.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

//static displayName = Home
@connect(
    state =>({
        //data:state.req.get()
    }),
    dispatch =>({
        //...bindActionCreators({},dispatch),
    })
)
export  default  class Home extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};


    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '主页',
        }
    };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }

    render(): ReactElement<any> {
        return (
            <View style={[this.props.style,styles.wrap]}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
})

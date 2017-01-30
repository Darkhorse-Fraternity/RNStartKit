/**
 * Created by lintong on 2016/12/14.
 * @flow
 */
'use strict';


import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight
} from 'react-native'
import {blackFontColor, backViewColor, mainColor} from '../../configure';

import {connect} from 'react-redux'
import {navigatePush} from '../../redux/actions/nav'
class MyComponet extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};

    _renderRow(title: string, onPress: Function) {
        return (
            <View>
                <TouchableHighlight onPress={onPress}>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>
                            {title}
                        </Text>
                        <View style={styles.arrowView}/>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }


    render(): ReactElement<any> {
        return (
            <View style={[this.props.style,styles.wrap]}>
                <View style={{height:10}}/>
                {this._renderRow('支付宝提现', ()=>this.props.push('AdvanceAlipay'))}
                <View style={styles.line}/>
                {this._renderRow('提现记录', ()=>this.props.push('AdvanceRecord'))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    row: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },


    // cbutton:{
    //   marginRight:10,
    //   marginLeft:10,
    //   marginTop: 20,
    //   height: 40,
    //   justifyContent: 'center',
    // },
    arrowView: {
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        borderRightWidth: StyleSheet.hairlineWidth * 2,
        borderColor: '#8c8c85',
        transform: [{rotate: '315deg'}],
        width: 10,
        height: 10,
    },
    rowText: {
        marginLeft: 10,
        fontSize: 14,
        color: blackFontColor,
    },
    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(100,100,100,0.1)',
    },

})

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        push: (key)=>dispatch(navigatePush(key))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyComponet)
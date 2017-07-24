/**
 * Created by lintong on 2017/7/11.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native'
import {connect} from 'react-redux'
import {ICARD} from '../../redux/reqKeys'
import {add} from '../../redux/module/leancloud'
import {bindActionCreators} from 'redux';
import {addNormalizrEntity} from '../../redux/actions/list'
import {mainColor} from '../../configure'
import {selfUser} from '../../request/LCModle'
import moment from 'moment'
//static displayName = Creat
@connect(
    state =>({
        //data:state.req.get()
    }),
    (dispatch, props) =>({
        //...bindActionCreators({},dispatch),
        add: (title)=> dispatch(async(dispatch, getState)=> {
            const state = getState()
            const user = state.login.data;
            const param = {
                title,
                cycle:0,
                time:0,
                doneDate:{"__type": "Date", "iso": moment('2017-03-20')},
                ...selfUser(),
            }

            const res = await add(param, ICARD)
            const entity = {
                ...param,
                ...res
            }
            dispatch(addNormalizrEntity(ICARD, entity))
            props.navigation.goBack()
        }),
    })
)
export  default  class Creat extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            title: ''
        }
    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            //title: '新建',
        }
    };

    shouldComponentUpdate(nextProps: Object, nextState: Object) {
        return !immutable.is(this.props, nextProps) || !immutable.is(this.state, nextState)
    }

    __renderName = ()=> {
        return (
            <View style={{alignItems:'center'}}>
                <View style={styles.row}>
                    <TextInput
                        placeholderTextColor="rgba(180,180,180,1)"
                        selectionColor={mainColor}
                        returnKeyType='next'
                        maxLength={50}
                        //keyboardType={boardType}
                        style={styles.textInputStyle}
                        underlineColorAndroid='transparent'
                        placeholder='立一个flag'
                        clearButtonMode='while-editing'
                        enablesReturnKeyAutomatically={true}
                        //onSubmitEditing={() =>this.focusNextField(ref)}
                        onChangeText={(text)=>this.setState({title:text})}
                    />
                </View>
                <TouchableOpacity
                    disabled={this.state.title.length === 0 }
                    onPress={()=>this.props.add(this.state.title)}
                    style={styles.sureBtn}>
                    <Text style={[styles.sureBtnText,
                    {color:this.state.title.length === 0?'rgba(180,180,180,1)':mainColor}]}>
                        确定
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    render(): ReactElement<any> {
        return (
            <View style={[this.props.style,styles.wrap]}>
                {this.__renderName()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    row: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: mainColor,
        marginHorizontal: 30,
    },
    textInputStyle: {

        marginLeft: 0,
        textAlign: 'center',
        fontSize: 14,
        height: 40,
        width: Dimensions.get('window').width - 60,
        color: 'black',
    },
    sureBtn: {
        marginTop: 20,
    },
    sureBtnText: {
        color: mainColor
    }
})

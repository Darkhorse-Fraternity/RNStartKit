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
import Icon from 'react-native-vector-icons/Ionicons'
import OptionView,{StaticOption} from './OptionView'
//static displayName = Creat
@connect(
    state =>({
        //data:state.req.get()
    }),
    (dispatch, props) =>({
        //...bindActionCreators({},dispatch),
        add: (title,option = StaticOption)=> dispatch(async(dispatch, getState)=> {

            console.log('test:', option);
            // console.log('test:', option);
            // console.log('test:', StaticOption)

            const state = getState()
            const user = state.login.data;
            const param = {
                title,
                cycle: 0,
                time: 0,
                // notifyTime:option&&option.notifyTime||"20.00",
                ...option,
                doneDate: {"__type": "Date", "iso": moment('2017-03-20')},
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
            title: '',
            step: 0,
            optionOpen: false,
        }
    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '新建卡片',
            headerLeft: <View/>
        }
    };

    shouldComponentUpdate(nextProps: Object, nextState: Object) {
        return !immutable.is(this.props, nextProps) || !immutable.is(this.state, nextState)
    }


    __nextStep = () => {


        const step = this.state.step + 1
        this.setState({step})
        if (step == 2) {
            this.props.add(this.state.title,this.option)
        }

    }

    __backStep = ()=> {

        const step = this.state.step - 1
        this.setState({step})
        if (step == -1) {
            this.props.navigation.goBack()
        }
    }

    __doOption = ()=> {
        this.setState({optionOpen: true})
    }


    __renderName = ()=> {
        return (
            <View >
                <View style={styles.row}>
                    <TextInput
                        placeholderTextColor="rgba(180,180,180,1)"
                        selectionColor={mainColor}
                        returnKeyType='next'
                        maxLength={50}
                        value={this.state.title}
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
                <View style={styles.ctrlView}>
                    <TouchableOpacity
                        onPress={this.__backStep}
                        style={[styles.sureBtn,{backgroundColor:'#00abfb'}]}>
                        <Icon name="ios-arrow-back-outline" size={20} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={this.state.title.length === 0 }
                        onPress={this.__nextStep}
                        style={[styles.sureBtn,{backgroundColor:
                        this.state.title.length === 0?"rgb(220,200,200)":"#ff768e"}]}>
                        <Icon name="ios-arrow-forward-outline" size={20} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    __doneView = ()=> {
        return (
            <View>
                <View style={styles.downRow}>
                    <Text style={styles.doneTitle}>{this.state.title}</Text>
                </View>
                <View style={styles.doneCtrlView}>
                    <TouchableOpacity
                        onPress={this.__backStep}
                        style={[styles.doneBtn,{backgroundColor:'#00abfb'}]}>
                        <Icon name="ios-arrow-back-outline" size={20} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.__doOption}
                        style={[styles.doneBtn,{backgroundColor:'#00abfb'}]}>
                        <Icon name="ios-more" size={30} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={this.state.title.length === 0 }
                        onPress={this.__nextStep}
                        style={[styles.doneBtn,{backgroundColor:this.state.title.length === 0?"rgb(220,200,200)":"#ff768e"}]}>
                        <Icon name="ios-done-all" size={30} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }



    render(): ReactElement<any> {
        return (
            <View style={[this.props.style,styles.wrap]}>
                {this.state.step == 0 && !this.state.optionOpen && this.__renderName()}
                {this.state.step == 1 && !this.state.optionOpen && this.__doneView()}
                {this.state.optionOpen && (<OptionView goBack={(option)=>{
                    this.setState({optionOpen:false})
                    this.option = option
                }}/>)}
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
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderBottomColor: mainColor,
        marginHorizontal: 30,
        padding: 20,
    },
    downRow: {
        marginHorizontal: 30,
        height: 90,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputStyle: {

        marginLeft: 0,
        //textAlign: 'center',
        fontSize: 14,
        height: 50,
        paddingLeft: 15,
        //width: Dimensions.get('window').width - 60,
        color: 'black',
        marginTop: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgb(180,180,180)",
        borderRadius: 25,

    },
    sureBtn: {
        width: 50,
        height: 50,
        marginTop: 0,
        borderRadius: 25,
        backgroundColor: '#ff768e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sureBtnText: {
        color: 'white'
    },
    ctrlView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        paddingTop: 20,
    },
    doneBtn: {
        width: 50,
        height: 50,
        marginTop: 20,
        borderRadius: 25,
        backgroundColor: '#ff768e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    doneCtrlView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        paddingTop: 10,
    },
    doneTitle: {
        fontSize: 20,
    }
})

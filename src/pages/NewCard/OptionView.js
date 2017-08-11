/**
 * Created by lintong on 2017/8/4.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import {connect} from 'react-redux'
import * as Animatable from 'react-native-animatable';
export const Btn = Animatable.createAnimatableComponent(TouchableOpacity);
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/Ionicons'
//static displayName = OptionView
@connect(
    state =>({
        //data:state.req.get()
    }),
    dispatch =>({
        //...bindActionCreators({},dispatch),
    })
)
export  default  class OptionView extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            option: 0,
            notifyTime: '20:00'
        }
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

    shouldComponentUpdate(nextProps: Object, nextState: Object) {
        return !immutable.is(this.props, nextProps) || !immutable.is(this.state, nextState)
    }

    __backStep = ()=> {

        if (this.state.option != 0) {
            this.setState({option: 0})
        } else {
            const {option,...other} = this.state
            this.props.goBack && this.props.goBack(other)
        }
    }

    __remderBack = ()=> {
        return (
            <TouchableOpacity
                onPress={this.__backStep}
                style={[styles.sureBtn]}>
                <Icon name="ios-arrow-back-outline" size={20} color="white"/>
            </TouchableOpacity>
        )
    }

    __renderItem = (props)=> {
        return (
            <Animatable.View animation="fadeInLeft"
            >
                <TouchableOpacity
                    onPress={()=>{
                        this.setState({option:props.index})
                    }}
                    style={[styles.item,{width:props.width}]}>
                    <Text>
                        {props.title}
                    </Text>
                </TouchableOpacity>
            </Animatable.View>
        )
    }

    __renderNotifyTime = ()=> {
        const items = ['5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
            , '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
        return (
            <View style={styles.notifyTimeView}>
                {items.map((item)=> {
                    return (
                        <TouchableOpacity
                            onPress={()=>{
                                this.setState({notifyTime:item})
                            }}
                            style={[styles.notifyTimeItem,
                            {backgroundColor:this.state.notifyTime == item?'#00abfb':'white'}]}
                            key={item}>
                            <Text style={{color:this.state.notifyTime == item?'white':'black'}}>{item}</Text>
                        </TouchableOpacity>)
                })}
            </View>
        )
    }

    render(): ReactElement<any> {
        return (
            <View style={[this.props.style,styles.wrap]}>

                {this.state.option == 0 && (<ScrollView style={[styles.wrap]}>
                    <this.__renderItem
                        title={"提醒时间:   "+this.state.notifyTime}
                        width={160}
                        index={1}/>
                </ScrollView>)}
                {this.state.option == 1 && this.__renderNotifyTime()}
                {this.__remderBack()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    item: {
        marginTop: 10,
        width: 200,
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        paddingHorizontal: 20,
    },
    sureBtn: {
        width: 50,
        height: 50,
        marginTop: 0,
        borderRadius: 25,
        backgroundColor: '#00abfb',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: Dimensions.get('window').height - 150,
        left: Dimensions.get('window').width - 100,
    },
    notifyTimeItem: {
        width: 60,
        height: 35,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius:8,
    },
    notifyTimeView: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})

/**
 * Created by lintong on 2017/7/14.
 * @flow
 */
'use strict';


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native'

import {mainColor} from '../../configure'
import {connect} from 'react-redux'
import * as immutable from 'immutable';
import LCList from '../../components/Base/LCList';
import {IRECORD, ICARD} from '../../redux/reqKeys'
import {selfUser} from '../../request/LCModle'
import Icon from 'react-native-vector-icons/Ionicons'
import {addEntities} from '../../redux/module/normalizr'
import {addNormalizrEntity} from '../../redux/actions/list'
import {update} from '../../redux/module/leancloud'
@connect(
    state =>({}),
    dispatch =>({
        refresh: async(data) => {
            const id = data.objectId

            const param = {
                time: 0,
                cycle:data.cycle + 1,
            }

            const res = await update(id, param, ICARD)
            const entity = {
                ...param,
                ...res
            }
            // dispatch(addEntities({
            //     [ICARD]: {
            //         [entity.objectId]: entity
            //     }
            // }))
            dispatch(addNormalizrEntity(ICARD,entity))
        },

    })
)

export default class Record extends Component {
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
            title: '我的记录',
        }
    };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }

    __refresh = (data)=>{
        Alert.alert(
            '再来一组?',
            '',
            [{text: '取消'}, {text: '确定', onPress: () => this.props.refresh(data)}]
        )
    }



    renderRow({item, index}: Object) {
        // md-refresh
        console.log('test:', item);
        const days = 22 * (item.cycle + 1) + (item.time + 1)
        const reflesh = item.time == -1
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={()=>{
                    if(reflesh){
                        this.__refresh(item)
                    }
            }}>
                <View style={styles.row}>
                    <View style={styles.subRow}>
                        <Icon style={styles.icon} name={reflesh?'ios-refresh':"ios-walk"} size={50}/>
                        <View style={styles.des}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.time}>坚持了{days}天</Text>
                        </View>
                    </View>
                    <Text style={styles.time}>第{item.cycle + 1}组</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        const param = {
            'where': selfUser()
        }
        return (
            <LCList
                renderHeader={this._renderHeader}
                style={[this.props.style,styles.list]}
                reqKey={ICARD}
                sKey={IRECORD}
                renderItem={this.renderRow.bind(this)}
                //dataMap={(data)=>{
                //   return {[OPENHISTORYLIST]:data.list}
                //}}
                reqParam={param}
            />
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,

    },
    list: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    text: {
        marginLeft: 5,
        fontSize: 16,
        color: 'rgb(150,150,150)'
    },
    subText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
        color: 'rgb(200,200,200)'
    },
    date: {
        fontSize: 14,
        color: 'rgb(100,100,100)'
    },
    row: {
        backgroundColor: 'white',
        paddingHorizontal: 18,
        paddingVertical: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    subRow:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    des: {
        marginLeft: 15
    },
    card: {
        // marginTop:10,
        margin: 5,
        backgroundColor: "#fff",
        borderRadius: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0.3,
        }
    },
    title: {
        fontSize: 16,
    },
    time: {
        marginTop: 3,
        fontSize: 13,
    }

})





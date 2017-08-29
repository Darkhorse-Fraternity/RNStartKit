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
import {update, remove,search} from '../../redux/module/leancloud'
import {SwipeAction} from 'antd-mobile'
import {clear} from '../../redux/actions/list'
import * as Animatable from 'react-native-animatable';

const heightZoomIn= {
    from: {
        height: 100,
        translateX:500,
    },
    to: {
        height: 0,
        translateX:500,
    },
}
Animatable.initializeRegistryWithDefinitions({heightZoomIn})
@connect(
    state =>({
        data:state.list.get(IRECORD)
    }),
    dispatch =>({
        refresh: async(data) => {
            const id = data.objectId


            const isDone = data.time == data.period

            const param = {
                time: isDone ? 0 : data.time,
                statu: 'start',
                cycle: isDone ? data.cycle + 1 : data.cycle,
            }

            const res = await update(id, param, ICARD)
            const entity = {
                ...param,
                ...res,
            }
            // dispatch(addEntities({
            //     [ICARD]: {
            //         [entity.objectId]: entity
            //     }
            // }))
            dispatch(addNormalizrEntity(ICARD, entity))
        },
        delete: async(rowId, objectId, callBack)=> {
            await remove(objectId, ICARD)
            dispatch(clear(IRECORD, rowId))
            callBack && callBack()

            //刷新首页的数据
            dispatch(search(false, {
                where: {
                    ...selfUser(),
                    statu:'start'
                },
                order: 'doneDate'


            }, ICARD))
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

    __refresh = (data)=> {
        const isDone = data.time == data.period
        Alert.alert(
            isDone ? '再来一组?' : '重新开启',
            '',
            [{text: '取消'}, {text: '确定', onPress: () => this.props.refresh(data)}]
        )
    }

    __delete = (index, objectId)=> {
        const self= this
        Alert.alert(
            '确定删除?',
            '删除后不可恢复~！',
            [{text: '取消'}, {
                text: '确定', onPress: async() => {
                    const last = self.props.data.get('listData').size-1 == index
                    const itemView = this.rows[index]
                    ///因为view 是根据key 复用的，所以最后需要还原，否则会出错

                    await itemView.fadeOutLeft(500)
                    const endState = await itemView.heightZoomIn(500)
                    endState.finished && this.props.delete(index, objectId,()=>{
                        !last && itemView.bounce(1)
                    })
                }
            }]
        )
    }
    rows = []
    renderRow({item, index}: Object) {
        // md-refresh
        // console.log('test:', item);
        const days = item.period * (item.cycle ) + (item.time )
        const reflesh = item.time == item.period || item.statu == 'stop'
        return (
            <Animatable.View
                ref={(row) => this.rows[index] = row}
               >
                <SwipeAction
                    style={styles.card}
                    autoClose
                    right={[
        {
          text: '删除',
          onPress: () => this.__delete(index,item.objectId),
          style: { backgroundColor: '#F4333C', color: 'white',fontSize:17 },
        },
      ]}
                    onOpen={() => console.log('global open')}
                    onClose={() => console.log('global close')}
                >
                    <TouchableOpacity
                        style={{flex:1}}
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
                </SwipeAction>
            </Animatable.View>
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
        justifyContent: 'space-between'
    },
    subRow: {
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





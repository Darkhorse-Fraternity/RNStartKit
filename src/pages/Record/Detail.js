/**
 * Created by lintong on 2017/8/31.
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
    Image,
    Alert
} from 'react-native'
import {IDO} from '../../redux/reqKeys'

import {selfUser, iCard} from '../../request/LCModle'
import {mainColor} from '../../configure'
import {connect} from 'react-redux'
import * as immutable from 'immutable';
import LCList from '../../components/Base/LCList';
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'
import {update,} from '../../redux/module/leancloud'
import {addNormalizrEntity} from '../../redux/actions/list'
import {ICARD} from '../../redux/reqKeys'


const listKey = IDO


@connect(
    (state,props) =>({
        data: state.normalizr.get(ICARD).get(props.navigation.state.params.data.objectId)
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
    })
)

export default class Detail extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {
        data: PropTypes.object
    };

    static defaultProps = {
        data: {}
    };
    static navigationOptions = props => {
        const {navigation} = props;
        const {state} = navigation;
        const {params} = state;
        const item = params.data
        const reflesh = item.time == item.period || item.statu == 'stop'
        return {
            title: params.data.title,
            headerRight: reflesh && (
                <TouchableOpacity
                    style={styles.headerBtn}
                    onPress={()=>{
                        params.refresh(item)

                }}>
                    <Icon style={styles.icon} name={reflesh?'ios-refresh':"ios-walk"} size={30}/>
                </TouchableOpacity>)
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

    componentDidMount() {
        const {navigation} = this.props;
        navigation.setParams({refresh:this.__refresh})
    }

    componentWillReceiveProps(nextProps) {
        console.log('test:', nextProps);
        const {navigation} = this.props;
        const item = nextProps.data.toJS()
        const data = this.props.data.toJS()
        const reflesh = item.time !== data.time || item.statu !== data.statu
        if(reflesh){

            navigation.setParams({data:item})
        }

    }

    renderRow({item, index}: Object) {

        // console.log('test:', item);
        const img = item.imgs && item.imgs[0] || null

        return (
            <View
                style={{marginTop:10,backgroundColor:'white'}}
                onPress={()=>{
            }}>

                {img && (<Image style={styles.image} source={{uri:img}}/>)}
                <View style={styles.bottom}>
                    <View>
                        {item.recordText && (<Text style={styles.text}>{item.recordText}</Text>)}
                        <Text style={styles.date}>{moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</Text>
                    </View>
                    <Icon name="md-checkmark" size={30} color="green"/>
                </View>

                <View style={styles.line}/>
            </View>
        )
    }

    render() {

        const {navigation} = this.props;
        const {state} = navigation;
        const {params} = state;

        const param = {
            'where': {
                ...selfUser(),
                ...iCard(params.data.objectId)
            }
        }


        return (
            <LCList
                renderHeader={this._renderHeader}
                style={[this.props.style,styles.list]}
                reqKey={listKey}
                sKey={listKey+params.data.objectId}
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
    },
    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    text: {
        paddingVertical: 3,
        paddingHorizontal: 5,
        fontSize: 16,
        color: 'rgb(50,50,50)'
    },
    subText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
        color: 'rgb(200,200,200)'
    },
    date: {
        fontSize: 14,
        color: 'rgb(100,100,100)',
        paddingVertical: 3,
        paddingHorizontal: 5,
    },
    row: {
        backgroundColor: 'white',
        paddingHorizontal: 18,
        paddingVertical: 18,
    },

    image: {
        width: '100%',
        height: 200,
    },
    bottom: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    headerBtn: {
        paddingHorizontal: 15,
    },
})





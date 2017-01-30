/**
 * Created by lintong on 2016/12/14.
 * @flow
 */
'use strict';


import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Text
} from 'react-native'

import {mainColor} from '../../configure'
import {connect} from 'react-redux'
import * as immutable from 'immutable';
import BaseListView from '../../components/Base/BaseListView';
import {listLoad, listLoadMore} from '../../redux/actions/list'
import {navigateRefresh} from '../../redux/actions/nav'
import {renderNavRightButton} from '../../util/viewUtil'
import {BCButton} from '../../components/Base/WBButton';
import {dataStorage} from '../../redux/actions/util'

import * as Animatable from 'react-native-animatable';
class List extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {
        load: PropTypes.func.isRequired,
        loadMore: PropTypes.func.isRequired,
    };
    static defaultProps = {};

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props.data, nextProps.data) ||
            !immutable.is(this.props.show, nextProps.show) ||
                !immutable.is(this.props.single,nextProps.single) ||
            !immutable.is(this.props.mut,nextProps.mut)
    }

    componentWillMount() {
        this.props.refresh(true);
        this.props.showModal(false);
    }


    __renderItem = (name: string, isMut: bool = false )=> {
        // const select = this.props.state.get('selectName') == name
        let select = false

        if (isMut == false) {
            select = this.props.single == name
        }else if (this.props.mut){
            const mutValues = this.props.mut.toJS()
            // console.log('test:',mutValues)
            const set = new Set(mutValues)
            select = set.has(name)
        }

        return (

            <TouchableOpacity
                style={[styles.selectBtn ,{backgroundColor:select?mainColor:'white'}] }
                onPress={()=>{
                    if(!isMut){
                        this.props.singleSelect(name)
                    }else {
                        this.props.mutSelect(name)
                    }

                }}>
                <Text style={{fontSize:12,color:select?'white':'black'}}>{name}</Text>
            </TouchableOpacity>
        )
    }


    __renderTopView(): ReactElement<any> {

        const top = this.props.show ? {top: 0} : {bottom: 10}
        return (
            <Animatable.View
                animation={this.props.show ?"slideInDown":'slideInUp'}
                duration={300}
                style={[styles.topView,top]}>
                <Text style={styles.topTitle}>账单类型</Text>
                <View style={styles.selectView}>
                    {this.__renderItem('购物返现',true)}
                    {this.__renderItem('签到',true)}
                    {this.__renderItem('红包奖励',true)}
                    {this.__renderItem('邀请好友奖励',true)}
                    {this.__renderItem('支付宝提现',true)}
                    {this.__renderItem('维权扣款',true)}
                </View>
                <Text style={styles.topTitle}>时间</Text>
                <View style={styles.selectView}>
                    {this.__renderItem('一周内')}
                    {this.__renderItem('一个月内')}
                    {this.__renderItem('两个月内')}
                    {this.__renderItem('三个月内')}
                </View>
                <BCButton
                    onPress={()=>{
                        this.props.showModal(false)
                        this.props.refresh(true);
                    }}
                    containerStyle={styles.cbutton}
                >
                    确定
                </BCButton>
            </Animatable.View>
        )
    }


    renderRow(itme: Object, sectionID: number, rowID: number) {

        return (
            <TouchableOpacity
                style={{marginTop:10}}
                onPress={()=>{
            }}>
                <View style={styles.line}/>

                <View style={styles.row}>
                    <Text
                        numberOfLines={1}
                        style={styles.date}>
                        {moment(itme.updatedAt).format('YYYY-MM-DD HH:mm')}
                    </Text>
                    <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
                        <View style={styles.subRow}>
                            <Image source={trip_up}/>
                            <Text
                                numberOfLines={1}
                                style={styles.text}>
                                {itme.start}
                            </Text>
                        </View>
                        <Text
                            numberOfLines={1}
                            style={[styles.subText,{color}]}>
                            {itme.statu}
                        </Text>
                    </View>
                    <View style={styles.subRow}>
                        <Image source={trip_down}/>
                        <Text
                            numberOfLines={1}
                            style={styles.text}>
                            {itme.finish}
                        </Text>
                    </View>
                </View>
                <View style={styles.line}/>
            </TouchableOpacity>
        )
    }

    render() {

        const loadStatu = this.props.data && this.props.data.get('loadStatu')
        let listData = this.props.data && this.props.data.get('listData')
        listData = listData && listData.toJS()

        return (
            <View>
                {  this.__renderTopView()}
                <BaseListView
                    //renderHeader={this._renderHeader}
                    style={[this.props.style,styles.list]}
                    loadStatu={loadStatu}
                    loadData={this.props.load}
                    dataSource={listData}
                    loadMore={this.props.loadMore}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
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
    },
    subRow: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    topView: {
        position: 'absolute',
        zIndex: 102,
        backgroundColor: 'rgb(240,240,240)',
        width: Dimensions.get('window').width,
        elevation: 20,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.2,
    },
    cbutton: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 17,
        marginBottom: 15,
        height: 35,
        justifyContent: 'center',
    },
    selectView: {
        flexDirection: 'row',
        paddingLeft: 15,
        flexWrap:'wrap'
    },
    selectBtn: {
        height: 30,
        width: (Dimensions.get('window').width - 45) / 4,
        backgroundColor: 'white',
        // marginLeft:10,
        marginRight: 5,
        marginTop:5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    topTitle: {
        marginLeft: 15,
        marginTop:15,
        marginBottom:10
    }
})


const listKey = 'listKey'
function myListLoad(more: bool = false) {
    return (dispatch, getState) => {
        const user = getState().login.data
        const param = {
            'where': {
                'user': {'__type': "Pointer", "className": "_User", "objectId": user.objectId}
            }
        }

        more ? dispatch(listLoadMore(listKey, listKey, param)) :
            dispatch(listLoad(listKey, listKey, param))
    }
}

const cKey = 'Bill_Top_Show'
const singleKey = 'Bill_Single_Key'
const mutKey = 'Bill_Mut_Key'



const mapStateToProps = (state) => {
    return {
        data: state.list.get(listKey),
        show: state.util.get(cKey),
        single:state.util.get(singleKey),
        mut:state.util.get(mutKey)
    }
}

const mapDispatchToProps = (dispatch) => {


    const show = renderNavRightButton('筛选', ()=> {
        dispatch(dataStorage(cKey, true))
        dispatch(navigateRefresh({renderRightComponent: hide}))

    })

    var selfShow = show
    const hide = renderNavRightButton('取消', ()=> {
        dispatch(dataStorage(cKey, false))
        dispatch(navigateRefresh({renderRightComponent: selfShow}))
    })


    return {
        load: ()=>dispatch(myListLoad()),
        loadMore: ()=>dispatch(myListLoad(true)),
        push: (key)=> {
            // dispatch(navigatePush(key));
        },
        refresh: (value)=> {
            dispatch(navigateRefresh({renderRightComponent: value ? show : hide}))
        },

        showModal: (value: bool)=> {
            // dispatch()
            dispatch(dataStorage(cKey, value))

        },
        singleSelect:(name)=>{
            dispatch(dataStorage(singleKey, name))
        },
        mutSelect:(name)=>{
            dispatch((dispatch,getState)=>{
                const state = getState()
                const mut = state.util.get(mutKey)
                const set = new Set(mut)
                set.has(name)?set.delete(name)
                    :set.add(name)
                dispatch(dataStorage(mutKey, Array.from(set)))
            })
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)
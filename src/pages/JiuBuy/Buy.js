/**
 * Created by lintong on 2016/12/6.
 * @flow
 */
'use strict';


import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    Dimensions,
    ScrollView,
    Modal,
    InteractionManager,
    Platform
} from 'react-native'
import * as nav from '../../redux/nav'
import {mainColor} from '../../configure'
import {connect} from 'react-redux'
import * as immutable from 'immutable';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import SCTabBar from '../../components/SCTabBar'
import BaseListView from '../../components/Base/BaseListView';
import {listLoad, listLoadMore} from '../../redux/actions/productList'
import {navigatePush} from '../../redux/actions/nav'
import * as qz from '../../request/qzapi'
import {placeholder} from '../../../source'
import {renderBuyRow} from '../../components/Row'
import {request} from '../../redux/actions/req'
import Guide from '../Guide/Guide'
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
        return !immutable.is(this.props, nextProps)
    }

    componentDidMount() {
        this.props.loadActivity()

    }

    componentWillReceiveProps(props) {
        if(props.activityData ){
           const data = props.activityData.toJS().data
            if(data && data.length && data.length != this.page){
                // InteractionManager.runAfterInteractions(() => {
                //
                // });
                const self = this
                this.page = data.length;
                this.time = setTimeout(()=>{
                    self.refs.st.goToPage(data.length)
                },1000)

            }
        }
    }

    componentWillUnmount() {
        this.time && clearTimeout(this.time)
    }


    renderHeaderItem(item:object) {
        // console.log('item:', item);
        const flag = item.isDelete;

        return (
            <TouchableOpacity key={item.name} style={styles.headItems} onPress={
                ()=>nav.push({key:'Product',itemID:1})}>
                <Image style={{width:80,height:80}} source={placeholder}/>
                <Text style={{color:mainColor,fontSize:13,margin:2}}>
                    <Text>￥</Text>
                    <Text style={{fontSize:16,fontWeight:'bold'}}>1.0</Text>
                </Text>
                <Text
                    style={{color:'rgb(80,80,80)'}}
                    numberOfLines={1}>{item.name}</Text>
                <View style={[styles.headerItemBtn,{borderColor:flag?mainColor:'rgb(200,200,200)'}]}>
                    <Text style={{color:flag?mainColor:'rgb(200,200,200)'}}>已抢光</Text>
                    <Text style={{fontSize:11,marginTop:2,
                    color:flag?mainColor:'rgb(200,200,200)'}}>剩余0件</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderHeader() {
        const data = this.props.activityData && this.props.activityData.toJS().data
        if(!data) return null
        return (
            <View style={{marginBottom:10,backgroundColor:'white'}}>
                <TouchableOpacity
                    style={{marginTop:10}}
                    onPress={()=>{
                        this.props.push('Invite')
            }}>
                    <Image style={{height:100,width:Dimensions.get('window').width}} source={placeholder}/>
                </TouchableOpacity>
                <View style={styles.headInfoView}>
                    <Text style={{color:'rgb(100,100,100)'}}>一元秒杀 手慢无</Text>
                    <View style={{flexDirection:'row', alignItems:"center"}}>
                        <Image style={{width:10,height:10,marginRight:5  }} source={placeholder}/>
                        <Text style={{color:'rgb(220,220,220)'}}>当前有23927人在抢</Text>
                    </View>
                </View>
                <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{backgroundColor:'white'}}>
                    {data.map((item)=>{
                        return this.renderHeaderItem(item)
                    })}

                </ScrollView>
            </View>
        )

    }


    renderListView(tabLable:any,needHeader:bool,key:string) {
        const listKey = 'productList'+key;
        const data = this.props.data && this.props.data.get(listKey)
        const loadStatu = data && data.get('loadStatu')
        let listData = data && data.get('listData')
        listData = listData && listData.toJS()
        return (
            <BaseListView
                tabLabel={tabLable}
                key={key}
                renderHeader={needHeader?this.renderHeader.bind(this):undefined}
                style={[this.props.style,styles.list]}
                loadStatu={loadStatu}
                loadData={()=>this.props.load(listKey)}
                dataSource={listData}
                loadMore={()=>this.props.loadMore(listKey)}
                renderRow={renderBuyRow}
            />
        )

    }

    render() {

        const loadStatu = this.props.data && this.props.data.get('loadStatu')
        let listData = this.props.data && this.props.data.get('listData')
        listData = listData && listData.toJS()


        const data = this.props.activityData && this.props.activityData.toJS().data || []

        // let page =  0;
        // if(Platform.OS == 'ios'){
        //     page = data && data.length;
        // }else {
        //     page = this.state.page
        // }


        return (
            <View style={[this.props.style,styles.wrap]}>
                <Guide/>
                <ScrollableTabView
                    ref="st"
                    //page={page}
                    renderTabBar={()=><SCTabBar/>}>
                    {this.renderListView('热门排行',false,'-1')}
                    {data && data.map((item)=>{
                        {/*console.log('item:', item);*/}
                        return this.renderListView({time:item.name,statu:!item.isDelete?'已开始':'抢购进行中'},
                            true,item.id)
                    })}
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        marginBottom: 64,
    },
    list: {
        flex: 1,
    },
    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    headInfoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: 'white'
    },
    headItems: {
        marginHorizontal: 10,
        marginVertical: 10,
        width: 100,
        alignItems: 'center',
    },
    headerItemBtn: {
        marginTop: 5,
        borderRadius:5,
        borderColor:'rgb(200,200,200)',
        borderWidth:StyleSheet.hairlineWidth,
        paddingHorizontal:15,
        paddingVertical:5,
        alignItems:'center',
    }

})

function myListLoad(listKey: string = 'ProList', more: bool = false) {
    return (dispatch) => {
        const param = qz.resetProductList(0,0)
        more ? dispatch(listLoadMore(listKey, listKey, param)) :
            dispatch(listLoad(listKey, listKey, param))
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.productList,
        activityData:state.req.get('ProductActivity')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (key)=>dispatch(myListLoad(key)),
        loadMore: (key)=>dispatch(myListLoad(key,true)),
        push: (key)=> {
            dispatch(navigatePush(key));
        },
        loadActivity: ()=> {
            const params = qz.requestProductZone()
            dispatch(request('ProductActivity',params))
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)
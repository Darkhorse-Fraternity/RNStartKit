/**
 * Created by lintong on 2016/12/21.
 * @flow
 */
'use strict';


import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    Animated,
} from 'react-native'
import * as nav from '../../redux/nav'
import {placeholder} from '../../../source'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import CourseTabBar from '../../components/CourseTabBar'
import {navigateRefresh} from '../../redux/actions/nav'
import {renderNavImageButton} from '../../util/viewUtil'
import {mainColor} from '../../configure'
import {dataStorage} from '../../redux/actions/util'
import ShareModal, {shareModalKey} from '../../components/ShareModal'
import {connect} from 'react-redux'
import * as qz from '../../request/qzapi'
import {request} from '../../redux/actions/req'
import * as immutable from 'immutable';
import CountDown from '../../components/CountDown'
// import {} from 'react-native-animatable'
import {Toast} from '../../util'
import CModal from '../../components/CModal'
class Product extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            show: false,
            page: 0,
            scrollValue: new Animated.Value(0),
        }
    }

    static propTypes = {
        state: PropTypes.object,
    };
    static defaultProps = {
        state: immutable.fromJS({})
    };


    componentDidMount() {
        this.props.refresh(true);
        this.props.load(this.props.scene.route.itemID)
    }

    shouldComponentUpdate(nextProps: Object, nextState: Object) {
        return !immutable.is(this.props, nextProps) || !immutable.is(this.state, nextState)
    }


    __renderTop = ()=> {


        const bottom = ()=> {
            this.state.scrollValue.setValue(this.state.page)
            return (<CourseTabBar goToPage={(page)=>this.setState({page:page})}
                                  activeTab={this.state.page}
                                  containerWidth={Dimensions.get('window').width}
                                  underlineColor={mainColor}
                                  activeTextColor={mainColor}
                                  scrollValue={this.state.scrollValue}
                                  tabs={['商品描述','商品参数','保障说明']}
                                  style={{height:40,backgroundColor:'white'}}/>)
        }

        return (
            <View style={styles.top}>
                <View style={styles.topSub}>
                    <Text style={styles.topText}>已售100件</Text>
                    <CountDown time={1000}/>
                    <Text style={[styles.topText,{color:mainColor}]}>还剩100件</Text>
                </View>
                { this.state.show && bottom()}
            </View>
        )
    }
    __renderBottom = ()=> {
        const data = this.props.state.toJS().data
        return (
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.bottomTouch} onPress={()=>this.props.showModal()}>
                    <Image style={{height:15,width:15}} source={placeholder}/>
                    <Text style={[styles.BottomText,{marginTop:2}]}>客服</Text>
                </TouchableOpacity>
                {/*<TouchableOpacity style={styles.bottomTouch}>*/}
                {/*<Image style={{height:15,width:15}} source={placeholder}/>*/}
                {/*<Text style={[styles.BottomText,{marginTop:2}]}>评价</Text>*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity style={styles.bottomTouch2} onPress={()=>
                nav.push({key:'WebView',url:data.href})}>
                    <Image style={{height:20,width:20}} source={placeholder}/>
                    <Text style={styles.BottomText,{color:'white',marginLeft:10}}>去天猫购买</Text>
                </TouchableOpacity>
            </View>
        )
    }


    __renderInfo(): ReactElement<any> {

        const data = this.props.state.toJS().data

        const desItem = (des: string)=> {
            return (
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{color:'rgb(200,200,200)',marginRight:3}}>{des}</Text>
                    <Image style={{height:10,width:10} } source={placeholder}/>
                </View>
            )
        }


        return (
            <View style={{padding:20}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={{height:50,width:50,marginRight:10}} source={placeholder}/>
                    <Text style={{marginRight:55}}>
                        {data && data.name}
                    </Text>
                </View>
                <View style={{flexDirection:'row',alignSelf:'center',marginTop:20,alignItems:'center'}}>
                    <Text style={{color:mainColor,fontSize:20}}>
                        <Text style={{fontSize:13}}>￥</Text>
                        {data && data.price}
                    </Text>
                    <Text style={{textDecorationLine:'line-through',marginLeft:5,
                    color:'rgb(200,200,200)'}}>￥{data && data.marketPrice}</Text>
                </View>
                <View style={{flexDirection:'row',alignSelf:'center',marginTop:8}}>
                    <Text style={{color:'rgb(150,150,150)',marginRight:10}}>特卖6.00元</Text>
                    <Text style={{color:mainColor}}>劵抵3元</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:35}}>
                    <Text style={{color:'rgb(200,200,200)'}}>已抢38件</Text>
                    <Text style={{color:'rgb(200,200,200)'}}>江西南昌</Text>
                </View>
                <Image style={{width:150,height:70,marginTop:15}} source={placeholder}/>
                <View style={styles.line}/>
                <Image style={{width:30,height:20}} source={placeholder}/>
                <View style={styles.line}/>
                <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
                    <Image style={{width:20,height:20,marginRight:5}} source={placeholder}/>
                    <Text>领取优惠券</Text>
                </View>
                <View style={{height:10,backgroundColor:'rgb(240,240,240)',marginHorizontal:-20}}/>
                <View style={{paddingVertical:10}}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{width:80,height:40,marginRight:10}} source={placeholder}/>
                        <View >
                            <Text style={{fontSize:17}}>兴荣家居体验馆</Text>
                            <Image style={{width:150,height:20,marginTop:5}} source={placeholder}/>
                        </View>
                    </View>
                    <View style={{marginTop:18,flexDirection:'row',justifyContent:'space-between'}}>
                        {desItem('宝贝描述 4.8')}
                        {desItem('卖家描述 4.8')}
                        {desItem('物流服务 4.8')}
                    </View>
                </View>
                <View style={{height:10,backgroundColor:'rgb(240,240,240)',marginHorizontal:-20}}/>
            </View>
        )
    }

    height: number = 0;

    onScroll = (e)=> {
        if (this.height == 0) {
            const updatedChildFrames = e.nativeEvent.updatedChildFrames
            // console.log('e.nativeEven:',e.nativeEvent)
            //bug 忽然之前只有iOS才有 updatedChildFrames 的属性。
            if (updatedChildFrames && updatedChildFrames.length > 1) {
                this.height = updatedChildFrames[0].height + updatedChildFrames[1].height
            }
        }

        if (this.height > 0) {
            const contentOffset = e.nativeEvent.contentOffset
            const show = contentOffset.y + 40 >= this.height
            this.state.show != show && this.setState({show})
        }

    }


    __renderPropRow(name: string, descirb: string) {
        return (
            <View style={{flexDirection:'row',padding:15,
            borderBottomColor:'rgb(150,150,150)',borderBottomWidth: 0.2}}>
                <Text style={{width:130}}>{name}:</Text>
                <Text style={{color:'rgb(100,100,100)'}}>{descirb}</Text>
            </View>
        )
    }

    __renderSafeguardRow(image, describ: string) {
        return (
            <View style={{paddingVertical:10,paddingHorizontal:15}}>
                <View style={{flexDirection:'row'}}>
                    <Image style={{width:14,height:14,marginRight:5}} source={image}/>
                    <Text style={{color:'rgb(180,180,180)'}}>保障</Text>
                </View>
                <Text style={{color:'rgb(180,180,180)',marginTop:5}}>{describ}</Text>
            </View>
        )
    }

    __renderevaluate(data) {
        if (!data || data.length == 0) {
            return (
                <Text style={{flex:1,textAlign:'center',marginTop:20,color:'rgb(200,200,200)'}}>
                    暂无评价
                </Text>
            )
        } else {
            return data.map((item)=> {
                return (
                <View
                    key={item.content}
                    style={{padding:15,
            borderBottomColor:'rgb(150,150,150)',borderBottomWidth: 0.2}}>
                    <Text style={{width:130,marginTop:10}}>{item.name}</Text>
                    <Text style={{color:'rgb(200,200,200)',marginTop:10,fontSize:13}}>{item.content}</Text>
                </View>
                )
            })
        }
    }

    render(): ReactElement<any> {
        const data = this.props.state.toJS().data
        // console.log('data:', data);
        const tabBar = !this.state.show ? ()=><CourseTabBar/> : !this.state.show
        return (
            <View style={[this.props.style,styles.wrap]}>
                <CModal/>
                <ShareModal/>
                <ScrollView
                    scrollEventThrottle={100}
                    onScroll={this.onScroll}
                    refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={()=>{}}
                />
            }
                    style={[this.props.style,styles.wrap]}>
                    <Image style={{height:300,width:Dimensions.get('window').width}} source={placeholder}/>
                    {this.__renderInfo()}
                    <ScrollableTabView
                        page={this.state.page}
                        onChangeTab={(tab)=>this.setState({page:tab.i})}
                        locked={true} renderTabBar={tabBar}>
                        <View
                            tabLabel="商品描述"
                        >
                            <Image style={{width:Dimensions.get('window').width,height:100}}
                                   source={placeholder}/>
                            <Image style={{width:Dimensions.get('window').width,height:100}}
                                   source={placeholder}/>
                            <Image style={{width:Dimensions.get('window').width,height:100}}
                                   source={placeholder}/>
                            <Image style={{width:Dimensions.get('window').width,height:100}}
                                   source={placeholder}/>
                        </View>
                        <View
                            tabLabel="商品参数"
                        >
                            <View style={{height:10}}/>
                            {this.__renderPropRow('品牌', '起点如日')}
                            {this.__renderPropRow('型号', '起点如日')}
                            {this.__renderPropRow('颜色分类', '起点如日')}
                            {this.__renderPropRow('材质', '其他/other')}
                        </View>
                        <View
                            tabLabel="商品评价"
                        >
                            {this.__renderevaluate([{name: 'asd', content: '质量很好'}])}
                        </View>
                        <View
                            tabLabel="保障说明"
                        >
                            {this.__renderSafeguardRow(placeholder, 'text')}
                            {this.__renderSafeguardRow(placeholder, 'text2')}
                        </View>
                    </ScrollableTabView>
                </ScrollView>
                {this.__renderBottom()}
                {this.__renderTop()}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: 'white',
    },
    top: {

        zIndex: 100,
        backgroundColor: 'rgba(255,255,255,0.8)',
        height: 40,
        width: Dimensions.get('window').width,
        position: 'absolute',
        top: 0,

    },
    topSub: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    bottom: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 45,
        backgroundColor: 'white',
    },
    bottomTouch: {
        width: 50,
        alignItems: 'center',
        alignSelf: 'center'
    },
    bottomTouch2: {
        flex: 1,
        backgroundColor: mainColor,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    BottomText: {
        fontSize: 13,
    },
    topText: {
        fontSize: 11,
    },
    topDateText: {
        textAlign: 'center',
        backgroundColor: 'black',
        width: 10,
        color: 'white',
        marginLeft: 5
    },
    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgb(230,230,230)',
        marginVertical: 10,

    }

})
const mapStateToProps = (state) => {
    return {
        state: state.req.get('PruductDetail')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        refresh: ()=> {
            const rightBtn = renderNavImageButton(placeholder, 'right', ()=> {
                dispatch(dataStorage(shareModalKey, true))
            })
            dispatch(navigateRefresh({renderRightComponent: rightBtn}))
        },
        showModal: ()=> {
            dispatch(dataStorage('Service_Modal_Show', true))
        },
        load: (id)=> {
            const params = qz.rqProductDetail(id)
            dispatch(request('PruductDetail', params))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Product)
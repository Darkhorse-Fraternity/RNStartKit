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
    Dimensions,
    Text,
    ScrollView,
    RefreshControl
} from 'react-native'
import {blackFontColor, grayFontColor, backViewColor, mainColor} from '../../configure';
import {connect} from 'react-redux'
import {navigatePush} from '../../redux/actions/nav'
import {placeholder} from  '../../../source/'
class MyComponet extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};


    __renderTop(): ReactElement<any> {
        return (
            <Image style={styles.top} source={placeholder}>
                <TouchableOpacity onPress={()=>{this.props.push('Setting')}}>
                    <Text style={styles.set}>设置</Text>
                </TouchableOpacity>
                <Text style={styles.titel}>ID:XXXX</Text>
            </Image>
        )
    }

    __renderMoney(): ReactElement<any> {
        const item = (name: string, money: string = '0.00元')=> {
            return (
                <TouchableOpacity>
                    <Text style={styles.text}>{name}</Text>
                    <Text style={styles.subText}>{money}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <View style={styles.space}>
                <View style={styles.row}>
                    <View >
                        <Text style={styles.text}>
                            可用余额(元)
                        </Text>
                        <Text style={{fontSize:20,color:mainColor,marginTop:5}}>
                            0.00元
                        </Text>
                    </View>
                    <TouchableOpacity onPress={()=>this.props.push('AdvanceWay')} style={styles.button}>
                        <Text style={[styles.text],{color:mainColor}}>
                           立即取现
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.line}/>

                <View style={styles.row}>
                    {item('冻结中')}
                    {item('待结算')}
                    {item('已结算')}
                    {item('总交易')}
                </View>
            </View>
        )
    }


    __renderOrder(): ReactElement<any> {
        const item = (name: string, tip: string, source: number,page:number)=> {
            return (
                <TouchableOpacity onPress={()=>{this.props.push({key:'Order',page:page})}}>
                    {/*<Image source={}/>*/}
                    <Text style={styles.text}>{name}</Text>
                    <View style={styles.tip}>
                        <Text numberOfLines={1}
                              style={{color:'white',fontSize:9,textAlign:'center',
                              backgroundColor:'transparent'}}>
                            {tip}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <View style={styles.space}>
                <TouchableOpacity style={styles.row} onPress={()=>this.props.push('Order')}>
                    <Text style={styles.text}>
                        我的订单
                    </Text>
                    <View style={styles.row}>
                        <Text style={[styles.subText,{marginTop:0,marginRight:5}]}>
                            查看所有
                        </Text>
                        <View style={styles.arrowView}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.line}/>
                <View style={[styles.row,{paddingHorizontal:30}]}>
                    {item('待付款', '10',0,1)}
                    {item('待收货', '100',0,2)}
                    {item('已收货', '0',0,3)}
                </View>
            </View>
        )
    }


    render(): ReactElement<any> {
        const item = (name: string, source: number, onPress :Function)=> {
            return (
                <TouchableOpacity onPress={onPress}>
                    {/*<Image source={}/>*/}
                    <Text style={styles.text}>{name}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <ScrollView
                refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={()=>{}}
                />
            }
                style={[this.props.style,styles.wrap]}>
                {this.__renderTop()}
                {this.__renderMoney()}
                <View style={{marginTop:10}}/>
                {this.__renderOrder()}
                <View style={{marginTop:10}}/>
                <View style={styles.space}>
                    <View style={styles.row}>
                        {item('账单',0,()=>this.props.push('Bill'))}
                        {item('红包',0,()=>this.props.push('RedPocketRecord'))}
                        {item('返现购',0,()=>this.props.push({key:'SpecialBuy',category:0}))}
                        {item('独家购',0,()=>this.props.push({key:'SpecialBuy',category:1}))}
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.row}>
                        {item('领券购',0,()=>this.props.push({key:'SpecialBuy',category:2}))}
                        {item('邀请好友',0,()=>this.props.push('Invite'))}
                        {item('客服中心',0,()=>this.props.push('Service'))}
                        {item('关于巧惠',0,()=>this.props.push('About'))}
                    </View>


                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    top: {
        width: Dimensions.get('window').width,
        height: 150,
    },


    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgb(230,230,230)',
        marginVertical: 10,
    },
    space: {
        backgroundColor: 'white',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: 'rgb(80,80,80)',
        fontSize: 13,
        textAlign: 'center',
    },
    subText: {
        color: 'rgb(150,150,150)',
        fontSize: 12,
        marginTop: 5,
        textAlign: 'center',
    },
    button: {
        borderColor: mainColor,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    arrowView: {
        borderBottomWidth: StyleSheet.hairlineWidth * 1,
        borderRightWidth: StyleSheet.hairlineWidth * 1,
        borderColor: 'rgb(200,200,200)',
        transform: [{rotate: '315deg'}],
        marginRight: 5,
        width: 8,
        height: 8,
    },
    tip: {
        backgroundColor: mainColor,
        position: 'absolute',
        borderRadius: 5,
        top: 0,
        left: 20,
        // width:14,
        alignItems: 'center',
        paddingHorizontal: 3,
    },
    titel: {
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontSize: 13,
        color: 'white',
        marginTop: 60,
    },
    set:{
        marginTop:30,
        backgroundColor: 'transparent',
        color:'white',
        width:50,
        height:30,
        textAlign: 'right',
        marginLeft:Dimensions.get('window').width - 60,
    }
})

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        push: (key)=> {
            dispatch(navigatePush(key))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyComponet)
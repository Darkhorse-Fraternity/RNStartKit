import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    Dimensions,
    ScrollView,
} from 'react-native'

import {mainColor} from '../configure'
import {placeholder} from '../../source'

export function renderBuyRow(itme: Object, sectionID: number, rowID: number) {

    return (
        <TouchableOpacity
            onPress={()=>{
                 this.props.push('Product')
            }}>

            <View style={styles.row}>
                <View style={styles.row2}>
                    <View style={styles.rowInfo}>
                        <Image style={{height:80,width:80}} source={placeholder}/>
                        <View style={styles.rowTextInfo}>
                            <Text
                                numberOfLines={1}
                                style={styles.text}>
                                艾特兰洗衣液
                            </Text>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.infoView}>
                                    <Text style={[styles.textInfo1,{marginTop:5}]}>领劵购</Text>
                                    <Text style={{marginTop:3}}>
                                        <Text style={[styles.textInfo1,{color:mainColor}]}>￥</Text>
                                        <Text style={styles.textInfo2}>19.9</Text>
                                    </Text>
                                </View>
                                <View style={styles.seg}/>
                                <View style={styles.infoView}>
                                    <Text style={styles.textInfo1}>特卖29.9元</Text>
                                    <Text style={[styles.textInfo1,{color:mainColor,marginTop:3}]}>卷抵10.0元</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={styles.progess}>
                                    <View style={{backgroundColor:mainColor,width:5,height:4,borderRadius:5}}/>
                                </View>
                                <Text style={styles.textInfo1}>剩余40件</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.rightGo}>
                        <Text style={{color:'white',fontSize:12}}> 马上抢</Text>
                    </View>
                </View>
            </View>
            <View style={styles.line}/>
        </TouchableOpacity>
    )
}

export function renderRedPocketRow() {

    const renderItem = (item)=> {
        return (
            <View style={styles.redItem}>
                <Image style={{width:10,height:12}} source={placeholder}/>
                <Text style={{marginLeft:5,color:'white'}}>
                    <Text>{String(item)} 领取了</Text>
                    <Text style={{color:mainColor}}>红包</Text>
                </Text>

            </View>
        )
    }
    return (
        <View style={styles.redPocket}>
            <View style={styles.dialog}>
                <Text style={styles.dialogText}>12月28日 14:00</Text>
            </View>
            <View style={styles.redSubView}>
                <Image style={styles.avatar} source={placeholder}/>
                <View style={{width:200,height:100,backgroundColor:mainColor}}/>
            </View>
            {renderItem(1324531)}
            {renderItem(1324531)}
            {renderItem(1324531)}
        </View>
    )
}

export function renderOrderRow() {
    return (
        <TouchableOpacity
            onPress={()=>{
                 this.props.push('Product')
            }}>

            <View style={styles.row}>
                <View style={styles.row2}>
                    <View style={styles.rowInfo}>
                        <Image style={{height:60,width:60}} source={placeholder}/>
                        <View style={styles.rowTextInfo}>
                            <Text
                                numberOfLines={1}
                                style={[styles.text,{marginLeft:10,marginTop:10}]}>
                                艾特兰洗衣液
                            </Text>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.rightStatu2]}>
                                    <Text style={{color:mainColor,fontSize:11}}> 返现购</Text>
                                </View>
                                <View style={[styles.seg,{marginLeft:10,marginRight:10,
                                marginTop:15,backgroundColor:'rgb(230,230,230)'}]}/>
                                <View style={styles.infoView}>
                                    <Text style={{fontSize:15}}>
                                        <Text style={{fontSize:11}}>￥</Text>
                                        29.9元
                                    </Text>
                                    <Text style={[styles.textInfo1,{color:mainColor,marginTop:3}]}>卷抵10.0元</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.rightStatu}>
                        <Text style={{color:mainColor,fontSize:12}}> 已返现</Text>
                    </View>
                </View>
            </View>
            <View style={styles.line}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    text: {
        fontSize: 14,
        color: 'rgb(50,50,50)'
    },


    row: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    row2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowTextInfo: {
        marginLeft: 5,
    },
    textInfo1: {
        fontSize: 11,
        color: 'rgb(140,140,140)'
    },

    textInfo2: {
        marginTop: 5,
        fontSize: 14,
        color: mainColor,
        fontWeight: 'bold',
    },
    infoView: {
        marginTop: 8,
        marginBottom: 5,
    },
    seg: {
        marginLeft: 40,
        width: StyleSheet.hairlineWidth,
        backgroundColor: 'rgb(200,200,200)',
        marginRight: 4,
        marginTop: 8,
        marginBottom: 8,
    },
    progess: {
        width: 51,
        height: 5,
        borderColor: mainColor,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        marginRight: 8,

    },
    rightGo: {
        backgroundColor: mainColor,
        borderRadius: 4,
        width: 60,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },


    redPocket: {
        padding: 15,
        alignItems: 'center',
    },
    redSubView: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 15,
        marginBottom:10,
    },
    dialog: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    dialogText: {
        color: 'white',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    redItem:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:15,
        backgroundColor:"rgba(0,0,0,0.1)",
        paddingVertical: 1,
        paddingHorizontal: 10,
        borderRadius: 15,
    },
    rightStatu:{
        borderRadius: 4,
        width: 60,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:mainColor,
        borderWidth:StyleSheet.hairlineWidth
    },
    rightStatu2:{
        borderRadius: 15,
        width: 50,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:mainColor,
        borderWidth:StyleSheet.hairlineWidth,
        marginTop:15,
        marginLeft:10,
    }


})
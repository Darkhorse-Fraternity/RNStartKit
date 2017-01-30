/**
 * Created by lintong on 2016/12/7.
 * @flow
 */
'use strict';


import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
    Dimensions,
    Image,
} from 'react-native'
import {connect} from 'react-redux'
import {mainColor} from '../../configure'
import {dataStorage} from '../../redux/actions/util'
import {navigatePush} from '../../redux/actions/nav'
import {icon1} from '../../../source'
class MyComponet extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};


    __renderBoundary(title:string):ReactElement<any>{
        return (
            <View style={[styles.textButtonView,{paddingTop:20,paddingBottom:10}]}>
                <View style={styles.line}/>
                <Text style={styles.lineText}>{title}</Text>
                <View style={styles.line}/>
            </View>
        )
    }
    __renderTextButton(name: string, key: string): ReactElement<any> {


        const select = this.props.selectKey == key ? {

            backgroundColor:mainColor,
            borderWidth:0
        }:undefined
        const selectText =this.props.selectKey == key ? {
            color:'white',
        }:undefined
        return (
            <TouchableOpacity onPress={()=>this.props.dataStorage(key)} style={[styles.textButton,select]}>
                <Text style={[styles.textButtonText,selectText]}>{name}</Text>
            </TouchableOpacity>
        )
    }
    __renderImageButton(name: string,image:number, key: string): ReactElement<any> {
        const selectText = this.props.selectKey == key?{
            color:mainColor,
        }:undefined
        return (
            <TouchableOpacity onPress={()=>this.props.dataStorage(key)}>
                <Image source={icon1}/>
                <Text style={[styles.textButtonText,selectText]}>{name}</Text>
            </TouchableOpacity>
        )
    }

    render(): ReactElement<any> {
        return (
            <ScrollView style={[this.props.style,styles.wrap]}>
                {this.__renderBoundary('特色抢购')}
                <View style={styles.textButtonView}>
                    {this.__renderTextButton('领劵购', '1')}
                    {this.__renderTextButton('独家购', '2')}
                    {this.__renderTextButton('返现购', '3')}
                    {this.__renderTextButton('新人专享', '4')}
                </View>
                {this.__renderBoundary('分类筛选')}
                <View style={[styles.textButtonView]}>
                    {this.__renderImageButton('女装','','5')}
                    {this.__renderImageButton('男装','','6')}
                    {this.__renderImageButton('母婴','','7')}
                    {this.__renderImageButton('内衣','','8')}
                </View>
                <View style={[styles.textButtonView]}>
                    {this.__renderImageButton('食品','','9')}
                    {this.__renderImageButton('美饮','','10')}
                    {this.__renderImageButton('箱包','','11')}
                    {this.__renderImageButton('鞋帽','','12')}
                </View>
                <View style={[styles.textButtonView]}>
                    {this.__renderImageButton('珠宝','','13')}
                    {this.__renderImageButton('配饰','','14')}
                    {this.__renderImageButton('文体','','15')}
                    {this.__renderImageButton('家电','','16')}
                </View>
                <View style={[styles.textButtonView]}>
                    {this.__renderImageButton('居家百货','','17')}
                    {this.__renderImageButton('家装家纺','','18')}
                    {this.__renderImageButton('手机数码','','19')}
                    {this.__renderImageButton('户外运动','','20')}
                </View>


            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: 'white',
    },
    textButtonView: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        justifyContent: 'space-between',
        alignItems:'center',
        padding: 15,
    },
    textButton: {
        borderColor: 'rgb(150,150,150)',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems:'center',
    },
    textButtonText: {
        marginTop:5,
        fontSize: 13,
        textAlign:'center'
    },
    line:{
        height:StyleSheet.hairlineWidth,
        backgroundColor:'rgb(180,180,180)',
        flex:1,
    },
    lineText:{
        fontSize:11,
        marginHorizontal:20,
        color:'rgb(180,180,180)'

    }
})

const componentKey = 'searchKey'

const mapStateToProps = (state) => {
    const selectKey = state.util.get(componentKey)
    return {
        selectKey,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dataStorage:(key)=>{
            dispatch(dataStorage(componentKey,key))
            dispatch(navigatePush('BuyList'))
        },

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyComponet)
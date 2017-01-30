/**
 * Created by lintong on 2016/12/13.
 * @flow
 */
'use strict';


import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    Modal,
    Image,
    CameraRoll,
} from 'react-native'
import {connect} from 'react-redux'
import {dataStorage} from '../../redux/actions/util'
import {BCButton} from '../../components/Base/WBButton'
import {mainColor} from '../../configure'
import {placeholder} from  '../../../source/'
import {Toast} from '../../util'
class MyComponet extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};


    __renderShopping(): ReactElement<any> {
        return (
            <View style={styles.row}>
                <Text style={styles.title}>
                    购物规则
                </Text>
                <View style={styles.line}/>
                <Text style={styles.content}>
                    1、必须通过巧惠团App去完成下单并成功付款的订单才享有最实惠的蚁团到手价
                </Text>
                <Text style={styles.content}>
                    2、每个在售返商品如超过限购数量，多的商品件数或订购将不享有蚁团到手价资格
                </Text>
                <Text style={styles.content}>
                    3、维权退货退款订单（含部分退款或退货）将不享有最实惠的蚁团到手价
                </Text>
                <Text style={styles.content}>
                    4、一元购商品，如通过非正常手段参与抢购，将被拉入抢购黑名单！
                </Text>
            </View>
        )
    }

    __renderWithdraw(): ReactElement<any> {
        return (
            <View style={styles.row}>
                <Text style={styles.title}>
                    提现规则
                </Text>
                <View style={styles.line}/>
                <Text style={styles.content}>
                    1、如果存在异常购物等行为的用户，提现申请将在1-20天内完成审核
                </Text>
            </View>
        )
    }

    __renderCS(): ReactElement<any> {
        return (
            <View style={[styles.row,{flex: 1}]}>
                <TouchableOpacity onPress={()=>this.props.showModal(true)}
                                  style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.title,{fontSize:13}]}>
                            微信客服(每天9：00-23：00)
                        </Text>
                    </View>
                    <View style={styles.arrowView}/>
                </TouchableOpacity>
            </View>
        )
    }


    // componentDidMount() {
    //     this.props.showModal(false)
    // }

    __saveImage = ()=>{
        CameraRoll.saveToCameraRoll('file:///source/img/placeholder.png','photo').then(function (success) {
            Toast.show('保存成功')
            this.props.showModal(false)
            }, function (error) {
            Toast.show(error.message)
            this.props.showModal(false)
            }
        )
    }


    __showModal = ()=> {
        // console.log('testss:',this.state.mut)
        // const flag =
        console.log('test:', this.props.show)
        return (
            <Modal
                transparent={true}
                animationType='fade'
                onRequestClose={() => {
                   this.props.showModal(false)
                }}
                visible={this.props.show || false}>
                <TouchableOpacity
                    onPress={()=>{
                        this.props.showModal(false)
                    }}
                    style={styles.modal}>
                    <View
                        onStartShouldSetResponder={()=>true}
                        style={styles.modalSub}>
                        <View style={{padding:15}}>
                            <Text style={styles.tip}>关注
                                <Text style={styles.tip3}>巧惠团客户服务</Text>
                                微信公众号进行咨询
                            </Text>
                            <Text style={styles.tip2}>1、保存二维码：将我二维码保存到手机相册</Text>
                            <Text style={styles.tip2}>2、打开微信扫一扫，识别二维码</Text>
                            <Text style={styles.tip2}>
                                3、关注
                                <Text style={styles.tip3}>巧惠团客户服务</Text>
                                微信公众号进行咨询</Text>
                        </View>
                        <Image source={placeholder} style={{width:70,height:70,alignSelf:'center'}}/>
                        <BCButton
                            //disabled={!flag}
                            //isLoad={false}
                            onPress={this.__saveImage}
                            containerStyle={styles.buttonContainerStyle}>
                            保存二维码
                        </BCButton>
                    </View>
                </TouchableOpacity>
            </Modal>
            // this.props.select('车辆故障')
        )
    }

    render(): ReactElement<any> {
        return (
            <View style={[this.props.style,styles.wrap]}>
                {this.__showModal()}
                {this.__renderShopping()}
                {this.__renderWithdraw()}
                {this.__renderCS()}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    row: {
        backgroundColor: 'white',
        marginTop: 8,
        padding: 15,
    },
    title: {
        fontSize: 15,
        color: 'rgb(100,100,100)',
    },
    content: {
        fontSize: 13,
        color: 'rgb(155,155,155)',
        marginTop: 10,
    },
    line: {
        backgroundColor: 'rgb(200,200,200)',
        width: Dimensions.get('window').width,
        height: StyleSheet.hairlineWidth,
        marginTop: 10,

    },
    arrowView: {
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        borderRightWidth: StyleSheet.hairlineWidth * 2,
        borderColor: '#8c8c85',
        transform: [{rotate: '315deg'}],
        width: 10,
        height: 10,
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        // pointerEvents:'box-only',
    },
    modalSub: {

        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 5,
        marginHorizontal: 10,
        width: Dimensions.get('window').width - 60,
    },
    selectMulBtn: {
        marginTop: 10,
        marginLeft: 35,
        flexDirection: 'row',
        alignItems: 'center',
    },

    buttonContainerStyle: {
        marginTop: 20,
        marginBottom: 10,
        height: 40,
        justifyContent: 'center',
        marginHorizontal: 15,
    },
    tip1:{
        fontSize:13,
    },
    tip2:{
        fontSize:11,
        marginTop:10,
    },
    tip3:{
        color:mainColor,
    }
})

const cKey = 'Service_Modal_Show'
const mapStateToProps = (state) => {
    return {
        show: state.util.get(cKey),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showModal: (value)=> {
            dispatch(dataStorage(cKey, value))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyComponet)
/**
 * Created by lintong on 2016/12/21.
 * @flow
 */
'use strict';


import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    Modal,
    CameraRoll,
    Clipboard
} from 'react-native'
import {connect} from 'react-redux'
import {placeholder} from '../../source'
import {mainColor} from '../configure'
import {BCButton} from './Base/WBButton'
import {Toast} from '../util'
import {dataStorage} from '../redux/actions/util'
class MyComponet extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};


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

    show=()=>{
        this.props.showModal(true)
    }


    __showModal = ()=> {
        // console.log('testss:',this.state.mut)
        // const flag =
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
            <View>
                {this.__showModal()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
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
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyComponet)
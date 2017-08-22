/**
 * Created by lintong on 2016/12/21.
 * @flow
 */
'use strict';


import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    Modal,
    Button,
} from 'react-native'
import {connect} from 'react-redux'
import {placeholder} from '../../source'
import {mainColor} from '../configure'
import {Toast} from '../util'
import {dataStorage} from '../redux/actions/util'
import PropTypes from 'prop-types';
class MyComponet extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};


    show = ()=> {
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
                        <View style={{padding:15,alignItems:'center',paddingHorizontal:25}}>
                            <Image source={placeholder} style={{width:70,height:70,alignSelf:'center'}}/>
                            <Text style={styles.tip}>
                                如何获取更多红包
                            </Text>
                            <Text style={styles.tip2}>1、成功确认收货一笔订单,奖励一次抢红包资格</Text>
                            <Text style={styles.tip2}>2、签到抽奖所中抢红包奖项,你获得一次抢红包资格</Text>
                        </View>
                        <View style={styles.line}/>

                        <Button
                            color={mainColor}
                            title="知道了"
                            onPress={()=>this.props.showModal(false)}/>
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
    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor:'rgb(200,200,200)',
        marginHorizontal:20,
        marginBottom:10,
        marginTop:-5,
    },
    tip: {
        marginTop: 15,
        marginBottom: 15,
        fontSize:15,
    },
    tip2: {
        marginBottom: 10,
        fontSize:13,
        color:'rgb(150,150,150)'
    }
})
export const modalKey = 'RedPocket_Modal_Show'
const mapStateToProps = (state) => {
    return {
        show: state.util.get(modalKey),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showModal: (value)=> {
            dispatch(dataStorage(modalKey, value))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyComponet)
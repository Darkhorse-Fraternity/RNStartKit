/**
 * Created by lintong on 2017/8/30.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Platform,
    Dimensions,
    findNodeHandle,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
    ActivityIndicator
} from 'react-native'
import {BlurView as BlurViewIOS} from 'react-native-blur';
const BlurView = Platform.OS == 'ios' ? BlurViewIOS : View
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons'
export const Btn = Animatable.createAnimatableComponent(TouchableWithoutFeedback);
import Pop from '../../components/Pop'
import {connect} from 'react-redux'
import Toast from 'react-native-simple-toast'
import {classUpdate, classCreatNewOne} from '../../request/leanCloud'
import {batch} from '../../redux/module/leancloud'
import {selfUser, iCard} from '../../request/LCModle'
import {addEntities} from '../../redux/module/normalizr'
import moment from 'moment'
import {uploadFilesByLeanCloud} from '../../request/uploadAVImage'
import {ICARD, IDO} from '../../redux/reqKeys'

import ImageSelectView from '../../components/ImagePicker/ImageSelectView'
//static displayName = 
@connect(
    state =>({
        //data:state.req.get()
    }),
    dispatch =>({
        //...bindActionCreators({},dispatch),
        done: async(data, state, callBack) => {
            //先判断是否有图片，如果有则 先上传图片。

            callBack && callBack(true)

            try {
                const {files, ...otherState} = state
                let ims = []
                if (data.record.indexOf('图片') !== -1) {
                    const urls = files.map(file => file.uri)
                    const res = await uploadFilesByLeanCloud(urls)
                    ims = res.map(imgs=>imgs.attributes.url)
                }


                const id = data.objectId
                const time = data.time + 1
                const param = {
                    doneDate: {"__type": "Date", "iso": moment()},
                    time: time,
                    //cycle,
                    statu: time == data.period ? "stop" : "start"
                }




                const iCardP = classUpdate(ICARD, id, param)
                const iDoP = classCreatNewOne(IDO, {
                    ...selfUser(),
                    ...iCard(id),
                    ...otherState,
                    imgs: ims
                })

                const res = await batch([iCardP, iDoP])


                const entity = {
                    ...param,
                    ...(res[0].success)
                }

                dispatch(addEntities({
                    [ICARD]: {
                        [entity.objectId]: entity
                    }
                }))

                callBack && callBack(false)
                Pop.hide()

            } catch (e) {
                callBack && callBack(false)
            }

        },
    })
)
export  default  class  extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            backgroundView: null,
            load: false,
            recordText: '',
            files: []
        }
    }

    static propTypes = {
        data: PropTypes.object,
    };
    static defaultProps = {
        data: {}
    };
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '主页',
        }
    };

    // shouldComponentUpdate(nextProps: Object) {
    //     return !immutable.is(this.props, nextProps)
    // }

    __checkType = (type)=> {
        const data = this.props.data
        const record = data.record
        return record.indexOf(type) !== -1
    }

    __chackDone = ()=> {
        const {backgroundView,load,...state} = this.state

        if (this.__checkType('文字') && this.state.recordText.length == 0) {
            Toast.show('需要添加文字记录~')
            return;
        }

        if (this.__checkType('图片') && this.state.files.length == 0) {
            Toast.show('需要添加图片~')
            return;
        }


        const self = this
        this.props.done(this.props.data, state, load=> {
            self.setState({load})
        })
    }


    render(): ReactElement<any> {
        return (
            <View
                onStartShouldSetResponder={()=>true}
                onResponderGrant={Keyboard.dismiss}
                ref={(e) => {
                            if(this.state.backgroundView == null && Platform.OS == 'ios'){
                                this.setState({backgroundView:findNodeHandle(e) })
                            }
                    }}
                style={[this.props.style,styles.wrap,{backgroundColor:Platform.OS == 'ios'?
                'transparent':'rgba(255,255,255,0.95)'}]}>
                {Platform.OS == 'ios' && this.state.backgroundView && (<BlurView
                    style={[styles.absolute]}
                    viewRef={this.state.backgroundView}
                    blurType="xlight"
                    blurAmount={3}
                />)}
                <View/>
                <View style={styles.do}>
                    <Text style={{fontSize:15}}>一句话日记</Text>
                    {this.__checkType('文字') && (<TextInput
                        placeholderTextColor="rgba(180,180,180,1)"
                        returnKeyType='next'
                        maxLength={50}
                        value={this.state.recordText}
                        //keyboardType={boardType}
                        style={styles.textInputStyle}
                        underlineColorAndroid='transparent'
                        clearButtonMode='while-editing'
                        enablesReturnKeyAutomatically={true}
                        //onSubmitEditing={() =>this.focusNextField(ref)}
                        onChangeText={(text)=>this.setState({recordText:text})}
                    />)}
                    <View style={styles.line}/>
                    {this.__checkType('图片') && (<ImageSelectView
                        onChange={(files)=>{
                            this.setState({files})
                        }}
                        files={this.state.files}
                        maxImage={1}/>)}

                    {this.state.load ?
                        (<View style={[{padding:20}]}>
                            <ActivityIndicator size="large"/>
                        </View>) :
                        (<View style={[styles.top,{padding:20}]}>
                            <Btn
                                useNativeDriver
                                duration={2000}
                                easing="ease-in-out"
                                animation="bounceIn"
                                style={styles.close}
                                onPress={()=>{Pop.hide()}}>
                                <Icon name="md-close" size={80}/>
                            </Btn>
                            <Btn
                                useNativeDriver
                                duration={2000}
                                easing="ease-in-out"
                                animation="bounceIn"
                                style={styles.close}
                                onPress={this.__chackDone}>
                                <Icon name="md-checkmark" size={80}/>
                            </Btn>
                        </View>)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    absolute: {
        ...StyleSheet.absoluteFillObject,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

    },
    do: {
        padding: 50,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    textInputStyle: {
        marginTop: 30,
    },
    line: {
        marginTop: 5,
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
})

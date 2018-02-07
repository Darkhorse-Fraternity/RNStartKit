/**
 * Created by lintong on 2017/7/13.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Platform,
    findNodeHandle,
    Text,
    TouchableWithoutFeedback
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {BlurView as BlurViewIOS} from 'react-native-blur';
const BlurView = Platform.OS == 'ios' ? BlurViewIOS : View
import Icon from 'react-native-vector-icons/Ionicons'
import Pop from '../../components/Pop'
import {logout} from '../../redux/actions/user'
import * as Animatable from 'react-native-animatable';
import { NavigationActions } from 'react-navigation';
export const Btn = Animatable.createAnimatableComponent(View);
// function makeScaleInTranslation(translationType, fromValue) {
//     return {
//         from: {
//             [translationType]: 0.9,
//         },
//         to: {
//             [translationType]: fromValue,
//         },
//     };
// }
// const menuBtnAction = makeScaleInTranslation('scale', 1);
// Animatable.initializeRegistryWithDefinitions({menuBtnAction})
//static displayName = Menu
@connect(
    state =>({
        //data:state.req.get()
    }),
    dispatch =>({
        //...bindActionCreators({},dispatch),
        logOut:()=>dispatch(logout()),
        push:(routeName)=>dispatch(NavigationActions.navigate({routeName}))
    })
)
export  default  class Menu extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            backgroundView: null,
            locationX: 0,
        }
    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '菜单',
        }
    };

    // shouldComponentUpdate(nextProps: Object) {
    //     return !immutable.is(this.props, nextProps)
    // }


    componentWillMount() {
        this._gestureHandlers = {
            onStartShouldSetResponder: () => true,  //对触摸进行响应
            onMoveShouldSetResponder: ()=> true,  //对滑动进行响应
            onResponderGrant: (evt)=> {
                this.setState({locationX: evt.nativeEvent.locationX})
            }, //激活时做的动作
            onResponderRelease: (evt)=> {
                if (this.state.locationX - evt.nativeEvent.locationX > 50) {
                    Pop.hide()
                }
                this.setState({locationX: 0})
            }, //动作释放后做的动作
        }

    }


    render(): ReactElement<any> {
        const {push} = this.props
        return (
            <View
                {...this._gestureHandlers}
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
                <View style={styles.menu}>
                    <Btn
                        useNativeDriver

                        duration={2000}
                        easing="ease-in-out"
                        animation="bounceIn"
                        style={styles.close}
                        onStartShouldSetResponder={()=>true}
                        onResponderGrant={()=>{
                            Pop.hide()
                           push('Record')
                        }}
                        onPress={()=>{

                        }}>
                        <Icon name="md-done-all" size={50}/>
                        <Text>我的记录</Text>
                    </Btn>
                    <Btn
                        delay={200}
                        useNativeDriver
                        duration={2000}
                        easing="ease-in-out"
                        animation="bounceIn"
                        style={styles.close}
                        onStartShouldSetResponder={()=>true}
                        onResponderGrant={()=>{

                            Pop.hide()
                             push('Publish')
                        }}
                        onPress={()=>{

                        }}>
                        <Icon name="ios-brush" size={50}/>
                        <Text>我的卡片</Text>
                    </Btn>
                    <Btn
                        delay={200}
                        useNativeDriver
                        duration={2000}
                        easing="ease-in-out"
                        animation="bounceIn"
                        style={styles.close}
                        onStartShouldSetResponder={()=>true}
                        onResponderGrant={()=>{
                            Pop.hide()
                            this.props.logOut()
                        }}
                        onPress={()=>{

                        }}>
                        <Icon name="md-log-out" size={50}/>
                        <Text>退出</Text>
                    </Btn>
                </View>
                <Btn
                    delay={500}
                    useNativeDriver
                    duration={2000}
                    easing="ease-in-out"
                    animation="bounceIn"
                    style={styles.close}
                    onStartShouldSetResponder={()=>true}
                    onResponderGrant={()=>{
                            Pop.hide()
                        }}
                    onPress={()=>{}}>
                    <Icon name="md-close" size={50}/>
                </Btn>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    absolute: {
        ...StyleSheet.absoluteFillObject,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

    },
    close: {
        bottom: 20,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin:20,
    },
    menu:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        justifyContent:'center'
    }
})

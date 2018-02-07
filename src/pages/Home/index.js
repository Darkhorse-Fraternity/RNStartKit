/**
 * Created by lintong on 2017/7/3.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
} from 'react-native'
import {connect} from 'react-redux'

import * as Animatable from 'react-native-animatable';


import PushManage from '../../configure/localNotification'

function makeScaleInTranslation(translationType, value) {
    return {
        from: {
            [translationType]: 0,
        },
        to: {
            [translationType]: value,
        },
    };
}

const cloudMoveLeft = makeScaleInTranslation('translateX', -500);
Animatable.initializeRegistryWithDefinitions({cloudMoveLeft})


@connect(
    state => ({
        isLogin: state.user.isLogin,
        user: state.user.data
    }),
    (dispatch, props) => ({
        //...bindActionCreators({},dispatch)
        sayHello: () => {

        }
    })
)
export default class Home extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};


    static navigationOptions = props => {
        const {navigation} = props;
        const {state} = navigation;
        const {params} = state;
        const isLogin = params ? params.isLogin : false
        // console.log('test:', params,localLoad);
        return {
            // header: isLogin ? undefined : ()=>(<View style={{height:64,backgroundColor:'#F5FCFF'}}/>),
            title: '金色光芒',
            gesturesEnabled: false,
            header: null
            //     headerRight: ( <TouchableOpacity
            //         style={styles.headerBtn}
            //         onPress={()=>{
            //                 navigation.navigate('NewCard')
            //             }}>
            //         <Icon name="md-add" size={30}/>
            //     </TouchableOpacity>),
            //     headerLeft: (
            //         <TouchableOpacity
            //             style={styles.headerBtn}
            //             onPress={()=>{
            //                 Pop.show(<Menu/>,{maskStyle:{backgroundColor:'transparent'}})
            //         }}>
            //             <Icon name="md-list" size={30}/>
            //         </TouchableOpacity>)
        }
    };


    componentWillReceiveProps(nextProps) {

        if (nextProps.isLogin !== this.props.isLogin) {
            const {navigation} = nextProps;
            navigation.setParams({isLogin: nextProps.isLogin})
            // LayoutAnimation.spring()
        }
    }


    _renderHeader = () => {
        const user = this.props.user
        const name = user.username !== user.mobilePhoneNumber ? user.username : '陌生人'
        return (
            <View style={styles.headView}>
                <Text
                    numberOfLines={2}
                    style={styles.headViewText}>
                    -{name},您好！
                </Text>
                <View style={styles.headViewSub}>
                    <Text style={styles.headViewSubText}>想尝试什么?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('NewCard')
                        }}
                        hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
                        style={styles.headerBtn}>
                        <Text style={styles.headerBtnText}>添加</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render(): ReactElement<any> {
        const {isLogin} = this.props

        return (
            <ScrollView style={[this.props.style, styles.container]}>
                <PushManage/>

            </ScrollView>
        );
    }
}


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },

    header: {
        marginTop: 30,
        flexDirection: 'row',
        width: width,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },

    // headerBtn: {
    //     padding: 20,
    //     paddingHorizontal: 15,
    // },
    main: {
        flex: 1,
    },
    loginBg: {
        width: width,
        height: height - 64,
        alignItems: 'center'

    },
    login: {
        width: width - 100,
        height: 300,
        marginTop: 100,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0.3,
        },
        justifyContent: 'space-between',
        borderTopColor: '#EE7A8D',
        borderTopWidth: 4,
    },
    headView: {
        // height:180,

        marginBottom: 35,
        marginTop: 20
    },
    headViewText: {
        marginTop: 30,
        marginHorizontal: 20,
        fontSize: 50,
        fontWeight: 'bold',
    },
    headViewSubText: {
        marginTop: 10,
        // marginHorizontal: 20,
        fontSize: 14,
    },
    headViewSub: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        alignItems: 'center',
        // backgroundColor: "red"
    },
    headerBtn: {
        backgroundColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    headerBtnText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',

    }


})

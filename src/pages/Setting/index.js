/* @flow */
'use strict';
import  React, {Component, PropTypes} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image,
    ActivityIndicator,
    Switch,
    Linking,
    Platform,
} from 'react-native'
import Toast from 'react-native-simple-toast';
import {blackFontColor, backViewColor, mainColor} from '../../configure';
import {connect} from 'react-redux'
import {logout} from '../../redux/actions/login'
import {dataStorage} from '../../redux/actions/util'
import DeviceInfo from 'react-native-device-info'
const styles = StyleSheet.create({
    list: {
        backgroundColor: backViewColor,
    },
    groupSpace: {
        height: 15 / 2,
    },
    group: {
        backgroundColor: 'white',
    },
    row: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },


    // cbutton:{
    //   marginRight:10,
    //   marginLeft:10,
    //   marginTop: 20,
    //   height: 40,
    //   justifyContent: 'center',
    // },
    arrowView: {
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        borderRightWidth: StyleSheet.hairlineWidth * 2,
        borderColor: '#8c8c85',
        transform: [{rotate: '315deg'}],
        width: 10,
        height: 10,
    },
    ImageStyles: {
        width: 30,
        height: 30,
    },
    imageNail: {
        // marginTop: 13,
        // marginBottom: 13,
        marginLeft: 10,
        width: 20,
        height: 20,
    },

    rowText: {
        marginLeft: 10,
        fontSize: 14,
        color: blackFontColor,
    },
    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(100,100,100,0.1)',
    },
});


class WBSetting extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            logoutLoad: false
        }
    }

    state: {
        logoutLoad:bool
    };

    _renderRow(title: string, needArrow: bool, activity: bool = false, onPress: Function = ()=> {
    }) {
        return (
            <TouchableHighlight onPress={onPress}>
                <View style={styles.row}>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        {/*<Image
                         source={source}
                         style={styles.imageNail}
                         />*/}
                        <Text style={styles.rowText}>
                            {title}
                        </Text>
                    </View >
                    {activity == false && needArrow && <View style={styles.arrowView}/>}
                    {activity == true && <ActivityIndicator/>}
                </View>
            </TouchableHighlight>
        );
    }

    _logout = ()=> {
        //发送请求给服务器
        this.props.logout();
    };

    componentDidMount() {
        if (this.props.notiValue == undefined) {
            global.storage.load({key: 'Noti',}).then(ret => {
                console.log('test:', ret)
                this.props.noti(ret)
            }).catch(err => {
                this.props.noti(true)
                // console.log('error:',err);
            })
        }

    }


    render() {
        return (
            <ScrollView style={styles.list}>
                <View style={styles.groupSpace}/>


                <View style={[styles.row,{paddingVertical: 5}]}>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        {/*<Image
                         source={source}
                         style={styles.imageNail}
                         />*/}
                        <Text style={styles.rowText}>
                            消息通知
                        </Text>
                    </View >
                    <Switch onTintColor={mainColor} onValueChange={this.props.noti} value={this.props.notiValue}/>
                </View>


                <View style={styles.line}/>
                {this._renderRow('修改手机', true, false, () => {
                    this.props.push("ChangePhone");
                })}

                <View style={styles.groupSpace}/>
                {this._renderRow('客服中心', true, false, () => {
                    this.props.push("Service");
                })}
                <View style={styles.line}/>
                {this._renderRow('关于我们', true, false, () => {
                    this.props.push("About");
                })}
                <View style={styles.line}/>
                {this._renderRow('给个评价', true, false, () => {
                    let url = ''
                    if (Platform.OS == 'ios') {
                        url = 'http://itunes.apple.com/WebObjects/MZStore.woa/wa/' +
                            'viewContentsUserReviews?id=APPID' +
                            '&pageNumber=0&sortOrdering=2&type=Purple+Software&mt=8'
                    } else {
                        url = 'market://details?id=' + DeviceInfo.getBundleId()
                    }
                    Linking.openURL(url)

                })}
                <View style={styles.line}/>
                <View style={styles.groupSpace}/>
                {this._renderRow('清除缓存', true, false, () => {
                    Toast.show('清除成功')
                })}


                <View style={styles.groupSpace}/>
                <TouchableHighlight style={[styles.row,{justifyContent:'center'}]} onPress={this._logout}>
                    <Text style={[styles.rowText,{fontSize:13}]}>
                        退出登录
                    </Text>
                </TouchableHighlight>

            </ScrollView>
        );
    }
}

const cKey = 'Setting'
const mapStateToProps = (state) => {
    //从login reduce 中获取state的初始值。
    //console.log('state:',state);

    return {
        notiValue: state.util.get(cKey),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        push: (key)=> {
            // dispatch(navigatePush(key))
        },
        logout: ()=> {

            //TODO:用这种方法清除了多动画，但是动画并没有按照最后一个页面的动画方向行驶、
            //期待有更好的解决思路。

            //清除数据。
            // clearUserData();

            //清除中间route
            // dispatch(navigateClearMiddleScene('Setting'));
            // //
            // //返回到第一层
            dispatch(logout());
            // DeviceEventEmitter.emit("logout");


        },
        noti: (value)=> {
            global.storage.save({
                key: 'Noti',  //注意:请不要在key中使用_下划线符号!
                data: value,
            });
            dispatch(dataStorage(cKey, value))
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WBSetting)

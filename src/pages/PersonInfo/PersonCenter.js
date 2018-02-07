/* @flow */
'use strict';

import React, {Component} from 'react';
import  {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    RefreshControl,
} from 'react-native'

import {blackFontColor, grayFontColor, backViewColor} from '../../configure';
import {connect} from 'react-redux'


class PersonCenter extends Component {
    state: {
        refreshing: bool,
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    static navigationOptions = props => {
        const {navigation} = props;
        const {state} = navigation;
        const {params} = state;
        const isLogin = params ? params.isLogin : false
        // console.log('test:', params,localLoad);
        return {
            // header: isLogin ? undefined : ()=>(<View style={{height:64,backgroundColor:'#F5FCFF'}}/>),
            gesturesEnabled:false,
            header:null

        }
    };





    __renderLoginRow() {
        const navigation = this.props.navigation
        return (
            <View>
                {this._renderRow('我的记录', styles.group, true, () => {
                    navigation.navigate('Record');
                })}
                {this._renderRow('我的卡片', styles.group, true, () => {
                    navigation.navigate('Publish');
                })}

                {/*{this._renderRow('我的服务', styles.group, true, () => {*/}
                    {/*navigation.navigate('iServe');*/}
                {/*})}*/}

                {/*{this._renderRow('我的收藏', styles.group, true, () => {*/}
                    {/*navigation.navigate('iCollect');*/}
                {/*})}*/}


                {/*{this._renderRow('我的收藏', styles.group, true, () => {*/}

                {/*})}*/}
                {this._renderRow('设置', styles.group, true, () => {
                    navigation.navigate('Setting');
                })}
            </View>
        )
    }

    render() {
        // let leftCourseTime = this.state.userCenterData.left_course_time || 0;
        // let courseTimeStr = '剩余课时: '+leftCourseTime+'课时';
        const isLogin = this.props.login.isLogin
        const navigation = this.props.navigation
        return (
            <ScrollView
                style={styles.list}
                //refreshControl={
                // <RefreshControl
                // 	refreshing={this.state.refreshing}
                // 	onRefresh={this._handleRefresh}
                // 	/>
                //}
            >
                {this._renderHeadRow(this.props.login.data, () => {
                    isLogin?navigation.navigate( 'PersonInfo'):navigation.navigate( 'RegPhone')

                })}

                {isLogin && this.__renderLoginRow()}

            </ScrollView>
        );
    }

    _renderRow(title: string, style: any, isArraw: bool = false, onPress: Function = ()=> {
    }, description: any = null) {
        return (
            <TouchableOpacity onPress={onPress} style={style}>
                <View style={styles.row}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        {/*<Image
                         resizeMode='contain'
                         source={source}
                         style={styles.imageNail}
                         />*/}
                        <Text style={styles.rowText}>
                            {title}
                        </Text>
                    </View >
                    <View style={styles.row2}>
                        {description ? <Text style={styles.description}>{description}</Text> : null}
                        {isArraw ? <View style={styles.arrowView}/> : null}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }


    _renderHeadRow(data: Object, onPress: Function = ()=> {
    }) {
        // let {grade_str,connect_phone} = data;
        // console.log('test111:',data.avatar.url)
        const name = data.username !== data.mobilePhoneNumber ? data.username : '陌生人'
        const isLogin = this.props.login.isLogin
        const tip = isLogin?'查看或编辑个人资料':'先登录吧~'
        const arraw = ()=>{
            return  (<View style={styles.arrowView}/>)
        }
        return (
            <TouchableOpacity onPress={onPress} style={styles.head}>
                {/*<View style={styles.headerStyle}>
                 <Image
                 source={{uri: data.avatar && data.avatar.url||''}}
                 style={styles.thumbnail}
                 />
                 <View style={styles.infoContainer}>
                 <View style={styles.titleContainer}>
                 <Text style={styles.title}>{data.username}</Text>

                 </View>
                 <Text style={styles.teacherName}>
                 {data.mobilePhoneNumber}
                 </Text>
                 </View>
                 <View style={styles.arrowView}/>
                 </View>*/}
                <View style={styles.headView}>
                    <Text style={styles.headViewText}>
                        -{name}
                    </Text>
                    <Text style={styles.headViewSubText}>{tip}</Text>
                </View>
                {!isLogin && arraw()}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

    group: {
        // marginBottom: 7，
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e4e4e4',
    },
    head:{
        marginBottom: 7,
        flexDirection:'row',
        height: 170,
        backgroundColor: 'white',
        alignItems:'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    emptyPageText: {
        margin: 10,
    },
    list: {
        flex: 1,
        backgroundColor: 'white',
    },
    bottomLine: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e4e4e4',
    },
    row: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageNail: {
        // marginTop: 13,
        // marginBottom: 13,
        marginLeft: 10,
        width: 20,
        height: 20,
    },

    row2: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    rowNote: {
        fontSize: 17,
    },
    rowText: {
        marginLeft: 10,
        fontSize: 14,
        color: blackFontColor,
    },
    arrowView: {
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        borderRightWidth: StyleSheet.hairlineWidth * 2,
        borderColor: '#8c8c85',
        transform: [{rotate: '315deg'}],
        marginRight: 5,
        width: 10,
        height: 10,
    },

    headerStyle: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    description: {
        marginRight: 12,
        fontSize: 13,
        color: blackFontColor
    },


    headViewText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    headViewSubText: {
        marginTop: 10,
        fontSize: 13,
    },
});


const mapStateToProps = (state) => {
    //从login reduce 中获取state的初始值。
    //console.log('state:',state);
    return {
        avatar: state.util.get('loadAvatar').toObject(),
        login: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonCenter)

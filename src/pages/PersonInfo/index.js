/* @flow */
'use strict';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Picker,
    Image,
    LayoutAnimation,
} from 'react-native'
import imagePicker from '../../components/ImagePicker/imagePicker'
import {connect} from 'react-redux'
import {uploadAvatar} from '../../redux/actions/util'
import {backViewColor, blackFontColor, grayFontColor} from '../../configure';
import {createAnimatableComponent} from 'react-native-animatable';

const AniScrollView = createAnimatableComponent(ScrollView);
const styles = StyleSheet.create({
    list: {
        backgroundColor: 'white',
    },
    groupSpace: {
        height: 15 / 2,
    },
    group: {
        borderBottomWidth: StyleSheet.hairlineWidth ,
        borderBottomColor: '#e4e4e4',
        paddingVertical:30,
    },
    headerStyle: {
        paddingLeft: 29 / 2,
        paddingRight: 23 / 2,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    row: {
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: 29 / 2,
        paddingRight: 23 / 2,
        paddingVertical:30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth ,
        borderBottomColor: '#e4e4e4',
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowText: {
        fontSize: 14,
        // fontWeight: '500',
        color: blackFontColor,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#bbbbbb',
        marginLeft: 15,
    },
    arrowView: {
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        borderRightWidth: StyleSheet.hairlineWidth * 2,
        borderColor: '#8c8c85',
        transform: [{rotate: '315deg'}],
        marginLeft: 5,
        width: 10,
        height: 10,
    },
    destext: {
        margin: 56 / 2,
        marginLeft: 15,
        // marginLeft:15,
        fontSize: 11,
        color: grayFontColor
    },

    thumbnail: {
        marginTop: 13,
        marginBottom: 13,
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: -2
    },

});


class PersonInfo extends React.Component {

    constructor(props: Object) {
        super(props);
        this.state = {}
    }

    state: {};

    componentDidMount() {



        // this.userListener = userManager.lestenUerInfo((info) => {
        //   // self.setState({userCenterData:info})
        //   this.setState({...info})
        // })
    }

    componentWillUnmount() {
        // this.schoolChangeListener.remove();
        // this.nickNameListener.remove();
        // this.phoneListener.remove();
        // this.placeIDChangeListener.remove();
        // let listeners = DeviceEventEmitter.listeners("schoolChanged");
        // console.log("listeners", listeners);
        // this.handle && this.handle.next();
        // this.userListener && this.userListener.remove();
    }

    _renderHeadRow(onPress: Function = () => {
    }) {
        const my_head = require('../../../source/img/my/my_head.png');
        const source = this.props.userData.avatar ? {uri: this.props.userData.avatar.url} : my_head

        return (
            <TouchableOpacity onPress={onPress} style={styles.group}>
                <View style={styles.headerStyle}>

                    <View style={styles.infoContainer}>
                        <Text style={styles.rowText}>修改头像</Text>
                    </View>
                    <Image
                        source={source}
                        style={styles.thumbnail}
                    />
                    <View style={styles.arrowView}/>
                </View>
            </TouchableOpacity>
        );
    }


    _renderRow(title: string, des: string, onPress: Function) {
        return (
            <View>
                <TouchableOpacity onPress={onPress}>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>
                            {title}
                        </Text>
                        <View style={styles.row2}>
                            <Text style={styles.rowText}>
                                {des}
                            </Text>
                            {title != '账号' && <View style={styles.arrowView}/>}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    // handle:Object;
    // _changeGrade=(value:string)=>{
    //
    //   if(!value || value == '未设定') return;
    //   this.setState({grade_str: value});
    //   //保存到服务器
    //   saveUserInfoRequest.params.grade = gradeName.indexOf(value) +1;
    //   if(saveUserInfoRequest.params.grade >0){
    //     this.handle  = request(saveUserInfoRequest, function(response){
    //          if(response.statu){
    //            userManager.saveInfo({grade_str:value,grade:
    //              saveUserInfoRequest.params.grade});
    //          }
    //     });
    //   }
    // };


    // _showDialog(){
    //   if(OS != 'ios'){
    //     const callBack = (id, text)=>{
    //        this._changeGrade(text);
    //     };
    //     const data =   {
    //         items: gradeName,
    //         title: "选择年级",
    //         itemsCallback: callBack,
    //         negativeText: "取消",
    //     }
    //
    //     const dialog = new DialogAndroid();
    //     dialog.set(data);
    //     dialog.show();
    //   }
    // }

    // _renderPicker() {
    //
    //   if(this.state.showPicker && OS == 'ios' ){
    //       let selectedValue = this.state.grade_str|| '高一';
    //       return (
    //         <View>
    //           <Picker
    //             selectedValue={selectedValue}
    //             mode = 'dropdown'
    //             onValueChange={(value) => this._changeGrade(value)}>
    //             {gradeName.map((key) =>
    //                 <Picker.Item label={key} value={key} key='test' />
    //             )}
    //           </Picker>
    //         </View>
    //       );
    //     }
    // }

    render() {


        // console.log('test:',this.props.userData);

        return (
            <ScrollView  style={styles.list}>
                {this._renderHeadRow(this.props.picker)}
                {this._renderRow('昵称', this.props.userData.username, () => {
                    this.props.navigation.navigate("NickName");
                })}
            </ScrollView>
        );
    }
}


const mapStateToProps = (state) => {
    //从login reduce 中获取state的初始值。
    // console.log('state:',state);
    return {
        userData: state.user.data,
        //  state:state.route.navigationState.routes[state.route.navigationState.index],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        picker: () => {
            // dispatch(pickerImage())
            imagePicker({
                title: '添加图片',
                maxWidth: 500, // photos only
                maxHeight: 500, // photos only
            }, (response) => {
                // console.log('Response = ', response);
                if (response.uri) {
                    dispatch(uploadAvatar(response.uri))
                }
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonInfo)

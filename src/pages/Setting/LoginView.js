/* @flow */

'use strict';

import React, {Component, PropTypes} from 'react';

import {
    ScrollView,
    StyleSheet,
    TextInput,
    View,
    Image,
    Text,
    TouchableOpacity,
    LayoutAnimation
} from 'react-native'


import {pixel, Toast, checkPhoneNum} from '../../util';
import {mainColor, backViewColor, textInputTextColor, placeholderTextColor} from '../../configure';
import WBButton, {BCButton} from '../../components/Base/WBButton';

import {connect} from 'react-redux'
// import {navigatePush} from '../../redux/actions/nav'
import {login, accountTextChange, passwordTextChange, loadAccountAction} from '../../redux/actions/login'

class LoginView extends React.Component {

  constructor(props: Object) {
    super(props);
    this.state = {
      needUp: false,
    }
  }

  state: {
    needUp:bool
  };

  static navigationOptions = props => {
    const {navigation} = props;
    const {state} = navigation;
    const {params} = state;
    return {
      title: '登录',
      headerRight: (
          <TouchableOpacity
              onPress={() =>{navigation.navigate('RegPhone')}}
          >
            <Text style={{color:'#0093cb',marginHorizontal:15}}>注册</Text>
          </TouchableOpacity>
      ),
    }
  };
  static mode = "modal"

  static propTypes = {
    loginPress: PropTypes.func.isRequired,
    accountChange: PropTypes.func.isRequired,
    passwordChange: PropTypes.func.isRequired,
    loadAccount: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    //  needUp:PropTypes.bool.isRequired,
  };


  static contextTypes = {
    router: PropTypes.object,
  };
  //requestHandle:Object;

  _login = () => {
    if (this.props.state.accountText.length === 0) {
      Toast.show('账号不能为空');
      this.refs[1].focus();
      return;
    }

    //判断手机号的正则
    var reg2 = /^.{11,16}$/;
    var flag2 = reg2.test(this.props.state.accountText)
    if (!flag2) {
      Toast.show('不是正确的手机号码');
      this.refs['1'].focus();
      return;
    }

    //判断设置密码是否正确 6到16位
    const reg = /^.{6,16}$/;
    var flag = reg.test(this.props.state.passwordText)
    if (!flag) {
      Toast.show('密码设置不正确');
      this.refs['2'].focus();
      return;
    }

    this.props.loginPress(this.props.state);
    // this.setState({
    //    loaded: true,
    // });
    // var self = this;
    //
    // loginRequest.params.user_name = this.state.accountText;
    // loginRequest.params.password = this.state.passwordText;
    //
    // this.requestHandle = request(loginRequest, function(response){
    //
    //   self.setState({loaded:false});
    //      if(response.statu){
    //
    //        saveUserData(response.data,loginRequest.params.user_name);//保存到本地。
    //       !__DEV__ && self.setState({passwordText:"",});
    //       //  NavigationManager.goBack({isLogin:true});
    //     //  NavigationManager.login();
    //     // NavigationManager.goToPage("CourseView")
    //     console.log('nav:',self.props.navigator);
    //       self.props.navigator.push({name:"main", component:MainTabView});
    //      }
    //
    // });
  };

  timer: number;
  refcus: bool = false;
  //做视图动画。
  _needUp(need: bool) {
    // LayoutAnimation.linear();
    if (need == this.state.needUp == true) {
      this.refcus = true;
    } else {
      this.refcus = false;
    }

    if (need == this.state.needUp) {
      return;
    }
    if (need) {
      LayoutAnimation.configureNext.bind(
          null, LayoutAnimation.Presets.easeInEaseOut
      )();
      this.setState({needUp: need});
    } else {
      //如果在10内继续获得焦点，则不作控制。
      var self = this;
      this.timer = setTimeout(()=> {
        if (self.refcus == true) {
          self.refcus = false;
          return;
        }
        LayoutAnimation.configureNext.bind(
            null, LayoutAnimation.Presets.easeInEaseOut
        )();
        self.setState({needUp: need});

      }, 10);
    }
  }

  componentDidMount() {
    //  NavigationManager.navigator = this.props.navigator;
  }

  componentWillMount() {
    !__DEV__ && this.props.loadAccount();
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);

    //this.requestHandle && this.requestHandle.next();
  }

  focusNextField(nextField: string) {
    this.refs[nextField].focus();
  }

  render() {
    var reg = /^.{6,16}$/;
    // let disabled = !checkPhoneNum(this.props.state.accountText) || !reg.test(this.props.state.passwordText)
    var reg2 = /^.{11,16}$/;
    let disabled = !reg2.test(this.props.state.accountText) || !reg.test(this.props.state.passwordText)


    const {state, passwordChange, accountChange} = this.props;
    const {navigation} = this.props;
    return (
        <View
            style={styles.container}
            onStartShouldSetResponder={()=>true}
            onResponderGrant={()=>{
            this.refs[1].isFocused() && this.refs[1].blur();
            this.refs[2].isFocused() && this.refs[2].blur();
          }}
        >
          {/*{this.state.needUp == false && <Image
           resizeMode = 'contain'
           style={styles.icon}
           source={require('../../source/img/xy_logo/xy_logo.png')}
           />}*/}
          <View style={styles.top}>
            <View style={[styles.textBackViewStyle]}>
              {/*<Image
               resizeMode = 'contain'
               style={styles.iconInsertStyle}
               source={require('../../source/img/xy_id/xy_id.png')}
               />*/}
              <TextInput
                  style={styles.textInputStyle}
                  placeholderTextColor={placeholderTextColor}
                  ref="1"
                  onChangeText={(text) => accountChange(text)}
                  defaultValue={state.accountText}
                  placeholder="手机号"
                  maxLength={12}
                  //keyboardType='numeric'
                  underlineColorAndroid='transparent'
                  clearButtonMode='while-editing'
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='next'
                  selectionColor={mainColor}
                  onBlur={this._needUp.bind(this,false)}
                  onFocus={this._needUp.bind(this,true)}
                  onSubmitEditing={() => this.focusNextField('2')}
              />
            </View>
            <View style={styles.line}/>
            <View style={styles.textBackViewStyle}>
              {/*<Image
               resizeMode = 'contain'
               style={styles.iconInsertStyle}
               source={require('../../source/img/xy_password/xy_password.png')}
               />*/}
              <TextInput
                  ref="2"
                  style={styles.textInputStyle}
                  placeholderTextColor={placeholderTextColor}
                  onChangeText={(text) => passwordChange(text)}
                  defaultValue={state.passwordText}
                  secureTextEntry={true}
                  placeholder="密码"
                  selectTextOnFocus={false}
                  underlineColorAndroid='transparent'
                  clearButtonMode='while-editing'
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='join'
                  selectionColor={mainColor}
                  onBlur={this._needUp.bind(this,false)}
                  onFocus={this._needUp.bind(this,true)}
                  onSubmitEditing={this._login}
              />
            </View>
          </View>
          <TouchableOpacity

              onPress={()=>navigation.navigate('FindPwd')}
              style={styles.mbutton}
          >
            <Text style={styles.buttonTextColor}> {'忘记密码?'} </Text>
          </TouchableOpacity>


          <BCButton
              onPress={this._login}
              containerStyle={styles.cbutton}
              disabled={disabled}
              isLoad={state.loaded}
          >
            登 录
          </BCButton>

          {/*<WBButton*/}
          {/*onPress={()=>router.push('mine/RegPhone')}*/}
          {/*style={{color:mainColor}}*/}
          {/*containerStyle={[styles.creactbutton,{marginTop:10}]}*/}
          {/*>*/}
          {/*注 册*/}
          {/*</WBButton>*/}

        </View>

    );
  }


}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },


  icon: {
    alignSelf: 'center',
    marginTop: 188 / 2,
    height: 57,
    width: 187,
  },

  iconInsertStyle: {
    marginTop: 17 / 2,
    marginLeft: 31 / 2,
    marginBottom: 17 / 2,
    marginRight: 29 / 2,
    width: 23,
  },

  textBackViewStyle: {
    marginLeft: 29 / 2,
    marginRight: 29 / 2,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    flexDirection: 'row',
    paddingVertical:3,
  },

  textInputStyle: {
    height: 40,
    // marginLeft:29/2,
    // marginRight:29/2,
    fontSize:15,
    color: textInputTextColor,
    backgroundColor: '#00000000',
    flex: 1,
    textAlign: 'left',
  },


  buttonTextColor: {
    color: "rgb(120,120,120)",
    fontSize: 13,
    textAlign: "right",
  },

  cbutton: {
    marginLeft: 29 / 2,
    marginRight: 29 / 2,
    //marginTop: 10,
    height: 40,
    justifyContent: 'center',

  },
  mbutton: {
    marginTop: 10,
    marginRight: 15,
    height: 40,
    width: 150,
    alignSelf: 'flex-end',
  },

  creactbutton: {
    borderColor: mainColor,
    borderWidth: pixel,
    marginLeft: 29 / 2,
    marginRight: 29 / 2,
    marginTop: 17,
    height: 40,
    justifyContent: 'center',
    borderRadius: 3,
  },
  top: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  line: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 15,
    backgroundColor: '#ebebeb'
  },
});


const mapStateToProps = (state) => {
  //从login reduce 中获取state的初始值。
  //console.log('state:',state);
  return {
    state: state.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginPress: (state) => {
      dispatch(login(state))
      // dispatch(navigatePush('TabView'));
    },


    accountChange: (text) => {
      dispatch(accountTextChange(text))
    },
    passwordChange: (text) => {
      dispatch(passwordTextChange(text))
    },
    loadAccount: () => {
      dispatch(loadAccountAction())
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView)



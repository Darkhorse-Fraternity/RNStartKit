/**
 * Created by lintong on 9/21/16.
 * @flow
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {
    AppRegistry, Linking,
    Alert,
    TouchableOpacity,
    View,
    Text,
    Image,
    Platform,
    LayoutAnimation,
    BackAndroid,
    ToastAndroid,
    InteractionManager,
    StatusBar,
    StyleSheet,
} from 'react-native';
import type EmitterSubscription from 'EmitterSubscription';
import RCTDeviceEventEmitter  from 'RCTDeviceEventEmitter'
import Route from '../../components/Route'
import {connect} from 'react-redux'
import {navigatePush, navigatePop} from '../../redux/actions/nav'
import {logout,loginSucceed} from '../../redux/actions/login'
import {preConfig} from '../../redux/actions/config'
import { mainColor, backViewColor, lightMainColor, lightContainingColor} from '../../configure';
class Main extends Component {

  constructor(props:Object) {
      super(props);
      //  this.state = {
      //  };
      this.props.preConfig();
  }



    lastBackPressed:number = 0;
    _backAnroid()
    {
        var self = this;
        BackAndroid.addEventListener('hardwareBackPress', ()=> {

            const index = self.props.state.index;
            const routes = self.props.state.routes;
            const key = routes[index].key;
            //idnex 前两个分别是登录和tabview

             if (index>0) {
                self.props.pop();
                 return true;
            }
            let times = Date.now();
            if (times - self.lastBackPressed >= 2500) {
                //再次点击退出应用
                self.lastBackPressed = times;
                ToastAndroid.show("再按一次退出应用", 0);
                return true;
            }
            self.lastBackPressed = 0;
            return false;
        });
    }

    subscriber1:EmitterSubscription;
    subscriber2:EmitterSubscription;
    logoutTimer:number;
    componentDidMount()
  {

      //  this._update();
      this._backAnroid();
      //监听，远程推送。
      // PushNotification.onPush();


      var url = Linking.getInitialURL().then((url) => {
          if (url) {
              alert('Initial url is: ' + url);
          }
      }).catch(err => alert('An error occurred', err));
  }

  componentWillUnmount()
  {
      this.subscriber1 && this.subscriber1.remove();
      this.subscriber2 && this.subscriber2.remove();
      this.timer && clearTimeout(this.timer);
      this.logoutTimer && clearTimeout(this.logoutTimer);
  }

  statubarOpen : bool = false;
  showStatuBar()
  {

      if (Platform.OS !== "ios" && this.statubarOpen == false) {
          this.statubarOpen = true;
          InteractionManager.runAfterInteractions(()=> {
              StatusBar.setHidden(false);
          });
      }
  }

  // shouldComponentUpdate(nextProps:Object, nextState:Object)
  // {
  //     return (this.state !== nextState);
  // }


  render() {
    // if (!this.state.isLogin && this.state.waiting) {
    //   //做伪闪屏
    //   // if (Platform.OS === 'ios') {
    //   return (<View/>);
    //   // }else {
    //   // 	StatusBar.setHidden(true);
    //   // 	return <GuideView/>
    //   // }
    // }
    // //引导页
    // if (!this.state.isLogin && this.state.isFirst) {
    //   //     <IntroView onClick={()=>{
		// 	//  LayoutAnimation.spring();
		// 	// 	this.setState({isFirst:false});
		// 	// 	saveFirstTime();//保存到本地
		// 	// }}/>
		// 	return (<View/>)
    // };

      // this.showStatuBar();//做一个延迟。
      return (
          <Route/>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blur: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
  },
  blurView: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  },
});

const mapStateToProps = (state) => {
    //从login reduce 中获取state的初始值。
    //console.log('state:',state);
    return {
        state: state.route.navigationState,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data)=> {
            dispatch(loginSucceed(data));
            dispatch(navigatePush('TabView', false))
        },
        logOut: ()=> {
            //清除中间route
            // dispatch(navigateClearMiddleScene('Setting'));
            //
            //返回到第一层
            dispatch(logout());
        },
        pop: ()=> {
            dispatch(navigatePop());
        },
        preConfig:()=>{
          dispatch(preConfig());
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)

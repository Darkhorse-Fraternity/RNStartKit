/*!
 *
 * vilewUtil模块 React Native module
 * 主要提供一些自定义的View
 * @flow
 */
import React from 'react';
import ReactNative, {View,Image,ActivityIndicatorIOS,StyleSheet, Platform} from "react-native";
import {pixel,screenWidth} from "./"
import WBButton from "../components/Base/WBButton"
import {mainColor,containingColor,lightMainColor,lightContainingColor} from '../configure'
import * as Animatable from 'react-native-animatable';
// import Icon from 'react-native-vector-icons/Ionicons'


//react-native-router-flux 新版本可以直接传入button
export function renderNavRightButton(title:string,tap:Function, image:any = undefined) {
  function tryRender(props:Object) {
    let disabled = props.scene.route.rightButtonDisabled;
    let isLoad = props.scene.route.rightButtonIsLoad;
    return(
        <WBButton
            ref='nav_right_button'
            onPress={tap}
            isLoad={isLoad}
            style={[{color:'rgb(100,100,100)', flexDirection:'row'},styles.barRightButtonText]}
            styleDisabled={{color:lightContainingColor}}
            containerStyle= {styles.rightButton}
            disabled ={disabled}>
          {image?<Image source={image}/>:null}
          {title}
        </WBButton>
    )
  }

  return tryRender;
}

export function renderNavSenderButton(tap:Function) {
  function tryRender(props:Object) {
    let disabled = props.scene.route.rightButtonDisabled;
    let isLoad = props.scene.route.rightButtonIsLoad;
    return(
        <WBButton
            ref='nav_right_button'
            onPress={tap}
            isLoad={isLoad}
            style={[{color:containingColor, flexDirection:'row'},styles.barRightButtonText]}
            styleDisabled={{color:lightContainingColor}}
            containerStyle= {styles.rightButton}
            disabled ={disabled}>
          发送
        </WBButton>
    )
  }

  return tryRender;
}



export function renderNavAddButton(tap:Function) {
  function tryRender(props:Object) {
    let disabled = props.scene.route.rightButtonDisabled;
    let isLoad = props.scene.route.rightButtonIsLoad;
    return(
        <WBButton
            ref='nav_right_button'
            onPress={tap}
            isLoad={isLoad}
            style={[{color:containingColor, flexDirection:'row'},styles.barRightButtonText]}
            styleDisabled={{color:lightContainingColor}}
            containerStyle= {styles.rightButton}
            disabled ={disabled}>
          添加
        </WBButton>
    )
  }

  return tryRender;
}


export function renderNavImageButton(image:number, position:string, onPress :Function):Function{
  function tryRender(props:Object) {
    let disabled = props.scene.route.rightButtonDisabled;
    let isLoad = props.scene.route.rightButtonIsLoad;
    const style = position == 'left'?styles.leftButton:styles.rightButton
    return(
        <WBButton
            // ref='nav_right_button'
            onPress={onPress}
            isLoad={isLoad}
            style={[{color:containingColor, flexDirection:'row'},]}
            styleDisabled={{color:lightContainingColor}}
            containerStyle= {style}
            disabled ={disabled}>
          <Image  source={image} style={styles.image}/>
        </WBButton>
    )
  }

  return tryRender;
}



const styles = StyleSheet.create({

  rightButton: {
    width: 100,
    height: 37,
    // position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 2 : 5,
    right: 4,
    padding: 8,
    alignItems:'flex-end',
  },
  leftButton: {
    width: 100,
    height: 37,
    marginTop: Platform.OS === 'ios' ? 2 : 5,
    //position: 'absolute',
    left: 4,
    padding: 8,
  },
  barRightButtonText: {
    textAlign: 'right',
    fontSize: 15,
    fontWeight:'normal'
  },

  barLeftButtonText: {
    textAlign: 'left',
    fontSize: 17,
  },

  rightButtonIconStyle: {

  },
  icon: {
    // transform: [{rotate: '315deg'}],
    marginTop:3,
    // alignSelf:'center'
  },
  image:{
    width:20,
    height:20,
    tintColor:'red',
  }
});

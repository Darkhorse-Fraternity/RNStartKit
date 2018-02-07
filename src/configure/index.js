/* @flow */
'use strict'
// import DeviceInfo from 'react-native-device-info'

import {LeanCloud_APP_ID,LeanCloud_APP_SIGN} from './leancloud'
const defaultHost = !__DEV__ ?
    /*release*/   'cmwljtyw.api.lncld.net/1.1' :
    /*debug*/     'q81jdsbi.api.lncld.net/1.1'


let LeanCloud_APP_Session = '';

function setLeanCloudSession(session:string){
  LeanCloud_APP_Session = session;
}



function httpHeaders(needSession:bool):Object{

   let header = {
     "Content-Type": "application/json",
     "X-LC-Sign": LeanCloud_APP_SIGN,
     "X-LC-Id": LeanCloud_APP_ID,
   }

   if(needSession){
      header = Object.assign({},
        header,
      {
        "X-LC-Session":LeanCloud_APP_Session
      })
   }
   return header;
}




//主题色彩
const themeColorConfig = {
    mainColor: '#f1bd49', //主色彩，用于navbar 按钮颜色等、
    backViewColor: 'white',
    lightMainColor: '#c18379', //主色彩，用于navbar 按钮颜色等、
    containingColor: '#ffffff', //内含主色彩
    lightContainingColor: '#d2d6d6', //内含主色彩
    mainBackgroundColor: '#f7f7f7',

    //字体颜色 需自行补充
    deepFontColor: '#000000',
    lightFontColor: '#d5ded3',
    grayFontColor: '#999999',
    blackFontColor: '#333333',

    // 线的颜色
    lineColor: '#dbdbdb',
    textInputTextColor: '#333333',
    placeholderTextColor: '#b7b7b7',
}


//主题字体 这边看是否需要把CSS 样式进行抽取
const themeFontConfig = {}


module.exports = {
    defaultHost,
    httpHeaders,
    ...themeColorConfig,
    setLeanCloudSession,
};

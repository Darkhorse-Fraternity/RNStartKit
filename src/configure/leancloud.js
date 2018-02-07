/**
 * Created by lintong on 9/17/16.
 * @flow
 */
'use strict';
import md5 from "react-native-md5";

const  id_dev = 'q81jdsbi5qp679fi5o46i5nppjgycztgivwj30707xfvehzt'
const  key_dev = 'y6ffzv6mq705pya2pd6kgl1ni1vwlppesis7f1qi19afg5nn'

const  id_pro = 'cmwLjTYWoYfN4jCgPR49rsi6-gzGzoHsz'
const  key_pro = 'S6wxWnhQfL9rBLo2ngEctK0u'


export const LeanCloud_APP_ID = __DEV__?id_pro:id_pro
export const  LeanCloud_APP_KEY = __DEV__?key_pro:key_pro

const timeStamp = Math.round(new Date())
export const LeanCloud_APP_SIGN =  md5.hex_md5( timeStamp + LeanCloud_APP_KEY ) + ',' + timeStamp


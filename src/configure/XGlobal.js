/* @flow */
'use strict';
import {Linking,Alert,AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';
import DefaultPreference from 'react-native-default-preference';

const storage = new Storage({
    // maximum capacity, default 1000
    size: 1000,

    // Use AsyncStorage for RN, or window.localStorage for web.
    // If not set, data would be lost after reload.
    storageBackend: AsyncStorage,

    // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 36 * 1000 * 3600 * 24,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired,
    // the corresponding sync method will be invoked and return
    // the latest data.
    sync : {
        // we'll talk about the details later.
    }
})
global.storage = storage;



//全局可用的参数下载这里。
//

//登录的数据需要做成全局可以用 ES6 单例写法
//http://amanvirk.me/singleton-classes-in-es6/
//
//

let instance = null;
const UserManageSaveInfo = 'UserManageSaveInfo';


//保存到本地
const Save_UserData_Key = 'saveUserData';
const Save_FirstTime_Key = 'saveFirstTime';
const Save_Account_Key = 'saveAccount';
export function saveUserData(data:Object){
   storage.save({
        key: Save_UserData_Key,  //注意:请不要在key中使用_下划线符号!
        data: data,
    });
}

export function saveFirstTime()
{
    storage.save({
        key: Save_FirstTime_Key,  //注意:请不要在key中使用_下划线符号!
        data: false,
    });
}
export function loadFirstJoin(){

  return  storage.load({
        key: Save_FirstTime_Key,
    })
}

export function clearUserData() {

    storage.remove({
        key:Save_UserData_Key
    });
}




export function loadUserData():Promise<Object>{
    // 读取
    // 这边sui
    //

    return  storage.load({
        key: Save_UserData_Key,

        //autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
        autoSync: true,

        //syncInBackground(默认为true)意味着如果数据过期，
        //在调用同步方法的同时先返回已经过期的数据。
        //设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
        //syncInBackground: false
    })
}



//存储登录账号
export function saveAccount(account:string){
    storage.save({
        key: Save_Account_Key,  //注意:请不要在key中使用_下划线符号!
        data: account,
    });
}

//
export  function loadAccount(callBack:Function){
    storage.load({key: Save_Account_Key,}).then(ret =>{
        callBack(ret);
    }).catch(err =>{
        console.log('loadAccount:',err);
    })
}

/**
 * 提示升级
 */

// static alert(title: string, message?: string, button?: Buttons, type?: AlertType)
//  {
//  	'update':1,
//  	'enfoce':0,
//  	content:'',
//  	title:'',
//  	download_url:''
//  }

export function alertUpdate(data:Object) {
    if(data.update){
        Alert.alert(
            data.title||'有新版本了',
            data.content||'我们需要升级~',
            data.enfoce?
                [{text: '点击升级', onPress: () => _goUpDate(data)}]
                :[{text: '取消'},{text: '点击升级', onPress: () => _goUpDate(data)}]
        )
    }
}

function _goUpDate(data:Object){
    if (data.enfoce) {
        alertUpdate(data);
    }
    // if (Platform.OS == 'ios') {
    Linking.openURL(data.download_url);
    // }else{
    //
    // }
};

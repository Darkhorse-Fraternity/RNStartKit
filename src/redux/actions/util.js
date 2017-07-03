/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

/**
 * 工具类，
 */

import {getPictureParams, updateUserInfo} from '../../request/qzapi'
import {req} from './req'
export const LOAD_AVATAR = 'LOAD_AVATAR'
export const UPLOAD_IMAGES = 'UPLOAD_IMAGES'
export const CHANGEAVATAR = 'CHANGEAVATAR'
export const DATA_STORAGE = 'DATA_STORAGE'


function _loadAvatar(statu: string): Object {
    return {
        type: LOAD_AVATAR,
        statu: statu,
    };
}

function _changeAvatar(avatar: Object): Object {
    return {
        type: CHANGEAVATAR,
        avatar: avatar,
    };
}


function _uploadImg(statu: string, key: string) {
    return {
        type: UPLOAD_IMAGES,
        statu,
        key,
    };
}

export function dataStorage(key: string, data: any): Object {
    return {
        type: DATA_STORAGE,
        key,
        data,
    }
}


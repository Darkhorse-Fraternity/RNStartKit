/**
 * Created by lintong on 2016/11/6.
 * @flow
 */
'use strict';

export const SHARE_TO_TIMELINE = 'SHARE_TO_TIMELINE'
export const SHARE_TO_SESSION = 'SHARE_TO_SESSION'
export const SHARE_TO_QQ = 'SHARE_TO_QQ'
export const Share_TO_ZONE = 'Share_TO_ZONE'
export const SHARE_TO_SINA = 'SHARE_TO_SINA'
import * as WeChat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';


WeChat.registerApp('wx5417c31ce54aaef2')
export function shareToWechat(type: string): Function {

    let Method = WeChat.shareToTimeline;
    if (type == SHARE_TO_SESSION) Method = WeChat.shareToSession

    return async(dispatch)=> {
        try {
            let result = await Method({
                type: 'news',
                title: 'web image',
                webpageUrl: 'www.baidu.com',
                description: 'share web image to time line',
                mediaTagName: 'email signature',
                messageAction: undefined,
                messageExt: undefined,
                imageUrl: 'http://www.ncloud.hk/email-signature-262x100.png'
            });
            console.log('share text message to time line successful:', result);
            return dispatch(()=> {
                type, result
            })
        } catch (e) {
            console.error('share text message to time line failed with:', e.message);
        }
    }


}

export function shareToQQ(type:string):Function{
    let Method = QQAPI.shareToQQ;
    if(type == Share_TO_ZONE)  Method = QQAPI.shareToQzone

    return async (dispatch)=> {
        try {
            let result = await Method({
                type: 'news',
                title: '分享标题',
                description: '描述',
                webpageUrl: '网页地址',
                imageUrl: '远程图片地址',
            });
            console.log('share text message to time line successful:', result);
            return dispatch(()=> {
                type, result
            })
        } catch (e) {
            console.error('share text message to time line failed with:', e.message);
        }
    }
}

export  function shareToWeibo() :Function{
    return async    (dispatch)=> {
        try {
            let result = await WeiboAPI.share({
                type: 'news',
                text: '描述',
                imageUrl: '远程图片地址',
            });
            console.log('share text message to time line successful:', result);
            return dispatch(()=> {
                type:SHARE_TO_SINA, result
            })
        } catch (e) {
            console.error('share text message to time line failed with:', e.message);
        }
    }

}
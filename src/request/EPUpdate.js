import { send } from '../request'

//当前测试版本号
const AppTestVersion = 1

const api_token = 'a3f43472f64ddccbc58c2dcf75438f18'

import DeviceInfo from 'react-native-device-info'
import { Platform, Linking, Alert } from 'react-native'
import Toash from 'react-native-simple-toast'
import { push } from '../redux/nav'

function firUpdate(bundleId, api_token, type) {
    return {
        scheme: 'http',
        host: 'api.fir.im/',
        path: 'apps/latest/' + bundleId,
        method: 'GET',
        params: {
            api_token,
            type
        }
    }
}

const checkIos = (str) => str.lastIndexOf('ep') !== -1
//当为android 时 只有大于或等于指定版本进入测试状态
const checkAndroid = () => parseFloat(DeviceInfo.getVersion()) >= AppTestVersion


const checkUpdate = (res, callBack) => {


    //installUrl含有表示返回正确值,

    if (res.installUrl) {
        const version = parseFloat(res.version)
        const versionShort = parseFloat(res.versionShort)
        const appVersion = parseFloat(DeviceInfo.getVersion())
        const buildNumber = parseFloat(DeviceInfo.getBuildNumber())

        console.log('version:', version);
        console.log('versionShort:', versionShort);
        console.log('appVersion:', appVersion);
        console.log('buildNumber:', buildNumber);

        if (versionShort > appVersion || versionShort === appVersion && version > buildNumber) {
            const changelog = `当前版本号:${appVersion},编译号:${buildNumber};
            更新版本号:${versionShort},更新编译号:${version}`

            // console.log('changelog:', changelog)
            Alert.alert(
                '版本更新~',
                res.changelog || changelog,
                [{
                    text: '取消', onPress: () => {
                    },
                }, {
                    text: '确定', onPress: () => {
                        callBack && callBack()
                    },
                }
                ]
            )
        }
    }

}


const goWebView = (uri) => {

    push('WebView', { uri,title:'新版本更新' })


}

//用于企业端自动更新
export const epUpdate = async () => {
    const bundleId = DeviceInfo.getBundleId()
    if (Platform.OS === 'ios' && checkIos(bundleId)) {
        const res = await sendBack(bundleId)
        // console.log('update:', res);
        const callback = () => {
            // try{
            //     const services = 'itms-services://?action=download-manifest&url='
            //     const url = services + res.installUrl
            //     Linking.openURL(url);
            // }catch(e){
            //     Toash.show(e.message)
            // }
            goWebView(res.update_url)
        }
        checkUpdate(res, callback)
    } else if (Platform.OS === 'android' && checkAndroid()) {
        const res = await sendBack(bundleId)
        const callback = () => {
            // Linking.openURL(services);
            goWebView(res.update_url)
        }
        //Android 识别当前测试版本号 来检测更新
        checkUpdate(res, callback)
    }
}

function sendBack(bundleId) {
    const params = firUpdate(bundleId, api_token, Platform.OS)
    return send(params).then(res => res.json())
}
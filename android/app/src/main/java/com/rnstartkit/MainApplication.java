package com.rnstartkit;

import android.app.Application;

import com.aakashns.reactnativedialogs.RNSHPackage;
import com.aakashns.reactnativedialogs.ReactNativeDialogsPackage;
import com.avos.avoscloud.AVOSCloud;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactApplication;
import com.cmcewen.blurview.BlurViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.theweflex.react.WeChatPackage;

import java.util.Arrays;
import java.util.List;

import io.liaoyuan.reactnative.leancloudpush.LeanCloudPushPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new BlurViewPackage(),
                    new WeChatPackage(),
//                    new QQPackage(),
                    new LeanCloudPushPackage(),
                    new ReactNativePushNotificationPackage(),
                    new VectorIconsPackage(),
                    new ImagePickerPackage(),
                    new ReactNativeDialogsPackage(),
                    new RNDeviceInfo(),
                    new RNSHPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        // 初始化参数依次为 this, AppId, AppKey
        AVOSCloud.initialize(this, "q81jdsbi5qp679fi5o46i5nppjgycztgivwj30707xfvehzt",
                "y6ffzv6mq705pya2pd6kgl1ni1vwlppesis7f1qi19afg5nn");
    }
}

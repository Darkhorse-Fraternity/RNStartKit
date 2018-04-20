package com.rnstartkit;

import android.app.Activity;
import android.app.Application;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.aakashns.reactnativedialogs.ReactNativeDialogsPackage;
import com.avos.avoscloud.AVOSCloud;
import com.cmcewen.blurview.BlurViewPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.yamill.orientation.OrientationPackage;
import com.imagepicker.ImagePickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.theweflex.react.WeChatPackage;

import java.util.Arrays;
import java.util.List;

import io.liaoyuan.reactnative.leancloudpush.LeanCloudPushPackage;

public class MainApplication extends Application implements ReactApplication {
    private Intent mIntent;
    public int count = 0;

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

    @Override
    protected String getJSMainModuleName() {
        return "index";
    }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new RNDeviceInfo(),
            new RNDeviceInfo(),
            new OrientationPackage(),
            new BlurViewPackage(),
                    new WeChatPackage(),
//                    new QQPackage(),
                    new LeanCloudPushPackage(),
                    new ReactNativePushNotificationPackage(),
                    new VectorIconsPackage(),
                    new ImagePickerPackage(),
                    new ReactNativeDialogsPackage(),
                    new RNDeviceInfo()
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
        ActivityLifecycleCallbacks()
    }


    private void ActivityLifecycleCallbacks() {
        mIntent = new Intent();
        mIntent.setAction("com.action.isForeground");
        registerActivityLifecycleCallbacks(new Application.ActivityLifecycleCallbacks() {
            @Override
            public void onActivityCreated(Activity activity, Bundle bundle) {
            }

            @Override
            public void onActivityStarted(Activity activity) {
                Log.v("viclee", activity + "onActivityStarted");
                if (count == 0) {
                    Log.e("viclee", ">>>>>>>>>>>>>>>>>>>切到前台  lifecycle");
                    mIntent.putExtra("isForeground", true);
                    mIntent.putExtra("icon", R.mipmap.ic_launcher);
                    sendBroadcast(mIntent);
                }
                count++;
            }

            @Override
            public void onActivityResumed(Activity activity) {
            }

            @Override
            public void onActivityPaused(Activity activity) {
            }

            @Override
            public void onActivityStopped(Activity activity) {
                count--;
                if (count == 0) {
                    Log.e("viclee", ">>>>>>>>>>>>>>>>>>>切到后台  lifecycle");
                    mIntent.putExtra("isForeground", false);
                    sendBroadcast(mIntent);
                }
            }

            @Override
            public void onActivitySaveInstanceState(Activity activity, Bundle bundle) {
            }

            @Override
            public void onActivityDestroyed(Activity activity) {
            }
        });
    }
}

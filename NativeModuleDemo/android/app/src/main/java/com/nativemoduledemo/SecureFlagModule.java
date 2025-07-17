package com.nativemoduledemo;

import android.app.Activity;
import android.view.WindowManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SecureFlagModule extends ReactContextBaseJavaModule {

    public SecureFlagModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SecureFlag";
    }

    @ReactMethod
    public void enableSecure() {
        final Activity activity = getCurrentActivity();
        if (activity != null) {
            activity.runOnUiThread(() -> {
                activity.getWindow().setFlags(
                        WindowManager.LayoutParams.FLAG_SECURE,
                        WindowManager.LayoutParams.FLAG_SECURE);
            });
        }
    }

    @ReactMethod
    public void disableSecure() {
        final Activity activity = getCurrentActivity();
        if (activity != null) {
            activity.runOnUiThread(() -> {
                activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
            });
        }
    }
}

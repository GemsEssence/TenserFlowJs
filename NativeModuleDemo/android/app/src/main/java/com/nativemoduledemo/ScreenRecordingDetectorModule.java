package com.nativemoduledemo;

import android.content.Context;
import android.media.projection.MediaProjectionManager;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class ScreenRecordingDetectorModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private Runnable checkRunnable;
    private boolean lastState = false;

    public ScreenRecordingDetectorModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "ScreenRecordingDetector";
    }

    @ReactMethod
    public void startListener() {
        stopListener();

        checkRunnable = new Runnable() {
            @Override
            public void run() {
                boolean isRecording = isScreenRecording();
                if (isRecording != lastState) {
                    lastState = isRecording;
                    sendEvent(isRecording);
                }
                handler.postDelayed(this, 1000);
            }
        };
        handler.post(checkRunnable);
    }

    @ReactMethod
    public void stopListener() {
        if (checkRunnable != null) {
            handler.removeCallbacks(checkRunnable);
            checkRunnable = null;
        }
    }

    @ReactMethod
    public void isRecording(Callback callback) {
        callback.invoke(isScreenRecording());
    }

    private boolean isScreenRecording() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            try {
                MediaProjectionManager manager = (MediaProjectionManager)
                        reactContext.getSystemService(Context.MEDIA_PROJECTION_SERVICE);
                if (manager == null) return false;

                Object info = manager.getClass()
                        .getMethod("getActiveProjectionInfo")
                        .invoke(manager);

                return info != null;
            } catch (Exception e) {
                Log.e("ScreenRecDetector", "Reflection failed", e);
                return false;
            }
        }
        return false; // Not supported below Android 10
    }

    private void sendEvent(boolean isRecording) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onScreenRecordingChanged", isRecording);
    }
}

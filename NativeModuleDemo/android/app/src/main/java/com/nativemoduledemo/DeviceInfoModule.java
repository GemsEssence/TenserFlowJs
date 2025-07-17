package com.nativemoduledemo;

import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.BatteryManager;
import android.os.Build;
import android.os.Environment;
import android.os.StatFs;
import android.util.DisplayMetrics;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.Arrays;

public class DeviceInfoModule extends ReactContextBaseJavaModule {

    public DeviceInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "DeviceInfoModule";
    }

    @ReactMethod
    public void getDeviceInfo(Promise promise) {
        try {
            WritableMap deviceInfo = new WritableNativeMap();

            // Basic device info
            deviceInfo.putString("brand", Build.BRAND);
            deviceInfo.putString("manufacturer", Build.MANUFACTURER);
            deviceInfo.putString("model", Build.MODEL);
            deviceInfo.putString("device", Build.DEVICE);
            deviceInfo.putString("product", Build.PRODUCT);
            deviceInfo.putString("hardware", Build.HARDWARE);
            deviceInfo.putString("serial", Build.SERIAL); // Requires READ_PHONE_STATE permission
            deviceInfo.putString("id", Build.ID);

            // OS version info
            deviceInfo.putString("osVersion", Build.VERSION.RELEASE);
            deviceInfo.putInt("sdkVersion", Build.VERSION.SDK_INT);
            deviceInfo.putString("incrementalVersion", Build.VERSION.INCREMENTAL);
            deviceInfo.putString("codename", Build.VERSION.CODENAME);
            deviceInfo.putString("securityPatch", Build.VERSION.SECURITY_PATCH);

            // Display metrics
            DisplayMetrics metrics = getReactApplicationContext().getResources().getDisplayMetrics();
            deviceInfo.putInt("screenWidth", metrics.widthPixels);
            deviceInfo.putInt("screenHeight", metrics.heightPixels);
            deviceInfo.putDouble("density", metrics.density);
            deviceInfo.putInt("densityDpi", metrics.densityDpi);

            // CPU info
            deviceInfo.putString("cpuAbi", Build.CPU_ABI);
            deviceInfo.putString("cpuAbi2", Build.CPU_ABI2);
            deviceInfo.putString("supportedAbis", Arrays.toString(Build.SUPPORTED_ABIS));

            // Memory info
            ActivityManager.MemoryInfo memInfo = new ActivityManager.MemoryInfo();
            ActivityManager activityManager = (ActivityManager) getReactApplicationContext()
                    .getSystemService(Context.ACTIVITY_SERVICE);
            if (activityManager != null) {
                activityManager.getMemoryInfo(memInfo);
                deviceInfo.putDouble("totalMemory", memInfo.totalMem);
                deviceInfo.putDouble("availableMemory", memInfo.availMem);
            }

            // Battery info
            Intent batteryIntent = getReactApplicationContext().registerReceiver(null,
                    new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
            if (batteryIntent != null) {
                int level = batteryIntent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
                int scale = batteryIntent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
                if (level != -1 && scale != -1) {
                    float batteryPct = (level / (float)scale) * 100;
                    deviceInfo.putInt("batteryLevel", (int)batteryPct);
                }
                int status = batteryIntent.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
                deviceInfo.putBoolean("isCharging", status == BatteryManager.BATTERY_STATUS_CHARGING ||
                        status == BatteryManager.BATTERY_STATUS_FULL);
            }

            // Network info
            ConnectivityManager cm = (ConnectivityManager) getReactApplicationContext()
                    .getSystemService(Context.CONNECTIVITY_SERVICE);
            if (cm != null) {
                NetworkInfo netInfo = cm.getActiveNetworkInfo();
                deviceInfo.putBoolean("isConnected", netInfo != null && netInfo.isConnected());
                deviceInfo.putString("networkType", netInfo != null ? netInfo.getTypeName() : "unknown");
            }

            // Storage info
            StatFs statFs = new StatFs(Environment.getDataDirectory().getPath());
            deviceInfo.putDouble("totalStorage", (double) statFs.getBlockCount() * statFs.getBlockSize());
            deviceInfo.putDouble("availableStorage", (double) statFs.getAvailableBlocks() * statFs.getBlockSize());

            promise.resolve(deviceInfo);
        } catch (Exception e) {
            promise.reject("DEVICE_INFO_ERROR", e.getMessage());
        }
    }
}
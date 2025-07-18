
package com.nativemoduledemo;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CustomPackage implements ReactPackage {
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new DeviceInfoModule(reactContext));
        modules.add(new CustomMathModule(reactContext));
        modules.add(new WhatsAppModule(reactContext));
        modules.add(new ScreenRecordingDetectorModule(reactContext));
        modules.add(new SecureFlagModule(reactContext));

        return modules;
    }
}
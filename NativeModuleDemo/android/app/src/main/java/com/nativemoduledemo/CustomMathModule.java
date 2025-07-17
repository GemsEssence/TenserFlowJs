package com.nativemoduledemo;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class CustomMathModule extends ReactContextBaseJavaModule {
  public CustomMathModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "CustomMath";
  }

  @ReactMethod
  public void multiply(int a, int b, Promise promise) {
    promise.resolve(a * b);
  }
}

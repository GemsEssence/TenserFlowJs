package com.nativemoduledemo;

import android.content.Intent;
import android.net.Uri;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class WhatsAppModule extends ReactContextBaseJavaModule {
    private static final String WHATSAPP_PACKAGE = "com.whatsapp";
    private static final String WHATSAPP_BUSINESS_PACKAGE = "com.whatsapp.w4b";

    public WhatsAppModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "WhatsAppModule";
    }

    @ReactMethod
    public void sendMessage(String phoneNumber, String message) {
        try {
            String url = "https://wa.me/" + phoneNumber + "?text=" + Uri.encode(message);
            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.setData(Uri.parse(url));
            intent.setPackage(WHATSAPP_PACKAGE);
            
            // Fallback to WhatsApp Business if regular WhatsApp not installed
            if (intent.resolveActivity(getReactApplicationContext().getPackageManager()) == null) {
                intent.setPackage(WHATSAPP_BUSINESS_PACKAGE);
            }
            
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getReactApplicationContext().startActivity(intent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
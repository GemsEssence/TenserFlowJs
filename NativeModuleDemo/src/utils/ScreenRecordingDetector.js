import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

// const ScreenRecordingDetector = Platform.select({
//   ios: () => NativeModules.RCTScreenRecordingDetector,
//   android: () => NativeModules.ScreenRecordingDetector,
// })();

const ScreenRecordingDetector = NativeModules.ScreenRecordingDetector

const eventEmitter = new NativeEventEmitter(ScreenRecordingDetector);

export default {
    startListener: (callback) => {
        ScreenRecordingDetector.startListener();
        const subscription = eventEmitter.addListener(
            'onScreenRecordingChanged',
            (isRecording) => callback(isRecording)
        );
        console.log('subscription->>', subscription)
        return subscription;
    },

    stopListener: () => {
        ScreenRecordingDetector.stopListener();
    },

    isRecording: async () => {
        console.log('isRecording isRecording')
        return new Promise((resolve) => {
            if (Platform.OS === 'android') {
                ScreenRecordingDetector.isRecording((isRecording) => {
                    console.log('11188//////-->>', isRecording)
                    resolve(isRecording)
                });
            } else {
                ScreenRecordingDetector.isRecording((result) => resolve(result[0]));
            }
        });
    }
};
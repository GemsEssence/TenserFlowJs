import { useEffect } from 'react';
import {
  Alert,
  Button,
  NativeModules,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import ScreenRecordingDetector from './src/utils/ScreenRecordingDetector';
const { CustomMath, DeviceInfoModule, WhatsAppModule, SecureFlag } = NativeModules;



const App = () => {

  // useEffect(() => {
  //   // Check initial state
  //   ScreenRecordingDetector.isRecording().then(val => {
  //     console.log('recording--1111>>', val)
  //   });

  //   // Listen for changes
  //   const subscription = ScreenRecordingDetector.startListener(val => {
  //     console.log('recording--222>>', val)
  //   });

  //   return () => {
  //     subscription.remove();
  //     ScreenRecordingDetector.stopListener();
  //   };
  // }, []);

  const handleMultiply = async () => {
    const result = await CustomMath.multiply(5, 3);
    console.log('result-->>', result);
    Alert.alert('Result', `3 x 5 = ${result}`);
  };

  const getDeviceInfo = async () => {
    console.log('--------');
    try {
      const info = await DeviceInfoModule.getDeviceInfo();
      console.log('info--->>>>', info);
    } catch (error) {
      console.log('--error>>>>', error);
    }
  };

  const sendWhatAppMesssage = () => {
    try {
      const cleanedNumber = '8818971925'.replace(/\D/g, '');
      console.log('cleanedNumber--->>', cleanedNumber);

      WhatsAppModule.sendMessage(cleanedNumber, 'hello');
    } catch (error) {
      console.log('sendWhatAppMesssage error -->>', error);
    }
  };

  const disableRecording = async () => {
    console.log('--disableRecording--')
    try {
      await SecureFlag.enableSecure();

    } catch (error) {
      console.log('error disableRecording-->>>')
    }
  }
  const enableRecording = async () => {
    console.log('--enableRecording--')
    try {
      await SecureFlag.disableSecure();
    } catch (error) {
      console.log('error enableRecording-->>>')
    }
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Button title="Multiply" onPress={handleMultiply} />
      <Button title="Get Device info" onPress={getDeviceInfo} />
      <Button title="Whatsapp Message" onPress={sendWhatAppMesssage} />
      <Button title="Enable recording" onPress={enableRecording} />
      <Button title="disable recording" onPress={disableRecording} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});

export default App;

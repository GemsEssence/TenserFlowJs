import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TensorFlowDemo from './src/components/TensorFlowDemo';
import StackNavigation from './src/navigation/stack';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <StackNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
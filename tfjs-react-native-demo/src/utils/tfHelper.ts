import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

export const initTF = async () => {
  // Wait for TensorFlow.js to be ready
  await tf.ready();
  console.log('TensorFlow.js is ready!');
  
  // Optional: Warm up the backend (improves initial performance)
  const warmupTensor = tf.tensor1d([1, 2, 3]);
  await warmupTensor.data();
  warmupTensor.dispose();
  
  return tf;
};

export const loadLocalModel = async (modelJsonPath: string, modelWeightsPath: string) => {
  const modelJson = await FileSystem.readAsStringAsync(modelJsonPath);
  const modelWeights = await FileSystem.getInfoAsync(modelWeightsPath);
  
  if (!modelWeights.exists) {
    throw new Error('Model weights file not found');
  }
  
  return tf.loadGraphModel(bundleResourceIO(modelJson, modelWeights.uri));
};

export const loadOnlineModel = async (modelUrl: string) => {
  return tf.loadGraphModel(modelUrl);
};

export const imageToTensor = async (uri: string) => {
  // Read the image as base64
  const imgB64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  
  const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
  const raw = new Uint8Array(imgBuffer);
  
  // Decode the image
  const imageTensor = tf.node.decodeImage(raw);
  
  // Normalize and resize if needed
  const normalizedTensor = imageTensor.toFloat().div(tf.scalar(255));
  imageTensor.dispose();
  
  return normalizedTensor;
};
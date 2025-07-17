import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Camera } from "expo-camera";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";

const ObjectDetection = () => {
  const [tfReady, setTfReady] = useState(false);
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [predictions, setPredictions] = useState<string[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      try {
        await tf.ready();
        setTfReady(true);
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        console.log("Coco SSD model loaded");
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("TensorFlow initialization error:", err);
      }
    };

    initialize();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied to access media library.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setPredictions([]); // clear previous predictions
    }
  };

  const takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setPredictions([]);
    }
  };

  const imageToTensor = async (uri: string): Promise<tf.Tensor3D> => {
    const imgB64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
    const raw = new Uint8Array(imgBuffer);
    const imageTensor = decodeJpeg(raw);
    return imageTensor;
  };

  const classifyImage = async () => {
    if (!model || !imageUri) return;
    setLoading(true);
    try {
      const imageTensor = await imageToTensor(imageUri);
      const results = await model.detect(imageTensor);
      setPredictions(
        results.map((r) => `${r.class} (${Math.round(r.score * 100)}%)`)
      );
      imageTensor.dispose();
    } catch (err) {
      console.error("Detection error:", err);
      alert("Detection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>TensorFlow.js - Object Detection</Text>
      <Text>TensorFlow Ready: {tfReady ? "✅" : "⏳"}</Text>
      <Text>Model Loaded: {model ? "✅" : "❌"}</Text>

      <View style={styles.buttonGroup}>
        <Button title="Pick Image" onPress={pickImage} disabled={loading} />
        <Button title="Take Photo" onPress={takePhoto} disabled={loading} />
      </View>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <Button
        title="Detect Objects"
        onPress={classifyImage}
        disabled={!model || !imageUri || loading}
      />

      {loading && <ActivityIndicator size="large" style={styles.loader} />}

      {predictions.length > 0 && (
        <View style={styles.predictions}>
          <Text style={styles.predictionsTitle}>Detections:</Text>
          {predictions.map((p, i) => (
            <Text key={i} style={styles.predictionText}>
              {p}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  loader: {
    marginVertical: 20,
  },
  predictions: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    width: "100%",
  },
  predictionsTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 16,
  },
  predictionText: {
    marginVertical: 2,
    fontSize: 14,
  },
});

export default ObjectDetection;

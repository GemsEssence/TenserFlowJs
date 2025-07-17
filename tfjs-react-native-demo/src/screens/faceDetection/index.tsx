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
import * as blazeface from "@tensorflow-models/blazeface";
import Svg, { Rect } from "react-native-svg";
import { Dimensions } from "react-native";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";

const screenWidth = Dimensions.get("window").width;

const FaceDetectionDemo = () => {
  const [tfReady, setTfReady] = useState(false);
  const [model, setModel] = useState<blazeface.BlazeFaceModel | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [faces, setFaces] = useState<any[]>([]);
  const [imageDims, setImageDims] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    setLoading(true);
    const init = async () => {
      try {
        await tf.ready();
        setTfReady(true); // Set tfReady to true here
        const loadedModel = await blazeface.load();
        setModel(loadedModel);
        console.log("BlazeFace model loaded");
        setLoading(false);
      } catch (error) {
        console.log("ready--init>>>", error);
        setLoading(false);
      }
    };
    init();
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
      const uri = result.assets[0].uri;
      setImageUri(uri);
      setFaces([]); // Clear previous detections
      Image.getSize(uri, (width, height) => {
        setImageDims({ width, height });
      });
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
      const uri = result.assets[0].uri;
      setImageUri(uri);
      setFaces([]); // Clear previous detections
      Image.getSize(uri, (width, height) => {
        setImageDims({ width, height });
      });
    }
  };

  const imageToTensor = async (uri: string): Promise<tf.Tensor3D> => {
    try {
      // Read the image file as base64
      const imgB64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convert to Uint8Array
      const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
      const raw = new Uint8Array(imgBuffer);

      // Decode the JPEG image
      const imageTensor = decodeJpeg(raw);
      return imageTensor;
    } catch (error) {
      console.error("Error converting image to tensor:", error);
      alert(
        `ERROR: Could not process image. Please try another image.\n\nDetails: ${error?.message}`
      );
      throw error;
    }
  };

  const detectFaces = async () => {
    setLoading(true);
    try {
      if (!model || !imageUri || !imageDims) return;

      const imageTensor = await imageToTensor(imageUri);
      const predictions = await model.estimateFaces(imageTensor, false);

      console.log("Detected faces:", predictions);
      setFaces(predictions);
      imageTensor.dispose();
    } catch (error) {
      console.log("detectFaces error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderBoxes = () => {
    if (!faces || !faces.length || !imageDims) return null;

    const displayWidth = screenWidth;
    const displayHeight = (imageDims.height * screenWidth) / imageDims.width;

    return (
      <Svg
        style={{
          position: "absolute",
          width: displayWidth,
          height: displayHeight,
        }}
      >
        {faces.map((face, i) => {
          // Ensure coordinates are within image bounds
          const x1 = Math.max(
            0,
            (face.topLeft[0] / imageDims.width) * displayWidth
          );
          const y1 = Math.max(
            0,
            (face.topLeft[1] / imageDims.height) * displayHeight
          );
          const x2 = Math.min(
            displayWidth,
            (face.bottomRight[0] / imageDims.width) * displayWidth
          );
          const y2 = Math.min(
            displayHeight,
            (face.bottomRight[1] / imageDims.height) * displayHeight
          );

          const width = x2 - x1;
          const height = y2 - y1;

          return (
            <Rect
              key={`face-${i}`}
              x={x1}
              y={y1}
              width={width}
              height={height}
              stroke="red"
              strokeWidth="3"
              fill="transparent"
            />
          );
        })}
      </Svg>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>TensorFlow.js - Face Detection</Text>
      <Text>TensorFlow Ready: {tfReady ? "✅" : "⏳"}</Text>
      <Text>Model Loaded: {model ? "✅" : "❌"}</Text>

      <View style={styles.buttonGroup}>
        <Button title="Pick Image" onPress={pickImage} disabled={loading} />
        <Button title="Take Photo" onPress={takePhoto} disabled={loading} />
      </View>

      {imageUri && (
        <View style={{ position: "relative", marginVertical: 20 }}>
          <Image
            source={{ uri: imageUri }}
            style={{
              width: screenWidth,
              height: imageDims
                ? (imageDims.height * screenWidth) / imageDims.width
                : screenWidth,
            }}
            resizeMode="contain"
            onLoad={() => console.log("Image loaded")}
          />
          {renderBoxes()}
        </View>
      )}

      <Button
        title="Detect Faces"
        onPress={detectFaces}
        disabled={!model || !imageUri || loading}
      />

      {loading && <ActivityIndicator size="large" style={styles.loader} />}

      {faces.length > 0 && (
        <View style={styles.predictions}>
          <Text style={styles.predictionsTitle}>Detections:</Text>
          <Text>Faces detected: {faces.length}</Text>
          {faces.map((face, i) => (
            <Text key={i} style={styles.predictionText}>
              Face {i + 1}: Confidence {face.probability[0].toFixed(4)}
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
    paddingVertical: 50,
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

export default FaceDetectionDemo;

// ImageSegmenter.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  PixelRatio,
} from "react-native";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import * as bodyPix from "@tensorflow-models/body-pix";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";

const ImageSegmenter = () => {
  const [model, setModel] = useState<bodyPix.BodyPix | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [segmentationResult, setSegmentationResult] =
    useState<bodyPix.SemanticPersonSegmentation | null>(null);
  const [loading, setLoading] = useState({
    tfReady: true,
    modelLoading: true,
    processing: false,
  });

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const loadedModel = await bodyPix.load({
          architecture: "MobileNetV1",
          outputStride: 16,
          multiplier: 0.75,
          quantBytes: 2,
        });
        setModel(loadedModel);
      } catch (err) {
        console.error("TensorFlow or model load error:", err);
      } finally {
        setLoading({ tfReady: false, modelLoading: false, processing: false });
      }
    };

    loadModel();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setSegmentationResult(null);
    }
  };

  const segmentImage = async () => {
    if (!model || !imageUri) return;

    setLoading((prev) => ({ ...prev, processing: true }));

    try {
      const imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const imageBuffer = tf.util.encodeString(imageBase64, "base64").buffer;
      const imageArray = new Uint8Array(imageBuffer);
      const imageTensor = decodeJpeg(imageArray);

      const segmentation = await model.segmentPerson(imageTensor);

      console.log(
        "Mask dimensions:",
        segmentation.width,
        "x",
        segmentation.height
      );
      console.log(
        "Person pixel count:",
        segmentation.data.filter((p) => p === 1).length
      );
      setSegmentationResult(segmentation);

      imageTensor.dispose();
    } catch (err) {
      console.error("Segmentation error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, processing: false }));
    }
  };

  const renderMaskInfo = () => {
    if (!segmentationResult) return null;

    return (
      <View style={styles.maskInfo}>
        <Text style={styles.label}>Segmentation Results:</Text>
        <Text>Width: {segmentationResult.width}</Text>
        <Text>Height: {segmentationResult.height}</Text>
        <Text>
          Person Pixels: {segmentationResult.data.filter((p) => p === 1).length}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading.tfReady || loading.modelLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>Loading TensorFlow model...</Text>
        </View>
      ) : (
        <>
          <Button title="Pick an Image" onPress={pickImage} />
          {imageUri && (
            <>
              <Image source={{ uri: imageUri }} style={styles.image} />
              <Button
                title="Segment Image"
                onPress={segmentImage}
                disabled={loading.processing}
              />
            </>
          )}
          {loading.processing && (
            <View style={styles.center}>
              <ActivityIndicator size="large" />
              <Text>Processing image...</Text>
            </View>
          )}
          {segmentationResult && renderMaskInfo()}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  center: {
    marginVertical: 30,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
    resizeMode: "contain",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  maskInfo: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default ImageSegmenter;

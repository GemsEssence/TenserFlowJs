import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const FirstScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate("ObjectDetection")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Object Detection</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("FaceDetectionDemo")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Face Detection Demo</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("SentimentAnalyzer")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sentiment Analyzer</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("ImageSegmenter")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Image Segmentation</Text>
      </Pressable>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "tan",
    marginVertical: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
  },
});

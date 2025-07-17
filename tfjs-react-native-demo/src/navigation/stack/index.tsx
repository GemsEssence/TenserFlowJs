import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import ObjectDetection from "../../screens/objectDetection";
import FirstScreen from "../../screens/firstScreen";
import FaceDetectionDemo from "../../screens/faceDetection";
// import TextClassifier from "../../screens/textClassifier";
import SentimentAnalyzer from "../../screens/textClassifier";
import ImageSegmenter from "../../screens/imageSegmentation";

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen">
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="ObjectDetection" component={ObjectDetection} />
        <Stack.Screen name="FaceDetectionDemo" component={FaceDetectionDemo} />
        <Stack.Screen name="SentimentAnalyzer" component={SentimentAnalyzer} />
        <Stack.Screen name="ImageSegmenter" component={ImageSegmenter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

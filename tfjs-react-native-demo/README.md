# tfjs-react-native-demo

A **React Native Expo** demo app showcasing multiple machine learning use-cases using **TensorFlow.js** and pre-trained models. This app demonstrates real-time and static inference on images and text with several ML models implemented directly on the device.

## 🚀 Features

| Module              | Model Used                         | Description |
|---------------------|-------------------------------------|-------------|
| **Face Detection**  | `@tensorflow-models/blazeface`      | Detects faces in static images or      photos taken from the camera. |
| **Object Detection**| `@tensorflow-models/coco-ssd`       | Identifies and labels multiple objects in images. |
| **Image Segmentation** | `@tensorflow-models/body-pix`   | Performs person segmentation on selected images. |
| **Text Classification** | `@tensorflow-models/universal-sentence-encoder` | Encodes text and uses a simple classifier to determine sentiment. |

## 📦 Tech Stack

- React Native (Expo SDK 53)
- TensorFlow.js & tfjs-react-native
- Universal Sentence Encoder
- COCO-SSD / BlazeFace / BodyPix
- Expo modules: Camera, Image Picker, File System, GL
- React Navigation
- TypeScript

## 🧠 TensorFlow Models Used

- [BlazeFace](https://github.com/tensorflow/tfjs-models/tree/master/blazeface)
- [COCO-SSD](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd)
- [BodyPix](https://github.com/tensorflow/tfjs-models/tree/master/body-pix)
- [Universal Sentence Encoder](https://github.com/tensorflow/tfjs-models/tree/master/universal-sentence-encoder)

## 📷 Screenshots

> Add some screenshots or GIFs here if needed

## 🛠 Installation

1. **Clone the repo**

bash
git clone https://github.com/your-username/tfjs-react-native-demo.git
cd tfjs-react-native-demo


Install dependencies

npm install
# or
yarn


Start the Expo server

npx expo start

Scan the QR code with the Expo Go app on your mobile device.



📌 Permissions
Required permissions declared in app.json and requested via Expo modules:

Camera Access (expo-camera)
Enables users to capture photos for face detection or object recognition.

Media Library Access (expo-media-library)
Allows the app to pick images from the device's photo gallery for inference.

File System Access (expo-file-system)
Used to read model files, cache assets, and potentially save processed outputs (e.g., segmented images or inference results).

GLView Support (expo-gl, expo-gl-cpp)
Enables TensorFlow.js to use GPU acceleration for efficient model inference via the WebGL backend.

🧪 How it Works
Your app processes images and text on-device using TensorFlow.js with GPU-accelerated WebGL. Here's a breakdown of how it works:

1. Model Initialization
Uses tfjs-react-native to load and initialize TensorFlow.js.

Automatically registers and sets @tensorflow/tfjs-backend-webgl as the backend for GPU acceleration.

Loads models either:

From local file paths using bundleResourceIO

From URLs if hosted publicly

2. Image Processing Pipelines
Face Detection (BlazeFace)

Loads a pre-trained face detector from @tensorflow-models/blazeface.

Takes an image (captured or selected), decodes it into a tensor (decodeJpeg).

Runs model.estimateFaces() to detect faces.

Renders boxes and keypoints on the image using react-native-svg.

Object Detection (COCO-SSD)

Loads @tensorflow-models/coco-ssd.

Converts selected image to tensor and runs model.detect().

Displays labels and bounding boxes for detected objects.

Image Segmentation (BodyPix)

Loads the @tensorflow-models/body-pix model.

Performs person segmentation on the selected image.

Applies transparency and overlays mask using Canvas or OpenGL.

3. Text Classification
Uses @tensorflow-models/universal-sentence-encoder to extract embeddings from a sentence.

Passes the 512-d vector to a simple classifier model (likely implemented manually using tf.layers).

Outputs category (e.g., sentiment like positive, negative, neutral).

4. Rendering
Results are visualized using:

react-native-svg for bounding boxes and overlays.

GL/Canvas where applicable for pixel masks (segmentation).

React Native UI for label/text output.

🧱 Future Improvements
✅ Real-time Camera Stream Processing
Implement continuous frame capture using expo-camera for live face or object detection.

⏳ Improve Text Classifier
Enhance the basic classifier using real, labeled text data. Explore multi-class or multi-label scenarios (e.g., spam, intent detection).

⏳ Batch Inference & Analysis
Allow users to select multiple images and run inference on all (e.g., process gallery images in sequence).

⏳ Export and Share Results
Save segmented or annotated images and share them via system share sheet or email.

⏳ Pose Estimation or Multi-person Detection
Extend BodyPix or integrate MoveNet to detect body parts and keypoints for multiple users.

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
Required permissions (declared in app.json):

Camera access

Media library access

File system access (read/write)

🧪 How it Works
Loads the TensorFlow model on device using tfjs-react-native

Converts images to tensors using decodeJpeg from @tensorflow/tfjs-react-native

For text classification, uses Universal Sentence Encoder to get 512-d embeddings and feeds it to a basic dense classifier

Detection and segmentation results are visualized using react-native-svg

🧱 Future Improvements
Add real-time camera stream processing

Train and load custom .tflite models

Improve sentiment classification with real training data

Export results or share images with masks

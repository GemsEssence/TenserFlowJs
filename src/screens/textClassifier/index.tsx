import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import '@tensorflow/tfjs-react-native';

const SentimentAnalyzer = () => {
  const [model, setModel] = useState<use.UniversalSentenceEncoder | null>(null);
  const [classifier, setClassifier] = useState<tf.LayersModel | null>(null);
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState<number | null>(null);
  const [loading, setLoading] = useState({
    tfReady: false,
    modelLoading: false,
    classifierLoading: false,
    analyzing: false
  });

  useEffect(() => {
    console.log('Initializing TensorFlow...');
    const loadModels = async () => {
      try {
        setLoading(prev => ({...prev, tfReady: true}));
        await tf.ready();
        
        setLoading(prev => ({...prev, modelLoading: true}));
        const encoder = await use.load();
        setModel(encoder);
        
        setLoading(prev => ({...prev, classifierLoading: true}));
        const classifierModel = tf.sequential();
        classifierModel.add(tf.layers.dense({
          units: 32,
          activation: 'relu',
          inputShape: [512]
        }));
        classifierModel.add(tf.layers.dense({
          units: 1,
          activation: 'sigmoid'
        }));
        classifierModel.predict(tf.zeros([1, 512]));
        setClassifier(classifierModel);
        
      } catch (err) {
        Alert.alert('Error', 'Failed to load models');
      } finally {
        setLoading({
          tfReady: false,
          modelLoading: false,
          classifierLoading: false,
          analyzing: false
        });
      }
    };

    loadModels();
  }, []);

  const analyzeSentiment = async () => {
    if (!model || !classifier || !text.trim()) return;
    
    setLoading(prev => ({...prev, analyzing: true}));
    try {
      const embeddings = await model.embed([text]);
      const prediction = classifier.predict(embeddings) as tf.Tensor;
      const score = (await prediction.data())[0];
      console.log('score--Sentiment>>>',score)
      setSentiment(score);
      embeddings.dispose();
      prediction.dispose();
    } catch (err) {
      Alert.alert('Error', 'Analysis failed');
    } finally {
      setLoading(prev => ({...prev, analyzing: false}));
    }
  };

  return (
    <View style={styles.container}>
      {/* Loading indicators for each stage */}
      {loading.tfReady && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Initializing TensorFlow...</Text>
        </View>
      )}

      {loading.modelLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading Text Model...</Text>
        </View>
      )}

      {loading.classifierLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Setting Up Classifier...</Text>
        </View>
      )}

      {!loading.tfReady && !loading.modelLoading && !loading.classifierLoading && (
        <>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Type your text here..."
            value={text}
            onChangeText={setText}
          />
          
          <View style={styles.buttonContainer}>
            <Button
              title="Analyze Sentiment"
              onPress={analyzeSentiment}
              disabled={loading.analyzing}
            />
          </View>

          {loading.analyzing && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.loadingText}>Analyzing Text...</Text>
            </View>
          )}

          {sentiment !== null && (
            <View style={[
              styles.resultContainer,
              { backgroundColor: sentiment > 0.5 ? '#e6f7ee' : '#ffebee' }
            ]}>
              <Text style={styles.resultText}>
                Sentiment: <Text style={{ fontWeight: 'bold' }}>
                  {sentiment > 0.5 ? 'Positive' : 'Negative'}
                </Text>
              </Text>
              <Text style={styles.confidenceText}>
                Confidence: {(sentiment * 100).toFixed(1)}%
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 150,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  resultContainer: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 8,
  },
  confidenceText: {
    fontSize: 16,
    color: '#666',
  },
});

export default SentimentAnalyzer;
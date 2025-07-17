
import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import Counter from '../components/Counter';

const FirstScreen = ({ navigation }) => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
        <Text>FirstScreen</Text>
      <Counter count={count} setCount={setCount} />
      <Button
        title="Go to Second"
        accessibilityLabel="go-to-second"
        onPress={() => navigation.navigate('Second', { count })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default FirstScreen;

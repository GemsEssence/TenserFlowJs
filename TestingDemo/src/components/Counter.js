import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Counter = ({ count, setCount }) => {
  return (
    <View
      style={styles.container}
      testID="counter-container"
      accessibilityLabel="counter-container"
    >
      <Text
        style={{ fontSize: 20 }}
        testID="counter-text"
        accessibilityLabel="counter-text"
      >
        Count: {count}
      </Text>

      <Button
        title="Increment"
        onPress={() => setCount(count + 1)}
        testID="increment-button"
        accessibilityLabel="increment-button"
      />

      <Button
        title="Decrement"
        onPress={() => setCount(count - 1)}
        testID="decrement-button"
        accessibilityLabel="decrement-button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Counter;











// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const Counter = () => {
//   const [count, setCount] = useState(0);

//   return (
//     <View
//       style={styles.container}
//       testID="counter-container"
//       accessibilityLabel="counter-container"
//     >
//       <Text style={{
//         fontSize: 20
//       }} testID="counter-text" accessibilityLabel="counter-text">
//         Count: {count}
//       </Text>

//       <Button
//         title="Increment"
//         onPress={() => setCount(count + 1)}
//         testID="increment-button"
//         accessibilityLabel="increment-button"
//       />

//       <Button
//         title="Decrement"
//         onPress={() => setCount(count - 1)}
//         testID="decrement-button"
//         accessibilityLabel="decrement-button"

//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Counter;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstScreen from './src/screens/FirstScreen';
import SecondScreen from './src/screens/SecondScreen';
import ThirdScreen from './src/screens/ThirdScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="First">
        <Stack.Screen name="First" component={FirstScreen} />
        <Stack.Screen name="Second" component={SecondScreen} />
        <Stack.Screen name="Third" component={ThirdScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;












// import React, { useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';
// import Counter from './src/components/Counter';
// import { add, multiply, subtract } from './src/utils/math';


// const App = () => {
//   useEffect(() => {
//     const addition = add(10, 20)
//     const subtraction = subtract(10, 20)
//     const multi = multiply(10, 20)
//     console.log('useEffect-->>>', addition, subtraction, multi)
//   }, [])

//   return (
//     <View style={styles.container} testID="app-root" accessibilityLabel="app-root">
//       <Counter />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

// export default App;
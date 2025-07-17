import React from 'react';
import { View, FlatList, Button, Text } from 'react-native';

const items = Array.from({ length: 100 }, (_, i) => ({ id: i, name: `Item ${i}` }));

const SecondScreen = ({ route, navigation }) => {
    const { count } = route.params;

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Text accessibilityLabel="second-count">Received Count: {count}</Text>
            <View
                style={{
                    flex: 1,
                }}
            >
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Text>{item.name}</Text>}
                    accessibilityLabel="flatlist"
                />
           
            
            <Button title="Go to Third" accessibilityLabel="go-to-third" onPress={() => navigation.navigate('Third')} />
                 </View>
        </View>
    );
};

export default SecondScreen;

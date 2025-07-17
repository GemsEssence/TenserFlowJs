import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const ThirdScreen = ({ navigation }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts/1') // Example API
            .then(response => {
                console.log('-response.data->>', response.data)
                setData(response.data)
            })
            .catch(err => console.error('API Error:', err));
    }, []);

    return (
        <View>
            <Text accessibilityLabel="third-title">This is the Third Screen</Text>

            {data && (
                <Text accessibilityLabel="api-title">
                    {data.title}
                </Text>
            )}

            <Button
                title="Go Back"
                accessibilityLabel="go-back"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
};

export default ThirdScreen;

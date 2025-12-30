import React, { useState, useEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId !== null) {
                    console.log("User ID recuperado:", storedUserId);
                    setUserId(storedUserId);
                } else {
                    console.log("Nenhum User ID encontrado.");
                }
            } catch (error) {
                console.error("Erro ao recuperar User ID:", error.message);
            }
        };

        fetchUserId();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {Platform.OS === 'web' ? (
                <View>
                    <Text>Mapa não disponível na versão Web</Text>
                    <Text>{userId ? `User ID: ${userId}` : 'Nenhum User ID encontrado'}</Text>
                </View>
            ) : (
                <Text>Mapa mobile</Text>
            )}
        </View>
    );
};

export default App;

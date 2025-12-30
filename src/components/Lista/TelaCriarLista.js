
import React, { useState, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function TelaCriarLista({ navigation }) {
    const [nome, setNome] = useState("");
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState(null);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId !== null) {
                    console.log("User ID recuperado:", storedUserId);
                    setUserId(parseInt(storedUserId, 10));
                } else {
                    console.log("Nenhum User ID encontrado.");
                }
            } catch (error) {
                console.error("Erro ao recuperar User ID:", error.message);
            }
        };

        fetchUserId();
    }, []);

    const salvarLista = async () => {
        try {
            const resposta = await axios.post('http://localhost:3000/criarLista', {
                nome: nome,
                data: date.toISOString().split('T')[0],
                id: userId,
            });

            if (resposta.status === 200) {
                alert('Lista criada com sucesso!');
                navigation.navigate("MinhasListas");
            } else {
                alert('Erro ao criar a lista!');
            }
        } catch (error) {
            console.error('Erro ao salvar lista:', error);
            alert('Erro ao salvar a lista. Tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.voltar}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Criar nova Lista</Text>
            </View>
            <Text style={styles.label}>Nome da Lista</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome da Lista"
                value={nome}
                onChangeText={setNome}
            />
            <Text>Data selecionada: {date.toLocaleDateString()}</Text>
            <Button onPress={() => setShow(true)} title="Escolher data" />
            <TouchableOpacity onPress={salvarLista} style={styles.button}>
                <Text style={styles.buttonText}>Criar Lista</Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFBE8",
        padding: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#929CFA",
        borderRadius: 10,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#f5af7a",
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        width: "40%",
        height: 120,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: "#4CAF50",
    },
    buttonText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
});

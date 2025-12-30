import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const ListaProgramada = ({ navigation }) => {
    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLista = async () => {
        try {
            const response = await axios.get("http://localhost:3000/ListaProgramada");
            const resposta = response.data;
            setLista(resposta);
            console.log(resposta);
        } catch (error) {
            console.error("Erro ao buscar listas:", error);
            Alert.alert("Erro", "Não foi possível carregar as listas.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLista();
    }, []);
    const guardaLista = async (listaNome) => {
        try {
            //console.log(listaNome);
            const response = await axios.get("http://localhost:3000/pegarLista", {
                params: {
                    listaNome: listaNome,
                },
            });
            const resposta = response.data;
            setLista(resposta);
            //console.log(resposta);
        } catch (error) {
            console.error("Erro ao buscar listas:", error);
            Alert.alert("Erro", "Não foi possível carregar as listas.");
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.listaItem}>
            <TouchableOpacity onPress={() => [guardaLista(item.TB_LISTA_NOME), navigation.navigate("FinalizarLista")]}>
                <Text style={styles.listaNome}>{item.TB_LISTA_NOME}</Text>
                <Text style={styles.listaData}>
                    Data: {new Date(item.TB_LISTA_DATA).toLocaleDateString()}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.voltar}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Todas as listas Programadas</Text>
                <View style={styles.emptySpace} />
            </View>

            <View style={styles.content}>
                {loading ? (
                    <Text>Carregando...</Text>
                ) : lista.length === 0 ? (
                    <>
                        <Text style={styles.text}>Nenhuma lista Programada</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonCriarLista]}
                            onPress={() => navigation.navigate("CriarLista")}
                        >
                            <Image
                                source={require("../img/criarlista.png")}
                                style={styles.image}
                            />
                            <Text style={styles.buttonText}>Criar lista</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <FlatList
                            data={lista}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.TB_LISTA_NOME}
                        />
                        <TouchableOpacity
                            style={[styles.button, styles.buttonCriarLista]}
                            onPress={() => navigation.navigate("CriarLista")}
                        >
                            <Image
                                source={require("../img/criarlista.png")}
                                style={styles.image}
                            />
                            <Text style={styles.buttonText}>Criar lista</Text>
                        </TouchableOpacity>
                    </>

                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF7CF",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#929CFA",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    emptySpace: {
        width: 24,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#000",
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 40,
        backgroundColor: "#FFF7CF",
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 18,
    },
    listaItem: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#E8E8E8",
        borderRadius: 10,
        width: "90%",
    },
    listaNome: {
        fontSize: 16,
        fontWeight: "bold",
    },
    listaData: {
        fontSize: 14,
        color: "#555",
        marginTop: 5,
    },
});

export default ListaProgramada;

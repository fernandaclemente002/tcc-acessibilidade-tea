
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const FinalizarLista = ({ navigation }) => {
    const [produtos, setProdutos] = useState();
    const [loading, setLoading] = useState(true);

    const fetchProdutos = async () => {
        try {
            const response = await fetch('http://localhost:3000/ListaProduto');
            const data = await response.json();
            setProdutos(data);
            console.log(data);
        } catch (error) {
            console.error('Erro ao buscar os produtos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);
    const deleteProduto = async (produtoId) => {
        try {
            const response = await fetch(`http://localhost:3000/deletarProduto/${produtoId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProdutos(produtos.filter(produto => produto.TB_PRODUTO_ID !== produtoId));
                fetchProdutos();
            } else {
                alert('Erro ao deletar o produto.');
            }
        } catch (error) {
            console.error('Erro ao deletar o produto:', error);
            alert('Erro ao deletar o produto.');
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Carregando produtos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.voltar}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Todas as listas</Text>
                <View style={styles.emptySpace} />
            </View>

            {/* Lista de Produtos */}
            <FlatList
                data={produtos}
                keyExtractor={(item) => item.TB_PRODUTO_ID.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Image
                            source={{ uri: item.TB_PRODUTO_IMAGEM }}
                            style={styles.productImage}
                        />
                        <View style={styles.productDetails}>
                            <Text style={styles.productName}>{item.TB_PRODUTO_NOME}</Text>
                            <Text style={styles.productPrice}>R$ {item.TB_PRODUTO_PRECO}</Text>
                            <Text>{item.TB_PRODUTO_TIPO}</Text>
                            <Text>{item.TB_PRODUTO_DESC}</Text>
                            <Text>{item.TB_PRODUTO_LOCAL}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteProduto(item.TB_PRODUTO_ID)}
                        ></TouchableOpacity>
                    </View>
                )}
            />

            {/* Adicionar ao Carrinho */}
            <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate("CatPro")}>
                <Text style={styles.addButtonText}>Adicionar novos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Principal")}>
                <Text style={styles.addButtonText}>Concluir</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f3e8",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#929CFA",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
    },
    listContainer: {
        flex: 1, // Permite que a lista ocupe todo o espaço disponível acima do botão
        padding: 16,
    },
    productContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginBottom: 16,
        padding: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 12,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    productPrice: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    quantityButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ddd",
        borderRadius: 4,
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    quantityText: {
        marginHorizontal: 8,
        fontSize: 18,
        color: "#333",
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        bottom: 0,
        position: "absolute", // Botão fixo na parte inferior
        width: "100%", // Ocupa toda a largura
        backgroundColor: "#007bff",
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    Button: {
        alignItems: "center",
        left: 75,
        bottom: 60,
        position: "absolute", // Botão fixo na parte inferior
        width: "100%", // Ocupa toda a largura
        backgroundColor: "#6C6AFF",
        padding: 16,
    },
    deleteButton: {
        backgroundColor: "#ff4d4d",
        padding: 8,
        borderRadius: 4,
        marginLeft: 12,
    },
    deleteButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    loadingText: {
        textAlign: "center",
        fontSize: 18,
        color: "#333",
    },
});
export default FinalizarLista;


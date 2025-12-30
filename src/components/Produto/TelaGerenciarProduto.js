
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  FlatList,
  ScrollView,  // Importando ScrollView
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

// tela de produtos onde o funcionário pode escolher editar e pesquisar produtos
const GerenciarProduto = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);



  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar itens:", error);
        setError("Erro ao carregar dados. Tente novamente.");
        setIsLoading(false);
      });
  }, []);


  const filteredItems = items.filter((item) =>
    item.TB_PRODUTO_NOME.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleProductSelect = (product) => {
    navigation.navigate("EditarProduto", { product });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>{"<"}</Text>
          </TouchableOpacity>

          <Image
            source={require("../img/imgcarcomp.png")}
            style={styles.imagemCabecalho}
          />

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>EDITAR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Digite o nome ou código do produto"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>

        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {!isLoading && searchQuery.length > 0 && (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.TB_PRODUTO_ID.toString()}
            renderItem={({ item }) => (<TouchableOpacity
              style={styles.productItem}
              onPress={() => handleProductSelect(item)}
            >
              <Text style={styles.productText}>{item.TB_PRODUTO_NOME}</Text>
            </TouchableOpacity>
            )}
          />
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Produto não encontrado</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={() => navigation.navigate("DetalheProduto", { categoria: "Frutas" })}
          style={styles.btn}
        >
          <Text style={styles.btntxt}>Frutas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("DetalheProduto", { categoria: "Vegetais" })}
          style={styles.btn}
        >
          <Text style={styles.btntxt}>Vegetais</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("DetalheProduto", { categoria: "Limpeza" })}
          style={styles.btn}
        >
          <Text style={styles.btntxt}>Limpeza</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("DetalheProduto", { categoria: "Laticínios" })}
          style={styles.btn}
        >
          <Text style={styles.btntxt}>Laticínios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("DetalheProduto", { categoria: "Frios" })}
          style={styles.btn}
        >
          <Text style={styles.btntxt}>Frios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("DetalheProduto", { categoria: "Bebidas" })}
          style={styles.btn}
        >
          <Text style={styles.btntxt}>Bebidas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("DetalheProduto", { categoria: "Higiene Pessoal" })}
          style={styles.btn}
        >
          <Text style={styles.btntxt}>Higiene Pessoal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("CadPro")}
          style={styles.btn}
        >
          <Text style={styles.btntxt}>Novo Produto</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7E6",
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
    paddingBottom: 100,  // Adiciona padding para evitar que o conteúdo fique escondido no final da tela
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backText: {
    fontSize: 20,
    color: "#000",
  },
  imagemCabecalho: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  editButton: {
    backgroundColor: "#929CFA",
    padding: 10,
    borderRadius: 10,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 10,
    width: "100%",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 10,
  },
  searchIcon: {
    fontSize: 18,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  productText: {
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#929CFA",
    padding: 15,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "#B8D4E3",
  },
  btntxt: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default GerenciarProduto;
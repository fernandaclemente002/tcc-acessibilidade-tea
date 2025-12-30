import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
//tela onde o funcionario poderá pesquisar os produtos
const DetalheProduto = ({ navigation, route }) => {
  const { categoria } = route.params;
  console.log(categoria);
  const encodedCategoria = encodeURIComponent(categoria);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredProdutos, setFilteredProdutos] = useState([]);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/produto?categoria=" + encodedCategoria);
      setProdutos(response.data);
      setFilteredProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProdutos();
    }, [])
  );

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = produtos.filter((produto) =>
      produto.TB_PRODUTO_NOME.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProdutos(filtered);
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
        <Text style={styles.headerTitulo}>Detalhes de {categoria}</Text>
      </View>

      <TextInput
        style={styles.inputBusca}
        placeholder="Pesquisar produtos..."
        value={searchText}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.conteudo}>
          {filteredProdutos.length > 0 ? (
            filteredProdutos.map((produto) => (
              <TouchableOpacity
                key={produto.TB_PRODUTO_ID}
                style={styles.cartao}
                onPress={() =>
                  navigation.navigate("DetalhesProduto", { produto })
                }
              >
                <View style={styles.infoContainer}>

                  <Image source={produto.TB_PRODUTO_IMAGEM} style={{ width: 100, height: 100 }} />
                  <Text style={styles.tituloProduto}>
                    {produto.TB_PRODUTO_NOME}
                  </Text>
                  <Text style={styles.precoProduto}>
                    R$ {parseFloat(produto.TB_PRODUTO_PRECO).toFixed(2)}
                  </Text>
                  <Text style={styles.freteProduto}>Frete não incluído</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.mensagem}>Nenhum produto encontrado.</Text>
          )}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate("CadPro")}
      >
        <Text style={styles.textoBotao}>Adicionar item de {categoria}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e1e7f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  voltar: {
    marginRight: 10,
  },
  headerTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  inputBusca: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  conteudo: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cartao: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: "48%",
    marginBottom: 20,
    padding: 10,
    alignItems: "center",
    elevation: 5,
  },
  infoContainer: {
    alignItems: "center",
  },
  tituloProduto: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#000",
  },
  precoProduto: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
    fontWeight: "bold",
  },
  freteProduto: {
    fontSize: 12,
    color: "#6e6e6e",
  },
  mensagem: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  botaoAdicionar: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetalheProduto;

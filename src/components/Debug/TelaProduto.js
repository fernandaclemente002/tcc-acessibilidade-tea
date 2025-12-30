import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
//Tela bebidas que aparecerá pro cliente ele poderá pesquisar uma bebida ou clicar pra selecionar um filtro
const Bebidas = ({ navigation, route }) => {
  const {
    filtros = { sabores: {}, texturas: {}, cheiros: {}, embalagens: {} },
  } = route.params || {};
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredProdutos, setFilteredProdutos] = useState([]);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/bebidas");
      setProdutos(response.data);
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

  useEffect(() => {
    if (produtos.length > 0) {
      applyFilters(filtros);
    }
  }, [filtros, produtos]);

  const applyFilters = (filters) => {
    let newFilteredProdutos = [...produtos];

    const hasActiveFilters = (filterCategory) =>
      Object.values(filterCategory).some((isSelected) => isSelected);

    if (hasActiveFilters(filters.sabores)) {
      newFilteredProdutos = newFilteredProdutos.filter((produto) =>
        Object.keys(filters.sabores).some((sabor) => {
          return (
            filters.sabores[sabor] &&
            produto.TB_PRODUTO_SABOR &&
            produto.TB_PRODUTO_SABOR.toLowerCase() === sabor
          );
        })
      );
    }

    if (hasActiveFilters(filters.texturas)) {
      newFilteredProdutos = newFilteredProdutos.filter((produto) =>
        Object.keys(filters.texturas).some((textura) => {
          return (
            filters.texturas[textura] &&
            produto.TB_PRODUTO_TEXTURA &&
            produto.TB_PRODUTO_TEXTURA.toLowerCase() === textura
          );
        })
      );
    }

    if (hasActiveFilters(filters.cheiros)) {
      newFilteredProdutos = newFilteredProdutos.filter((produto) =>
        Object.keys(filters.cheiros).some((cheiro) => {
          return (
            filters.cheiros[cheiro] &&
            produto.TB_PRODUTO_CHEIRO &&
            produto.TB_PRODUTO_CHEIRO.toLowerCase() === cheiro
          );
        })
      );
    }

    if (hasActiveFilters(filters.embalagens)) {
      newFilteredProdutos = newFilteredProdutos.filter((produto) =>
        Object.keys(filters.embalagens).some((embalagem) => {
          return (
            filters.embalagens[embalagem] &&
            produto.TB_PRODUTO_EMBALAGEM &&
            produto.TB_PRODUTO_EMBALAGEM.toLowerCase() === embalagem
          );
        })
      );
    }

    if (searchText) {
      newFilteredProdutos = newFilteredProdutos.filter(
        (produto) =>
          produto.TB_PRODUTO_NOME &&
          produto.TB_PRODUTO_NOME.toLowerCase().includes(
            searchText.toLowerCase()
          )
      );
    }

    setFilteredProdutos(newFilteredProdutos);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    applyFilters(filtros);
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
        <Text style={styles.headerTitulo}>Bebidas</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Filtros")}>
          <Ionicons name="options-outline" size={24} color="black" />
        </TouchableOpacity>
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
    justifyContent: "space-between",
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
});

export default Bebidas;

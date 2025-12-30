
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Picker } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
//essa tela mostra os detalhes do produto e peermite que o cliente possa adiciona-lo a lista
const DetalhesProduto = ({ route, navigation }) => {
  const { produto } = route.params;
  const [quantidade, setQuantidade] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(true);

  const aumentarQuantidade = () => {
    if (quantidade < produto.TB_PRODUTO_QTD) {
      setQuantidade(quantidade + 1);
    }
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  const renderCaracteristica = () => {
    switch (selectedOption) {
      case "Sabor":
        return produto.TB_PRODUTO_SABOR || "N/A";
      case "Cheiro":
        return produto.TB_PRODUTO_CHEIRO || "N/A";
      case "Embalagem":
        return produto.TB_PRODUTO_EMBALAGEM || "N/A";
      case "Textura":
        return produto.TB_PRODUTO_TEXTURA || "N/A";
      default:
        return "Selecione uma característica";
    }
  };
  const adicionarLista = async () => {
    const produtoId = produto.TB_PRODUTO_ID;

    try {
      const resposta = await axios.post('http://localhost:3000/inserirProduto', {
        produtoId: produtoId,
      });
      if (resposta.status === 200) {
        console.log('Lista criada com sucesso!');
        navigation.navigate("FinalizarLista");
      } else {
        console.log('Erro ao criar a lista!');
      }
    } catch (error) {
      console.error("Erro ao buscar listas:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(produto.TB_PRODUTO_ID);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: produto.TB_PRODUTO_IMAGEM || 'https://via.placeholder.com/150' }}
        style={styles.productImage}
      />

      <View style={styles.detailContainer}>
        <Text style={styles.productName}>{produto.TB_PRODUTO_NOME}</Text>
        <Text style={styles.productPrice}>Preço: R$ {produto.TB_PRODUTO_PRECO}</Text>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityText}>Unidade:</Text>
          <View style={styles.quantityButtons}>
            <TouchableOpacity onPress={diminuirQuantidade} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantidade}</Text>
            <TouchableOpacity onPress={aumentarQuantidade} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Características</Text>
          <Picker
            selectedValue={selectedOption}
            onValueChange={(itemValue) => setSelectedOption(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione uma característica" value="" />
            <Picker.Item label="Sabor" value="Sabor" />
            <Picker.Item label="Cheiro" value="Cheiro" />
            <Picker.Item label="Embalagem" value="Embalagem" />
            <Picker.Item label="Textura" value="Textura" />
          </Picker>
        </View>

        <View style={styles.characteristicContainer}>
          <Text style={styles.characteristicText}>
            {renderCaracteristica()}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={(adicionarLista)}>
          <Text style={styles.buttonText}>Adicionar à lista</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewListButton} onPress={() => navigation.navigate("FinalizarLista")}>
          <Text style={styles.buttonText}>Visualizar lista</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF7CF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: {
    width: 300,
    height: 200,
    alignSelf: "center",
    marginBottom: 10,
  },
  detailContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 10,
    textAlign: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  quantityButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: "#EEE",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#333",
  },
  pickerContainer: {
    marginTop: 10,
  },
  pickerLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    textAlign: "center",
  },
  picker: {
    height: 40,
    backgroundColor: "#EEE",
    borderRadius: 5,
  },
  characteristicContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#EEE",
    borderRadius: 5,
    alignItems: "center",
  },
  characteristicText: {
    fontSize: 14,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  addButton: {
    backgroundColor: "#929CFA",
    padding: 10,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  viewListButton: {
    backgroundColor: "#6C6AFF",
    padding: 10,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
export default DetalhesProduto;

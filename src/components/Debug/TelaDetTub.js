import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
//TELA QUE NÃO SERÁ USADA, APENAS MODELO DE DESIGN

const Tubaina = () => {
  const [qtdsel, setqtdsel] = useState(1);
  const [descricaoSelecionada, setDescricaoSelecionada] = useState("sabor");
  const navigation = useNavigation();

  // Função para aumentar a quantidade
  const qtdA = () => {
    setqtdsel((prevQtd) => prevQtd + 1);
  };

  // Função para diminuir a quantidade
  const qtdD = () => {
    if (qtdsel > 1) {
      setqtdsel((prevQtd) => prevQtd - 1);
    }
  };

  // Descrições para cada atributo da Itubaína
  const descricaoAtributo = {
    cheiro:
      "A Itubaína possui um aroma doce e frutado, com notas marcantes de tutti-frutti, que remetem a chiclete e frutas vermelhas.",
    sabor:
      "A Itubaína Tutti Frutti tem um sabor doce e marcante de frutas com notas de chiclete. O sabor é uma mistura de frutas como framboesa e morango, com um leve toque de baunilha.",
    textura:
      "A textura é levemente gaseificada, proporcionando uma sensação efervescente na boca, mas suave e fácil de beber.",
    embalagem:
      "A embalagem da Itubaína é uma lata de 355ml, com um design nostálgico que remete aos anos 1950, reforçando sua proposta de ser um refrigerante clássico.",
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
      </View>

      <Image
        source={require("../img/tubaina.png")}
        style={styles.imagemProduto}
      />

      <Text style={styles.tituloProduto}>
        Refrigerante Tutti Frutti Itubaína Original 355ml
      </Text>
      <Text style={styles.precoProduto}>Preço: R$ 8,76</Text>
      <Text style={styles.marcaProduto}>Marca: Itubaína</Text>

      <View style={styles.quantidadeContainer}>
        <Text style={styles.tituloQuantidadeProduto}>Unidade:</Text>
        <TouchableOpacity style={styles.botaoQuantidade} onPress={qtdD}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantidadeTexto}>{qtdsel}</Text>
        <TouchableOpacity style={styles.botaoQuantidade} onPress={qtdA}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>

      {/* Detalhes do produto (cheiro,sabor,textura e embalagem)*/}
      <View style={styles.descricaoSaborContainer}>
        <Text style={styles.tituloDescricaoSabor}>Descrição do Produto</Text>
        <Picker
          selectedValue={descricaoSelecionada}
          onValueChange={(itemValue) => setDescricaoSelecionada(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Cheiro" value="cheiro" />
          <Picker.Item label="Sabor" value="sabor" />
          <Picker.Item label="Textura" value="textura" />
          <Picker.Item label="Tipo de Embalagem" value="embalagem" />
        </Picker>

        <Text style={styles.descricaoSabor}>
          {descricaoAtributo[descricaoSelecionada]}
        </Text>
      </View>

      <View style={styles.botoesAcoesContainer}>
        <TouchableOpacity style={styles.botaoAdicionar} onPress={""}>
          <Text>Adicionar à lista</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoAdicionar} onPress={""}>
          <Text>Visualizar lista</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  voltar: {
    padding: 8,
  },
  imagemProduto: {
    width: 150,
    height: 300,
    alignSelf: "center",
    marginBottom: 16,
  },
  tituloProduto: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  precoProduto: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  marcaProduto: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  quantidadeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  tituloQuantidadeProduto: {
    marginRight: 8,
    fontSize: 16,
  },
  botaoQuantidade: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    marginHorizontal: 4,
  },
  quantidadeTexto: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  descricaoSaborContainer: {
    backgroundColor: "#d0e7f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  tituloDescricaoSabor: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
  descricaoSabor: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
  },
  botoesAcoesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botaoAdicionar: {
    backgroundColor: "#ffeb3b",
    padding: 16,
    borderRadius: 8,
  },
  botaoVisualizarLista: {
    backgroundColor: "#cddc39",
    padding: 16,
    borderRadius: 8,
  },
});

export default Tubaina;

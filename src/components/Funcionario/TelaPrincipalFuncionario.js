import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

//primeira tela do funcionario após o login, onde escolhe gerenciar mercado, produto ou ver alertas
const GFunc = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtheader}>Compre comigo!</Text>
        <Image
          source={require("../img/logo.png")}
          style={styles.imagemCabecalho}
        />
      </View>

      {/* Botão Gerenciar Mercado */}
      <TouchableOpacity
        onPress={() => navigation.navigate("GMerc")}
        style={styles.btn}
      >
        <Text style={styles.btntxt}>Gerenciar Mercado</Text>
      </TouchableOpacity>

      {/* Botão Gerenciar Produto */}
      <TouchableOpacity
        onPress={() => navigation.navigate("GerenciarProduto")}
        style={styles.btn}
      >
        <Text style={styles.btntxt}>Gerenciar Produto</Text>
      </TouchableOpacity>

      {/* Botão Verificar Alertas */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Principal")}
        style={styles.btn}
      >
        <Text style={styles.btntxt}>Verificar Alertas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5e1",
    padding: 20,
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: "#cbe4ff",
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  txtheader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  imagemCabecalho: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  btn: {
    backgroundColor: "rgba(255, 255, 255, 0.36)",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  btntxt: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GFunc;
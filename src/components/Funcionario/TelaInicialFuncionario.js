import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//tela onde o funcionario irá escolher se quer fazer login ou cadastro
const TelaInicialF = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.voltar}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image source={require("../img/logo.png")} style={styles.img} />
        <Text style={styles.welcomeText}>Seja Bem-Vindo Funcionário</Text>
      </View>

      <Text style={styles.questionText}>Já possui uma conta?</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("EntrarF")}
        style={styles.btn}
      >
        <Text style={styles.btntxt}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.ou}>Ou</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("CadastrarF")}
        style={styles.btn}
      >
        <Text style={styles.btntxt}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEF0B4",
    paddingTop: 50,
  },
  voltar: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  img: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000",
  },
  questionText: {
    fontSize: 18,
    color: "#000000",
    marginVertical: 20,
  },
  btn: {
    backgroundColor: "#1377EC",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  btntxt: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  ou: {
    fontSize: 18,
    color: "#000000",
    marginVertical: 15,
  },
});

export default TelaInicialF;

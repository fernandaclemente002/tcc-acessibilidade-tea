import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

//primeira tela que será mostrada pro cliente escolher supermercados ou lista
const Principal = ({ navigation }) => {
  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <Text style={estilos.txtheader}>Compre comigo!</Text>
        <Image
          source={require("../img/logo.png")}
          style={estilos.imagemCabecalho}
        />
      </View>

      <TouchableOpacity
        style={estilos.containerImagem}
        onPress={() => navigation.navigate("SelecionarLista")}
      >
        <Image
          source={require("../img/supermercado.png")}
          style={estilos.imagem}
        />
        <Text style={estilos.rotuloImagem}>Supermercado</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.containerImagem}
        onPress={() => navigation.navigate("TelaPrincipalLista")}
      >
        <Image source={require("../img/lista.png")} style={estilos.imagem} />
        <Text style={estilos.rotuloImagem}>Listas</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5e1",
    padding: 20,
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: "#cbe4ff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  txtheader: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#305f72",
  },
  imagemCabecalho: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  containerImagem: {
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#fef5e1",
    padding: 10,
  },
  imagem: {
    width: "100%",
    height: 150,
    borderRadius: 20,
  },
  rotuloImagem: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Principal;

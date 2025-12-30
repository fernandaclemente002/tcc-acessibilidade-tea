
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//tela que mostrara todas as listas
const TelaPrincipalLista = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Minhas listas</Text>
        <TouchableOpacity onPress={() => { }}>
          <Ionicons name="volume-high" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.button, styles.buttonHoje]}
          onPress={() => navigation.navigate("ListaHoje")}
        >
          <Image source={require("../img/hoje.png")} style={styles.image} />
          <Text style={styles.buttonText}>Hoje</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonProgramados]}
          onPress={() => navigation.navigate("ListaProgramada")}
        >
          <Image
            source={require("../img/programada.png")}
            style={styles.image}
          />
          <Text style={styles.buttonText}>Programados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonTodas]}
          onPress={() => navigation.navigate("MinhasListas")}
        >
          <Image source={require("../img/todas.png")} style={styles.image} />
          <Text style={styles.buttonText}>Todas as listas</Text>
        </TouchableOpacity>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBE8",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#929CFA",
    borderRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    width: 24,
    height: 24,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: 120,
    borderRadius: 10,
    marginVertical: 10,
  },
  image: {
    width: 48,
    height: 48,
  },
  buttonHoje: {
    backgroundColor: "#83dbc7",
  },
  buttonProgramados: {
    backgroundColor: "#FB3F4A",
  },
  buttonTodas: {
    backgroundColor: "#7eb9da",
  },
  buttonCriarLista: {
    backgroundColor: "#FFFBE8",
  },
  buttonText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TelaPrincipalLista;


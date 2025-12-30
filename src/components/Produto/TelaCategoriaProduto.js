import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
//tela que mostra as categorias dos produtos, como frutas, bebidas..
const CatPro = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Categorias</Text>
        <TouchableOpacity onPress={() => { }}>
          <Ionicons name="volume-high" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.button, styles.btnfrutas]}
          onPress={() => navigation.navigate("DetalheProdutoCliente", { categoria: "Frutas" })}
        >
          <Image source={require("../img/morango.png")} style={styles.image} />
          <Text style={styles.buttonText}>Frutas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.btnveg]}
          onPress={() => navigation.navigate("DetalheProdutoCliente", { categoria: "Vegetais" })}
        >
          <Image source={require("../img/vegetal.png")} style={styles.image} />
          <Text style={styles.buttonText}>Vegetais</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.btnlimp]}
          onPress={() => navigation.navigate("DetalheProdutoCliente", { categoria: "Limpeza" })}
        >
          <Image source={require("../img/limpeza.png")} style={styles.image} />
          <Text style={styles.buttonText}>Limpeza</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.btnleite]}
          onPress={() => navigation.navigate("DetalheProdutoCliente", { categoria: "Latícineos" })}
        >
          <Image source={require("../img/leite.png")} style={styles.image} />
          <Text style={styles.buttonText}>Latícineos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.btnfrios]}
          onPress={() => navigation.navigate("DetalheProdutoCliente", { categoria: "Frios" })}
        >
          <Image source={require("../img/queijo.png")} style={styles.image} />
          <Text style={styles.buttonText}>Frios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.btnbebidas]}
          onPress={() => navigation.navigate("DetalheProdutoCliente", { categoria: "bebidas" })}
        >
          <Image source={require("../img/bebidas.png")} style={styles.image} />
          <Text style={styles.buttonText}>Bebidas</Text>
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
    backgroundColor: "#94EB92",
    borderRadius: 10,
    marginBottom: 20,
  },
  voltar: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
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
  btnfrutas: {
    backgroundColor: "#F6DCDC",
  },
  btnveg: {
    backgroundColor: "#DCF2DB",
  },
  btnlimp: {
    backgroundColor: "#F0F0F0",
  },
  btnleite: {
    backgroundColor: "#CCEDFF",
  },
  btnfrios: {
    backgroundColor: "#FFF8BA",
  },
  btnbebidas: {
    backgroundColor: "#FF4B4B",
  },
  buttonText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CatPro;
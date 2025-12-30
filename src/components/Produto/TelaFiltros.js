import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
//tela de filtros pra selecionar caracteristicas desejadas de cada produto
const Filtros = ({ navigation }) => {
  const [filtros, setFiltros] = useState({
    sabores: {
      doce: false,
      salgado: false,
      acido: false,
      amargo: false,
      picante: false,
    },
    texturas: {
      crocante: false,
      macio: false,
      cremoso: false,
      granulado: false,
      liso: false,
    },
    cheiros: {
      neutro: false,
      agradavel: false,
      forte: false,
      doce: false,
      citrico: false,
    },
    embalagens: {
      plastico: false,
      vidro: false,
      metal: false,
      papel: false,
      tetraPak: false,
    },
  });

  const toggleFiltro = (categoria, tipo) => {
    setFiltros((prevState) => ({
      ...prevState,
      [categoria]: {
        ...Object.keys(prevState[categoria]).reduce((acc, key) => {
          acc[key] = key === tipo;  
          return acc;
        }, {}),
      },
    }));
  };

  const aplicarFiltros = () => {
    navigation.navigate("Bebidas", { filtros });
  };

  const renderFiltro = (categoria, tipos) => (
    <View>
      <Text style={styles.categoria}>
        {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
      </Text>
      {tipos.map((tipo) => (
        <TouchableOpacity
          key={tipo}
          onPress={() => toggleFiltro(categoria, tipo)}
          style={styles.item}
        >
          <Text style={styles.itemText}>
            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
          </Text>
          {filtros[categoria][tipo] && (
            <Ionicons name="checkmark" size={24} color="green" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Filtros</Text>
      {renderFiltro("sabores", [
        "doce",
        "salgado",
        "acido",
        "amargo",
        "picante",
      ])}
      {renderFiltro("texturas", [
        "crocante",
        "macio",
        "cremoso",
        "granulado",
        "liso",
      ])}
      {renderFiltro("cheiros", [
        "neutro",
        "agradavel",
        "forte",
        "doce",
        "citrico",
      ])}
      {renderFiltro("embalagens", [
        "plastico",
        "vidro",
        "metal",
        "papel",
        "tetraPak",
      ])}

      <TouchableOpacity onPress={aplicarFiltros} style={styles.botaoAplicar}>
        <Text style={styles.botaoAplicarTexto}>Aplicar Filtros</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e7f5",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  categoria: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
  },
  botaoAplicar: {
    backgroundColor: "#6A5ACD",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  botaoAplicarTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Filtros;

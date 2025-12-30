// GMerc.js
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Modal,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
//essa tela gerencia os mercados e permite que a pessoa posssa ir até o caminho de cadastro do mercado
const GMerc = ({ navigation, route }) => {
  const [mercadoId, setMercadoId] = useState("");
  const [mercados, setMercados] = useState([]);
  const [modalV, setModalV] = useState(false);
  const [mensagM, setMensagM] = useState("");
  const [tipoModal, setTipoModal] = useState("success");

  useEffect(() => {
    if (route.params?.novoMercado) {
      const novoMercado = route.params.novoMercado;
      setMercados((prevMercados) => [...prevMercados, novoMercado]);
    }
  }, [route.params?.novoMercado]);

  useEffect(() => {
    const buscarMercados = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/mercados");
        if (resposta.ok) {
          const dados = await resposta.json();
          setMercados(dados);
        } else {
          console.log("Erro ao buscar mercados: ", resposta.status);
          setMensagM("Não foi possível obter a lista de mercados.");
          setTipoModal("error");
          setModalV(true);
        }
      } catch (erro) {
        console.log("Erro de conexão ao buscar mercados:", erro);
        setMensagM("Não foi possível obter a lista de mercados.");
        setTipoModal("error");
        setModalV(true);
      }
    };

    buscarMercados();
  }, []);

  const editarMercado = async (mercadoId) => {
    if (mercadoId) {
      try {
        const resposta = await fetch(
          `http://localhost:3000/mercado/${mercadoId}`
        );
        if (resposta.ok) {
          const dados = await resposta.json();
          navigation.navigate("AMerc", { mercado: dados });
        } else {
          console.log("Erro ao buscar detalhes do mercado:", resposta.status);
          setMensagM("Não foi possível obter os detalhes do mercado.");
          setTipoModal("error");
          setModalV(true);
        }
      } catch (erro) {
        console.log("Erro de conexão ao buscar detalhes do mercado:", erro);
        setMensagM("Não foi possível obter os detalhes do mercado.");
        setTipoModal("error");
        setModalV(true);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.voltar}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text>Lista de Mercados:</Text>
      <Picker
        selectedValue={mercadoId}
        style={styles.input}
        onValueChange={(selval) => {
          setMercadoId(selval);
          editarMercado(selval);
        }}
      >
        <Picker.Item label="Selecione um mercado" value="" />
        {mercados.map((mercado) => (
          <Picker.Item
            key={mercado.TB_MERCADO_ID}
            label={mercado.TB_MERCADO_NOME}
            value={mercado.TB_MERCADO_ID}
          />
        ))}
      </Picker>

      <TouchableOpacity
        onPress={() => navigation.navigate("CadM")}
        style={styles.btn}
      >
        <Text style={styles.btntxt}>Adicionar novo mercado</Text>
      </TouchableOpacity>

     

      <Modal
        transparent={true}
        visible={modalV}
        animationType="slide"
        onRequestClose={() => setModalV(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              tipoModal === "error" && styles.modalError,
            ]}
          >
            <Text style={styles.modalText}>{mensagM}</Text>
            <Button title="Fechar" onPress={() => setModalV(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7CF",
    padding: 20,
  },
  voltar: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f5af7a",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#f5af7a",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
  },
  btntxt: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  modalError: {
    backgroundColor: "#f8d7da",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default GMerc;

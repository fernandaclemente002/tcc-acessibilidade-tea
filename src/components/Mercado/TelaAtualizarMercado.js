import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

//tela que irá realizar a atualização do mercado
const AMerc = ({ route, navigation }) => {
  const [mercado, setMercado] = useState(null);
  const [nome, setNome] = useState("");
  const [acessibilidades, setAcessibilidades] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoModal, setTipoModal] = useState("success");

  useEffect(() => {
    if (route.params?.mercado) {
      const mercado = route.params.mercado;
      setMercado(mercado);
      setNome(mercado.TB_MERCADO_NOME);
      setAcessibilidades(mercado.TB_MERCADO_ACESSIBILIDADES);
      setUf(mercado.TB_MERCADO_UF);
      setCidade(mercado.TB_MERCADO_CIDADE);
      setEndereco(mercado.TB_MERCADO_ENDERECO);
      setNumero(mercado.TB_MERCADO_NUMERO);
    }
  }, [route.params?.mercado]);

  const atualizarMercado = async () => {
    try {
      const resposta = await fetch(
        `http://localhost:3000/atualizarmercado/${mercado.TB_MERCADO_ID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome,
            acessibilidades,
            uf,
            cidade,
            endereco,
            numero,
          }),
        }
      );

      if (resposta.ok) {
        setMensagem("Mercado atualizado com sucesso!");
        setTipoModal("success");
        setModalVisible(true);
        setTimeout(() => navigation.goBack(), 1500);
      } else {
        setMensagem("Não foi possível atualizar o mercado.");
        setTipoModal("error");
        setModalVisible(true);
      }
    } catch (error) {
      setMensagem("Erro de conexão ao atualizar o mercado.");
      setTipoModal("error");
      setModalVisible(true);
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
      <Text style={styles.header}>Atualizar Mercado</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Acessibilidades"
        value={acessibilidades}
        onChangeText={setAcessibilidades}
      />
      <TextInput
        style={styles.input}
        placeholder="UF"
        value={uf}
        onChangeText={setUf}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.btn} onPress={atualizarMercado}>
        <Text style={styles.btntxt}>Atualizar</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              tipoModal === "error" && styles.modalError,
            ]}
          >
            <Text style={styles.modalText}>{mensagem}</Text>
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f5af7a",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },voltar: {
    marginBottom: 20,
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

export default AMerc;

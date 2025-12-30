import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

//tela que juntara todas as informações do cadastro e mandara pra rota de cadastro
const ConfirmarCadastro = ({ route, navigation }) => {
  const {
    nome,
    telefone,
    email,
    senha,
    uf,
    cidade,
    endereco,
    numero,
    tipoSanguineo,
    alergias,
  } = route.params;

  const [modalV, setModalV] = useState(false);
  const [mensgM, setMensagemModal] = useState("");
  const [tipoModal, setTipoModal] = useState("sucesso");

  const handleConfirmar = async () => {
    try {
      const response = await fetch("http://localhost:3000/cadcli", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          telefone,
          email,
          senha,
          uf,
          cidade,
          endereco,
          numero,
          tipoSanguineo,
          alergias,
        }),
      });

      const result = await response.json();


      if (response.ok) {
        await AsyncStorage.setItem('userId', String(result.user));
        setMensagemModal("Cadastro realizado com sucesso!");
        setTipoModal("sucesso");
        setModalV(true);
        await AsyncStorage.setItem('userId', String(resultado.user));
        console.log(resultado.user);
        setTimeout(() => {
          setModalV(false);
          navigation.navigate("Inicio");
        }, 2000);
      } else {
        setMensagemModal("Erro ao cadastrar: " + result.error);
        setTipoModal("erro");
        setModalV(true);
      }
    } catch (error) {
      setMensagemModal("Erro de conexão: " + error.message);
      setTipoModal("erro");
      setModalV(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.voltar}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Confirme seus Dados</Text>

      <Text style={styles.label}>Nome: {nome}</Text>
      <Text style={styles.label}>Telefone: {telefone}</Text>
      <Text style={styles.label}>Email: {email}</Text>
      <Text style={styles.label}>UF: {uf}</Text>
      <Text style={styles.label}>Cidade: {cidade}</Text>
      <Text style={styles.label}>Endereço: {endereco}</Text>
      <Text style={styles.label}>Número: {numero}</Text>
      <Text style={styles.label}>Tipo de Sangue: {tipoSanguineo}</Text>
      <Text style={styles.label}>Alergias: {alergias}</Text>

      <TouchableOpacity style={styles.button} onPress={handleConfirmar}>
        <Text style={styles.btntxt}>Confirmar Cadastro</Text>
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
              tipoModal === "erro" && styles.modalErro,
            ]}
          >
            <Text style={styles.modalText}>{mensgM}</Text>
            <Button title="Fechar" onPress={() => setModalV(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fae692",
    padding: 20,
  },
  voltar: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  button: {
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
  modalErro: {
    backgroundColor: "#f8d7da",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ConfirmarCadastro;

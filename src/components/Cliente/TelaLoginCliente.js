import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const EntrarCli = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modalV, setModalV] = useState(false);
  const [mensagM, setMensagM] = useState("");
  const [tipoModal, setTipoModal] = useState("success");

  const Entra = async () => {
    console.log("Botão de login pressionado");

    if (!email || !senha) {
      setMensagM("Preencha todos os campos");
      setTipoModal("error");
      setModalV(true);
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3000/loginC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });
      const resultado = await resposta.json();
      console.log("Resposta do servidor:", resultado);

      if (resposta.ok) {
        await AsyncStorage.setItem('userId', String(resultado.user));
        console.log(resultado.user);

        // Navegar para a tela principal
        navigation.navigate("Principal");
      } else {
        throw new Error(resultado.error || "Email ou senha inválidos");
      }
    } catch (erro) {
      console.error("Erro de login:", erro);
      setMensagM(erro.message || "Não foi possível conectar ao servidor.");
      setTipoModal("error");
      setModalV(true);
    } finally {
      setCarregando(false);
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
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.button} onPress={Entra}>
        <Text style={styles.buttonText}>Entrar</Text>
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
    </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f5af7a",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#f5af7a",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
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

export default EntrarCli;

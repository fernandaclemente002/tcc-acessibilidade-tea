import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

//login funcionario
const EntrarF = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modalV, setModalV] = useState(false);
  const [mensgM, setMensagM] = useState("");
  const [tipoModal, setTipoModal] = useState("success");

  const handleTeste = () => {
    navigation.navigate("GFunc");
  }

  const handleEntrar = async () => {
    if (!email || !senha) {
      setMensagM("Por favor, insira o email e a senha.");
      setTipoModal("error");
      setModalV(true);
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3000/loginF", {
        // Use o IP da sua máquina aqui
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        navigation.navigate("GFunc");
      } else {
        throw new Error(resultado.error || "Email ou senha inválidos");
      }
    } catch (erro) {
      setMensagM(erro.message || "Não foi possível conectar ao servidor.");
      setTipoModal("error");
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

      <TouchableOpacity style={styles.button} onPress={handleTeste}>
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
    color: "#000",
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

export default EntrarF;

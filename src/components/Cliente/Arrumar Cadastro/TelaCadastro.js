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
//tela de cadastro do cliente part1
const Cadastrar = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [modalV, setmodalV] = useState(false);
  const [mensgm, setmensagm] = useState("");

  const avanca = () => {
    if (senha === confirmarSenha) {
      navigation.navigate("Cadastrar2", { nome, email, senha });
    } else {
      setmensagm("As senhas digitadas não coincidem!");
      setmodalV(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.voltar}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Cadastro</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={styles.label}>Confirmar Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry={true}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity onPress={avanca} style={styles.button}>
        <Text style={styles.btntxt}>Avançar</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalV}
        animationType="slide"
        onRequestClose={() => setmodalV(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.mConte}>
            <Text style={styles.textoModal}>{mensgm}</Text>
            <Button title="Fechar" onPress={() => setmodalV(false)} />
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
    marginBottom: 20,
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
  mConte: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  textoModal: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Cadastrar;

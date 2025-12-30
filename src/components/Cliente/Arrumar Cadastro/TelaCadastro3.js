import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  CheckBox,
  Picker,
  Modal,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

//tela de cadastro do cliente part3

const Cadastrar3 = ({ route, navigation }) => {
  const { nome, email, senha, telefone, uf, cidade, endereco, numero } =
    route.params;
  const [tipoSanguineo, setTipoSanguineo] = useState("");
  const [temAlergia, setTemAlergia] = useState(false);
  const [detAl, setDtAl] = useState("");
  const [modalV, setModalV] = useState(false);
  const [mensgM, setMensagemModal] = useState("");

  const Confirma = async () => {
    if (!tipoSanguineo) {
      setMensagemModal("Por favor, selecione o tipo sanguíneo.");
      setModalV(true);
      return;
    }

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
          alergias: temAlergia ? detAl : "",
        }),
      });

      const resultado = await response.json();

      if (response.ok) {
        setMensagemModal("Cadastro realizado com sucesso!");
        setModalV(true);

        setTimeout(() => {
          setModalV(false);
          navigation.navigate("Principal");
        }, 2000);
      } else {
        setMensagemModal("Erro ao cadastrar: " + resultado.error);
        setModalV(true);
      }
    } catch (erro) {
      setMensagemModal("Erro de conexão: " + erro.message);
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

      <Text style={styles.title}>Cadastro</Text>

      <Text style={styles.label}>Tipo Sanguíneo:</Text>
      <Picker
        selectedValue={tipoSanguineo}
        style={styles.picker}
        onValueChange={(selval) => setTipoSanguineo(selval)}
      >
        <Picker.Item label="Selecione o tipo sanguíneo" value="" />
        <Picker.Item label="A+" value="A+" />
        <Picker.Item label="A-" value="A-" />
        <Picker.Item label="B+" value="B+" />
        <Picker.Item label="B-" value="B-" />
        <Picker.Item label="AB+" value="AB+" />
        <Picker.Item label="AB-" value="AB-" />
        <Picker.Item label="O+" value="O+" />
        <Picker.Item label="O-" value="O-" />
      </Picker>

      <Text style={styles.label}>Você possui alguma alergia?</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox value={temAlergia} onValueChange={setTemAlergia} />
        <Text style={styles.checkboxLabel}>Sim</Text>
        <CheckBox
          value={!temAlergia}
          onValueChange={() => setTemAlergia(!temAlergia)}
        />
        <Text style={styles.checkboxLabel}>Não</Text>
      </View>

      {temAlergia && (
        <>
          <Text>Qual?</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome da alergia"
            value={detAl}
            onChangeText={setDtAl}
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={Confirma}>
        <Text style={styles.btntxt}>Cadastrar</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalV}
        animationType="slide"
        onRequestClose={() => setModalV(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalCont}>
            <Text>{mensgM}</Text>
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
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  picker: {
    backgroundColor: "#f5af7a",
    borderRadius: 5,
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#f5af7a",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxLabel: {
    fontSize: 16,
    marginRight: 20,
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
  modalCont: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default Cadastrar3;

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
import { Picker } from "@react-native-picker/picker";
//tela que irá cadastrar o mercado
const CadM = ({ route, navigation }) => {
  const [nome, setNome] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [acessibilidades, setac] = useState("");
  const [modalV, setmodalV] = useState(false);
  const [mensgm, setMensagM] = useState("");
  const [tipoModal, setTipoModal] = useState("success");

  const CadMer = async () => {
    if (!nome || !endereco || !uf || !cidade || !numero || !acessibilidades) {
      setMensagM("Todos os campos devem ser preenchidos.");
      setTipoModal("error");
      setmodalV(true);
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3000/cadmercado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          acessibilidades,
          uf,
          cidade,
          endereco,
          numero,
        }),
      });

      const resultado = await resposta.json();
      if (resposta.ok) {
        setMensagM("Cadastro realizado com sucesso!");
        setTipoModal("success");
        setmodalV(true);

        const novoMercado = {
          TB_MERCADO_ID: resultado.id,
          TB_MERCADO_NOME: nome,
        };
        navigation.navigate("GMerc", { novoMercado });
      } else {
        setMensagM(resultado.message || "Tente novamente mais tarde.");
        setTipoModal("error");
        setmodalV(true);
      }
    } catch (erro) {
      setMensagM("Não foi possível se conectar ao servidor.");
      setTipoModal("error");
      setmodalV(true);
    }
  };

  const ufs = [
    { label: "Acre (AC)", value: "AC" },
    { label: "Alagoas (AL)", value: "AL" },
    { label: "Amapá (AP)", value: "AP" },
    { label: "Amazonas (AM)", value: "AM" },
    { label: "Bahia (BA)", value: "BA" },
    { label: "Ceará (CE)", value: "CE" },
    { label: "Distrito Federal (DF)", value: "DF" },
    { label: "Espírito Santo (ES)", value: "ES" },
    { label: "Goiás (GO)", value: "GO" },
    { label: "Maranhão (MA)", value: "MA" },
    { label: "Mato Grosso (MT)", value: "MT" },
    { label: "Mato Grosso do Sul (MS)", value: "MS" },
    { label: "Minas Gerais (MG)", value: "MG" },
    { label: "Pará (PA)", value: "PA" },
    { label: "Paraíba (PB)", value: "PB" },
    { label: "Paraná (PR)", value: "PR" },
    { label: "Pernambuco (PE)", value: "PE" },
    { label: "Piauí (PI)", value: "PI" },
    { label: "Rio de Janeiro (RJ)", value: "RJ" },
    { label: "Rio Grande do Norte (RN)", value: "RN" },
    { label: "Rio Grande do Sul (RS)", value: "RS" },
    { label: "Rondônia (RO)", value: "RO" },
    { label: "Roraima (RR)", value: "RR" },
    { label: "Santa Catarina (SC)", value: "SC" },
    { label: "São Paulo (SP)", value: "SP" },
    { label: "Sergipe (SE)", value: "SE" },
    { label: "Tocantins (TO)", value: "TO" },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.voltar}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text>Estado</Text>
      <Picker
        selectedValue={uf}
        onValueChange={(itemValue) => setUf(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione uma UF" value="" />
        {ufs.map((ufItem) => (
          <Picker.Item
            key={ufItem.value}
            label={ufItem.label}
            value={ufItem.value}
          />
        ))}
      </Picker>

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
      />
      <TextInput
        style={styles.input}
        placeholder="Acessibilidades"
        value={acessibilidades}
        onChangeText={setac}
      />

      <TouchableOpacity onPress={CadMer} style={styles.btn}>
        <Text style={styles.btntxt}>Cadastrar</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalV}
        animationType="slide"
        onRequestClose={() => setmodalV(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              tipoModal === "error" && styles.modalError,
            ]}
          >
            <Text style={styles.modalText}>{mensgm}</Text>
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

export default CadM;

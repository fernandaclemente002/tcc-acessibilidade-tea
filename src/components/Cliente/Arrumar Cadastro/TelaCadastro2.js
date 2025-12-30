import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Picker,
  Modal,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

//tela de cadastro do cliente part2

const Cadastrar2 = ({ route, navigation }) => {
  const { nome, email, senha } = route.params;
  const [telefone, setTelefone] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [modalV, setmodalV] = useState(false);
  const [mensgm, setmensagm] = useState("");

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

  const avanca = () => {
    if (!telefone || !uf || !cidade || !endereco || !numero) {
      setmensagm("Por favor, preencha todos os campos.");
      setmodalV(true);
    } else {
      navigation.navigate("Cadastrar3", {
        nome,
        email,
        senha,
        telefone,
        uf,
        cidade,
        endereco,
        numero,
      });
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

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Selecione o UF</Text>
      <Picker
        selectedValue={uf}
        style={styles.picker}
        onValueChange={(valselec) => setUf(valselec)}
      >
        {ufs.map((uf) => (
          <Picker.Item key={uf.value} label={uf.label} value={uf.value} />
        ))}
      </Picker>

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />

      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />

      <Text style={styles.label}>Número</Text>
      <TextInput
        style={styles.input}
        placeholder="Número"
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
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
  picker: {
    backgroundColor: "#f5af7a",
    borderRadius: 5,
    marginBottom: 15,
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

export default Cadastrar2;

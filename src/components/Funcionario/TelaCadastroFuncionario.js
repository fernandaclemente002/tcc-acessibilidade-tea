import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Modal,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

// essa tela realiza o cadastro do funcionário

const CadastrarF = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [mercadoId, setMercadoId] = useState("");
  const [mercados, setMercados] = useState([]);
  const [modalV, setModalV] = useState(false);
  const [mensagM, setMensagM] = useState("");
  const [tipoModal, setTipoModal] = useState("success");

  useEffect(() => {
    const buscarMercados = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/mercados");
        if (resposta.ok) {
          const dados = await resposta.json();
          setMercados(dados);
        } else {
          console.log("Erro ao buscar mercados: ", resposta.status);
          mensagM("Não foi possível obter a lista de mercados.");
          setTipoModal("error");
          setMensagM(true);
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

  const CadastraFunc = async () => {
    if (senha === confirmarSenha) {
      try {
        const resposta = await fetch("http://localhost:3000/cadfunc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            email,
            senha,
            telefone,
            cpf,
            mercadoId,
          }),
        });

        const resultado = await resposta.json();
        console.log("Resposta do servidor:", resultado);

        if (resposta.ok) {
          setMensagM("Cadastro realizado com sucesso!");
          setTipoModal("success");
          setModalV(true);
          navigation.navigate("GFunc");
        } else {
          setMensagM(resultado.message || "Tente novamente mais tarde.");
          setTipoModal("error");
          setModalV(true);
          console.log("Erro no servidor:", resultado);
        }
      } catch (erro) {
        setMensagM("Não foi possível se conectar ao servidor.");
        setTipoModal("error");
        setModalV(true);
        console.log("Erro de conexão:", erro);
      }
    } else {
      setMensagM("Senhas não coincidem.");
      setTipoModal("error");
      setModalV(true);
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

      <Text>Cadastro</Text>

      <Text>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text>Telefone:</Text>
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={setTelefone}
      />

      <Text>CPF:</Text>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
      />

      <Text>Selecione o Mercado:</Text>
      <Picker
        selectedValue={mercadoId}
        style={styles.input}
        onValueChange={(selval) => setMercadoId(selval)}
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

      <Text>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />

      <Text>Confirmar Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry={true}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity style={styles.btn} onPress={CadastraFunc}>
        <Text style={styles.btntxt}>Cadastrar</Text>
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

export default CadastrarF;

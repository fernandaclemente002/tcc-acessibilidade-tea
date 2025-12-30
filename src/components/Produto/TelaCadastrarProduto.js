
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  Picker,
  ScrollView,
} from "react-native";
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons";

const api = axios.create({
  baseURL: "http://localhost:3000"
});

// Tela de cadastro do produto
const CadPro = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [embalagem, setTipemb] = useState("");
  const [preco, setPreco] = useState("");
  const [textura, setTextura] = useState("");
  const [sabor, setSabor] = useState("");
  const [cheiro, setCheiro] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [validade, setValidade] = useState("");
  const [dataProducao, setDataProducao] = useState("");
  const [lote, setLote] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [local, setLocal] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [image, setImage] = useState('');
  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });

  const categorias = [
    { label: "Selecione uma categoria", value: "" },
    { label: "Frutas", value: "Frutas" },
    { label: "Vegetais", value: "Vegetais" },
    { label: "Limpeza", value: "Limpeza" },
    { label: "Laticínios", value: "Laticínios" },
    { label: "Frios", value: "Frios" },
    { label: "Bebidas", value: "Bebidas" },
    { label: "Higiene Pessoal", value: "Higiene Pessoal" },
  ];

  const tiposEmbalagem = [
    { label: "Selecione um tipo de embalagem", value: "" },
    { label: "Plástico", value: "Plástico" },
    { label: "Vidro", value: "Vidro" },
    { label: "Metal", value: "Metal" },
    { label: "Papel", value: "Papel" },
    { label: "Tetra Pak", value: "Tetra Pak" },
  ];

  const sabores = [
    { label: "Selecione um sabor", value: "" },
    { label: "Doce", value: "Doce" },
    { label: "Salgado", value: "Salgado" },
    { label: "Ácido", value: "Ácido" },
    { label: "Amargo", value: "Amargo" },
    { label: "Picante", value: "Picante" },
  ];

  const cheiros = [
    { label: "Selecione um cheiro", value: "" },
    { label: "Neutro", value: "Neutro" },
    { label: "Agradável", value: "Agradável" },
    { label: "Forte", value: "Forte" },
    { label: "Doce", value: "Doce" },
    { label: "Cítrico", value: "Cítrico" },
  ];

  const texturas = [
    { label: "Selecione uma textura", value: "" },
    { label: "Crocante", value: "Crocante" },
    { label: "Macio", value: "Macio" },
    { label: "Cremoso", value: "Cremoso" },
    { label: "Granulado", value: "Granulado" },
    { label: "Liso", value: "Liso" },
  ];

  const cadastrarProduto = async () => {
    if (
      nome.trim() === "" ||
      preco.trim() === "" ||
      textura.trim() === "" ||
      sabor.trim() === "" ||
      cheiro.trim() === "" ||
      categoria.trim() === "" ||
      descricao.trim() === "" ||
      validade.trim() === "" ||
      dataProducao.trim() === "" ||
      lote.trim() === "" ||
      quantidade.trim() === "" ||
      local.trim() === "" ||
      embalagem.trim() === ""
    ) {

      setMensagem("Preencha todos os campos, incluindo a imagem.");
      setModalVisivel(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', image);

      const headers = {
        'headers': {
          'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
        }
      }

      await api.post("/upload-image", formData, headers)
        .then((response) => {
          setStatus({
            type: 'success',
            mensagem: response.data.mensagem
          });
        }).catch((err) => {
          if (err.response) {
            setStatus({
              type: 'error',
              mensagem: err.response.data.mensagem
            });
          } else {
            setStatus({
              type: 'error',
              mensagem: "Erro: Tente mais tarde!"
            });
          }
        });
      const imagem = "./uploads/" + image.name;
      const response = await fetch("http://localhost:3000/cadastrar-produto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          preco,
          tipo: categoria,
          descricao,
          local,
          validade,
          dataProducao,
          lote,
          quantidade,
          embalagem,
          sabor,
          cheiro,
          textura,
          imagem,
        }),
      });

      if (response.ok) {
        setMensagem("Produto cadastrado com sucesso!");
        setModalVisivel(true);
        limparCampos();
        navigation.navigate("DetalheProduto", { produto: { nome, preco, categoria } });
      } else {
        setMensagem("Erro ao cadastrar produto.");
        setModalVisivel(true);
      }
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      setMensagem("Erro ao conectar com o servidor.");
      setModalVisivel(true);
    }
  };

  const limparCampos = () => {
    setNome("");
    setTipemb("");
    setPreco("");
    setTextura("");
    setSabor("");
    setCheiro("");
    setCategoria("");
    setDescricao("");
    setLote("");
    setQuantidade("");
    setLocal("");
    setValidade("");
    setDataProducao("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.voltar}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Cadastro de Produto</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Tipo de Embalagem</Text>
      <Picker
        selectedValue={embalagem}
        style={styles.picker}
        onValueChange={(itemValue) => setTipemb(itemValue)}
      >
        {tiposEmbalagem.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

      <Text style={styles.label}>Preço</Text>
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Textura</Text>
      <Picker
        selectedValue={textura}
        style={styles.picker}
        onValueChange={(itemValue) => setTextura(itemValue)}
      >
        {texturas.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

      <Text style={styles.label}>Sabor</Text>
      <Picker
        selectedValue={sabor}
        style={styles.picker}
        onValueChange={(itemValue) => setSabor(itemValue)}
      >
        {sabores.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

      <Text style={styles.label}>Cheiro</Text>
      <Picker
        selectedValue={cheiro}
        style={styles.picker}
        onValueChange={(itemValue) => setCheiro(itemValue)}
      >
        {cheiros.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

      <Text style={styles.label}>Categoria</Text>
      <Picker
        selectedValue={categoria}
        style={styles.picker}
        onValueChange={(itemValue) => setCategoria(itemValue)}
      >
        {categorias.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

      <Text style={styles.label}>Descrição</Text>

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Local</Text>
      <TextInput
        style={styles.input}
        placeholder="Local"
        value={local}
        onChangeText={setLocal}
      />

      <Text style={styles.label}>Validade</Text>
      <TextInput
        style={styles.input}
        placeholder="Validade (DD/MM/AAAA)"
        value={validade}
        onChangeText={setValidade}
      />

      <Text style={styles.label}>Data de Produção</Text>
      <TextInput
        style={styles.input}
        placeholder="Data de Produção (DD/MM/AAAA)"
        value={dataProducao}
        onChangeText={setDataProducao}
      />

      <Text style={styles.label}>Lote</Text>
      <TextInput
        style={styles.input}
        placeholder="Lote"
        value={lote}
        onChangeText={setLote}
      />

      <Text style={styles.label}>Imagem do Produto</Text>
      <input type="file" name="image" onChange={e => setImage(e.target.files[0])} />

      <TouchableOpacity style={styles.button} onPress={cadastrarProduto}>
        <Text style={styles.buttonText}>Cadastrar Produto</Text>
      </TouchableOpacity>

      <Modal visible={modalVisivel} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{mensagem}</Text>
            <Button title="Fechar" onPress={() => setModalVisivel(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FFF7CF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "#f5af7a",
  },
  picker: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#f5af7a",
  },
  button: {
    backgroundColor: "#929CFA",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
  },
  voltar: {
    marginBottom: 20,
  },
});
export default CadPro;

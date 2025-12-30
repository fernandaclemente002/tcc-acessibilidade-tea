import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000"
});

//tela de edição dos produtos
const EditarProduto = ({ route, navigation }) => {
  const { product } = route.params;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [nome, setNome] = useState(product.TB_PRODUTO_NOME);
  const [preco, setPreco] = useState(product.TB_PRODUTO_PRECO.toString());
  const [tipo, setTipo] = useState(product.TB_PRODUTO_TIPO);
  const [descricao, setDescricao] = useState(product.TB_PRODUTO_DESC);
  const [local, setLocal] = useState(product.TB_PRODUTO_LOCAL);
  const [validade, setValidade] = useState(
    formatDate(product.TB_PRODUTO_VALIDADE)
  );
  const [dataProducao, setDataProducao] = useState(
    formatDate(product.TB_PRODUTO_DT_PRODUCAO)
  );
  const [lote, setLote] = useState(product.TB_PRODUTO_LOTE);
  const [quantidade, setQuantidade] = useState(
    product.TB_PRODUTO_QTD.toString()
  );

  // Novos campos
  const [cheiro, setCheiro] = useState(product.TB_PRODUTO_CHEIRO);
  const [sabor, setSabor] = useState(product.TB_PRODUTO_SABOR);
  const [textura, setTextura] = useState(product.TB_PRODUTO_TEXTURA);
  const [embalagem, setEmbalagem] = useState(product.TB_PRODUTO_EMBALAGEM);
  const [image, setImage] = useState(product.TB_PRODUTO_IMAGEM);

  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });

  const formData = new FormData();
  formData.append('image', image);

  const headers = {
    'headers': {
      'Content-Type': 'application/json',
      'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
    }
  }



  const atualizarProduto = async () => {
    if (
      !nome ||
      !preco ||
      !tipo ||
      !descricao ||
      !local ||
      !validade ||
      !dataProducao ||
      !lote ||
      !quantidade ||
      !cheiro ||
      !sabor ||
      !textura ||
      !embalagem
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
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
      const response = await axios.put(
        `http://localhost:3000/atualizarproduto/${product.TB_PRODUTO_ID}`,
        {
          nome,
          preco: parseFloat(preco),
          tipo,
          descricao,
          local,
          validade,
          dataProducao,
          lote,
          quantidade: parseInt(quantidade, 10),
          cheiro,
          sabor,
          textura,
          embalagem,
          imagem,
        }
      );

      console.log("Produto atualizado:", response.data);
      setModalVisible(true);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setError(
        error.response?.data?.message ||
        "Erro ao atualizar produto. Tente novamente."
      );
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        value={preco}
        onChangeText={setPreco}
        placeholder="Preço"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={tipo}
        onChangeText={setTipo}
        placeholder="Tipo"
      />
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição"
      />
      <TextInput
        style={styles.input}
        value={local}
        onChangeText={setLocal}
        placeholder="Local"
      />
      <TextInput
        style={styles.input}
        value={validade}
        onChangeText={setValidade}
        placeholder="Validade (YYYY-MM-DD)"
      />
      <TextInput
        style={styles.input}
        value={dataProducao}
        onChangeText={setDataProducao}
        placeholder="Data de Produção (YYYY-MM-DD)"
      />
      <TextInput
        style={styles.input}
        value={lote}
        onChangeText={setLote}
        placeholder="Lote"
      />
      <TextInput
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        placeholder="Quantidade"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        value={cheiro}
        onChangeText={setCheiro}
        placeholder="Cheiro"
      />
      <TextInput
        style={styles.input}
        value={sabor}
        onChangeText={setSabor}
        placeholder="Sabor"
      />
      <TextInput
        style={styles.input}
        value={textura}
        onChangeText={setTextura}
        placeholder="Textura"
      />
      <TextInput
        style={styles.input}
        value={embalagem}
        onChangeText={setEmbalagem}
        placeholder="Embalagem"
      />

      <Text style={styles.label}>Imagem do Produto</Text>
      <input type="file" name="image" onChange={e => setImage(e.target.files[0])} />

      <TouchableOpacity style={styles.button} onPress={atualizarProduto}>
        <Text style={styles.buttonText}>Atualizar Produto</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Produto atualizado com sucesso!
            </Text>
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF7E6",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f5af7a",
  },
  button: {
    backgroundColor: "#929CFA",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default EditarProduto;

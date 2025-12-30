const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const uploadUser = require('./middlewares/uploadImage');
const port = 3000;
let id, listaId;

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'compre_comigo',
});

conexao.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL');
  }
});


// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
  app.use(cors());
  next();
});
app.use(bodyParser.json());

app.post("/resetaId", (req, res) => {
  id = 0;
});

// Rota para cadastro de cliente
app.post("/cadcli", (req, resp) => {
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
  } = req.body;

  conexao.query(
    "INSERT INTO TB_CLIENTE (TB_CLIENTE_NOME, TB_CLIENTE_TELEFONE, TB_CLIENTE_EMAIL, TB_CLIENTE_SENHA, TB_CLIENTE_UF, TB_CLIENTE_CIDADE, TB_CLIENTE_ENDERECO, TB_CLIENTE_NUMERO, TB_CLIENTE_TIPOSANGUE, TB_CLIENTE_ALERGIAS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
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
    ],
    (err, results) => {
      if (err) {
        return resp
          .status(500)
          .json({ error: "Erro ao registrar o cliente: " + err.message });
      }
      resp.status(200).json({ message: "Cliente registrado com sucesso!" });
    }
  );
  conexao.query(
    "SELECT * FROM TB_CLIENTE WHERE TB_CLIENTE_EMAIL = ? AND TB_CLIENTE_SENHA = ?",
    [email, senha],
    (err, results) => {
      if (err) {
        console.error("Erro no servidor:", err.message);
        return resp
          .status(500)
          .json({ error: "Erro no servidor: " + err.message });
      }
      if (results.length > 0) {
        resp
          .status(200)
          .json({ message: "Cadastro bem-sucedido", user: results[0].TB_CLIENTE_ID });
        id = results[0].TB_CLIENTE_ID;
        console.log(id);
      } else {
        resp.status(401).json({ error: "Erro ao Cadastrar" });
      }
    });
});

// Rota para login de cliente
app.post("/loginC", (req, resp) => {
  const { email, senha } = req.body;

  conexao.query(
    "SELECT * FROM TB_CLIENTE WHERE TB_CLIENTE_EMAIL = ? AND TB_CLIENTE_SENHA = ?",
    [email, senha],
    (err, results) => {
      if (err) {
        console.error("Erro no servidor:", err.message);
        return resp
          .status(500)
          .json({ error: "Erro no servidor: " + err.message });
      }

      if (results.length > 0) {
        resp
          .status(200)
          .json({ message: "Login bem-sucedido", user: results[0].TB_CLIENTE_ID });
        id = results[0].TB_CLIENTE_ID;
        console.log(id);

      } else {
        resp.status(401).json({ error: "Email ou senha inválidos" });
      }
    }
  );
});

// Rota que lista os mercados cadastrados
app.get("/mercados", (req, resp) => {
  conexao.query(
    "SELECT TB_MERCADO_ID, TB_MERCADO_NOME FROM TB_MERCADO",
    (err, results) => {
      if (err) {
        return resp
          .status(500)
          .json({ error: "Erro ao buscar mercados: " + err.message });
      }
      resp.status(200).json(results);
    }
  );
});

// Rota para obter os detalhes de um mercado específico
app.get("/mercado/:id", (req, res) => {
  const { id } = req.params;

  conexao.query(
    "SELECT * FROM TB_MERCADO WHERE TB_MERCADO_ID = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Erro ao buscar detalhes do mercado:", err.message);
        return res.status(500).json({
          error: "Erro ao buscar detalhes do mercado: " + err.message,
        });
      }

      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ message: "Mercado não encontrado." });
      }
    }
  );
});

// Rota para cadastro de funcionário
app.post("/cadfunc", (req, resp) => {
  const { nome, telefone, email, senha, cpf, mercadoId } = req.body;

  conexao.query(
    "INSERT INTO TB_FUNCIONARIO (TB_FUNCIONARIO_NOME, TB_FUNCIONARIO_TELEFONE, TB_FUNCIONARIO_EMAIL, TB_FUNCIONARIO_SENHA, TB_FUNCIONARIO_CPF, TB_MERCADO_ID) VALUES (?, ?, ?, ?, ?, ?)",
    [nome, telefone, email, senha, cpf, mercadoId],
    (err, results) => {
      if (err) {
        console.error("Erro ao registrar o funcionário:", err.message);
        return resp
          .status(500)
          .json({ error: "Erro ao registrar o funcionário: " + err.message });
      }
      resp.status(200).json({ message: "Funcionário registrado com sucesso!" });
    }
  );
});

// Rota para login de funcionário
app.post("/loginF", (req, resp) => {
  const { email, senha } = req.body;

  conexao.query(
    "SELECT * FROM TB_FUNCIONARIO WHERE TB_FUNCIONARIO_EMAIL = ? AND TB_FUNCIONARIO_SENHA = ?",
    [email, senha],
    (err, results) => {
      if (err) {
        console.error("Erro no servidor:", err.message);
        return resp
          .status(500)
          .json({ error: "Erro no servidor: " + err.message });
      }

      if (results.length > 0) {
        resp
          .status(200)
          .json({ message: "Login bem-sucedido", user: results[0] });
      } else {
        resp.status(401).json({ error: "Email ou senha inválidos" });
      }
    }
  );
});

// Rota para cadastro de mercado
app.post("/cadmercado", (req, resp) => {
  const { nome, acessibilidades, uf, cidade, endereco, numero } = req.body;

  if (!nome || !acessibilidades || !uf || !cidade || !endereco || !numero) {
    return resp
      .status(400)
      .json({ error: "Todos os campos são obrigatórios." });
  }

  conexao.query(
    "INSERT INTO TB_MERCADO (TB_MERCADO_NOME, TB_MERCADO_ACESSIBILIDADES, TB_MERCADO_UF, TB_MERCADO_CIDADE, TB_MERCADO_ENDERECO, TB_MERCADO_NUMERO) VALUES (?, ?, ?, ?, ?, ?)",
    [nome, acessibilidades, uf, cidade, endereco, numero],
    (err, results) => {
      if (err) {
        console.error("Erro ao registrar o mercado:", err.message);
        return resp
          .status(500)
          .json({ error: "Erro ao registrar o mercado: " + err.message });
      }
      resp.status(200).json({ message: "Mercado registrado com sucesso!" });
    }
  );
});

// Rota para cadastrar um novo produto
app.post("/cadastrar-produto", (req, res) => {
  const {
    nome,
    preco,
    tipo,
    descricao,
    local,
    validade,
    dataProducao,
    lote,
    quantidade,
    cheiro,
    sabor,
    textura,
    embalagem,
    imagem,
  } = req.body;

  // Validação dos dados
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
    !embalagem ||
    !imagem
  ) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const sql = `
    INSERT INTO TB_PRODUTO (
      TB_PRODUTO_NOME,
      TB_PRODUTO_PRECO,
      TB_PRODUTO_TIPO,
      TB_PRODUTO_DESC,
      TB_PRODUTO_LOCAL,
      TB_PRODUTO_VALIDADE,
      TB_PRODUTO_DT_PRODUCAO,
      TB_PRODUTO_LOTE,
      TB_PRODUTO_QTD,
      TB_PRODUTO_CHEIRO,
      TB_PRODUTO_SABOR,
      TB_PRODUTO_TEXTURA,
      TB_PRODUTO_EMBALAGEM,
      TB_PRODUTO_IMAGEM  
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  conexao.query(
    sql,
    [
      nome,
      preco,
      tipo,
      descricao,
      local,
      validade,
      dataProducao,
      lote,
      quantidade,
      cheiro,
      sabor,
      textura,
      embalagem,
      imagem,
    ],
    (err, results) => {
      if (err) {
        console.error("Erro ao cadastrar o produto:", err.message);
        return res
          .status(500)
          .json({ error: "Erro ao cadastrar o produto: " + err.message });
      }
      res.status(200).json({ message: "Produto cadastrado com sucesso!" });
    }
  );
});


// Rota para atualizar um produto existente
app.put("/atualizarproduto/:id", (req, res) => {
  const { id } = req.params;
  const {
    nome,
    preco,
    tipo,
    descricao,
    local,
    validade,
    dataProducao,
    lote,
    quantidade,
    cheiro,
    sabor,
    textura,
    embalagem,
    imagem,
  } = req.body;

  // Validação dos dados
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
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const sql = `
    UPDATE TB_PRODUTO SET
      TB_PRODUTO_NOME = ?,
      TB_PRODUTO_PRECO = ?,
      TB_PRODUTO_TIPO = ?,
      TB_PRODUTO_DESC = ?,
      TB_PRODUTO_LOCAL = ?,
      TB_PRODUTO_VALIDADE = ?,
      TB_PRODUTO_DT_PRODUCAO = ?,
      TB_PRODUTO_LOTE = ?,
      TB_PRODUTO_QTD = ?,
      TB_PRODUTO_CHEIRO = ?,
      TB_PRODUTO_SABOR = ?,
      TB_PRODUTO_TEXTURA = ?,
      TB_PRODUTO_EMBALAGEM = ?,
      TB_PRODUTO_IMAGEM = ?
    WHERE TB_PRODUTO_ID = ?
  `;

  conexao.query(
    sql,
    [
      nome,
      preco,
      tipo,
      descricao,
      local,
      validade,
      dataProducao,
      lote,
      quantidade,
      cheiro,
      sabor,
      textura,
      embalagem,
      imagem,
      id,
    ],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar o produto:", err.message);
        return res
          .status(500)
          .json({ error: "Erro ao atualizar o produto: " + err.message });
      }
      res.status(200).json({ message: "Produto atualizado com sucesso!" + imagem });
    }
  );
});


app.get("/produto", (req, res) => {
  const { categoria } = req.query;
  const query = "SELECT * FROM TB_PRODUTO WHERE TB_PRODUTO_TIPO = ?";
  //console.log(query + " " + categoria);
  conexao.query(query, [categoria], (err, results) => {
    if (err) {
      console.error("Erro ao buscar os produtos:", err);
      res.status(500).send("Erro ao buscar os produtos.");
    } else {
      res.json(results);
    }
  });
});

// caracteristicas
app.get("/produto/:id/atributos", async (req, res) => {
  const produtoId = req.params.id;

  try {
    const [produtoAtributos] = await db.query(
      `
      SELECT TB_PRODUTO_CHEIRO AS cheiro, 
             TB_PRODUTO_SABOR AS sabor, 
             TB_PRODUTO_TEXTURA AS textura, 
             TB_PRODUTO_EMBALAGEM AS embalagem 
      FROM TB_PRODUTO 
      WHERE TB_PRODUTO_ID = ?
    `,
      [produtoId]
    );

    if (!produtoAtributos) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(produtoAtributos);
  } catch (error) {
    console.error("Erro ao buscar atributos do produto:", error);
    res.status(500).json({ error: "Erro ao buscar atributos do produto" });
  }
});

app.post("/upload-image", uploadUser.single('image'), async (req, res) => {

  if (req.file) {
    //console.log(req.file);
    return res.json({
      erro: false,
      mensagem: "Upload realizado com sucesso!"
    });
  }

  return res.status(400).json({
    erro: true,
    mensagem: "Erro: Upload não realizado com sucesso, necessário enviar uma imagem PNG ou JPG!"
  });
});

app.get("/items", (req, res) => {
  const query = "SELECT * FROM TB_PRODUTO";
  conexao.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar itens:", err);
      res.status(500).send("Erro ao buscar itens");
    } else {
      res.json(results);
    }
  });
});

app.post('/criarLista', async (req, res) => {
  const { nome, data, id } = req.body;
  const query = `
      INSERT INTO TB_LISTA (TB_LISTA_NOME, TB_LISTA_DATA, TB_CLIENTE_ID)
      VALUES (?, ?, ?)
  `;
  conexao.query(query, [nome, data, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao criar lista', message: err.message });
    } else {
      res.status(200).json({ message: 'Lista criada com sucesso!' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


app.get("/Listas", (req, res) => {
  const query = "SELECT TB_LISTA_NOME, MAX(TB_LISTA_DATA) as TB_LISTA_DATA FROM TB_LISTA WHERE TB_CLIENTE_ID = ? GROUP BY TB_LISTA_NOME";
  conexao.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar itens:", err);
      res.status(500).send("Erro ao buscar itens");
    } else {
      res.json(results);
    }
  });
});

app.get("/ListaHoje", (req, res) => {
  const query = "SELECT TB_LISTA_NOME, MAX(TB_LISTA_DATA) as TB_LISTA_DATA FROM TB_LISTA WHERE TB_CLIENTE_ID = ? AND DATE(TB_LISTA_DATA) = CURDATE() GROUP BY TB_LISTA_NOME";
  conexao.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar itens:", err);
      res.status(500).send("Erro ao buscar itens");
    } else {
      res.json(results);
    }
  });
});

app.get("/ListaProgramada", (req, res) => {
  const query = "SELECT TB_LISTA_NOME, MAX(TB_LISTA_DATA) as TB_LISTA_DATA FROM TB_LISTA WHERE TB_CLIENTE_ID = ? AND DATE(TB_LISTA_DATA) != CURDATE() GROUP BY TB_LISTA_NOME";
  conexao.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar itens:", err);
      res.status(500).send("Erro ao buscar itens");
    } else {
      res.json(results);
    }
  });
});

app.get("/pegarLista", (req, res) => {
  const { listaNome } = req.query;
  //console.log(listaNome);
  const query = "SELECT TB_LISTA_NOME FROM TB_LISTA WHERE TB_LISTA_NOME = ? AND TB_CLIENTE_ID = ? AND TB_PRODUTO_ID IS NULL";
  conexao.query(query, [listaNome, id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar itens:", err);
      res.status(500).send("Erro ao buscar itens");
    } else {
      listaId = results[0].TB_LISTA_NOME;
      //console.log(listaId);

    }
  });
});

app.post("/inserirProduto", (req, res) => {
  const { produtoId } = req.body;
  //console.log(produtoId);
  //console.log(id);
  //console.log(listaId)
  const query = "INSERT INTO TB_LISTA (TB_LISTA_NOME, TB_CLIENTE_ID, TB_PRODUTO_ID) VALUES (?, ?, ?);"
  conexao.query(query, [listaId, id, produtoId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao criar lista', message: err.message });
    } else {
      res.status(200).json({ message: 'Lista criada com sucesso!' });
    }
  });
});

app.get("/ListaProduto", (req, res) => {
  const query = "SELECT TB_PRODUTO.TB_PRODUTO_ID, TB_PRODUTO.TB_PRODUTO_NOME,TB_PRODUTO.TB_PRODUTO_IMAGEM,TB_PRODUTO.TB_PRODUTO_PRECO,TB_PRODUTO.TB_PRODUTO_TIPO,TB_PRODUTO.TB_PRODUTO_DESC,TB_PRODUTO.TB_PRODUTO_LOCAL,TB_PRODUTO.TB_PRODUTO_VALIDADE,TB_PRODUTO.TB_PRODUTO_DT_PRODUCAO,TB_PRODUTO.TB_PRODUTO_LOTE,TB_PRODUTO.TB_PRODUTO_QTD,TB_PRODUTO.TB_PRODUTO_CHEIRO,TB_PRODUTO.TB_PRODUTO_SABOR,TB_PRODUTO.TB_PRODUTO_TEXTURA,TB_PRODUTO.TB_PRODUTO_EMBALAGEM FROM TB_LISTA INNER JOIN TB_PRODUTO ON TB_LISTA.TB_PRODUTO_ID = TB_PRODUTO.TB_PRODUTO_ID WHERE TB_LISTA.TB_LISTA_NOME = ?";
  conexao.query(query, [listaId], (err, results) => {
    if (err) {
      console.error("Erro ao buscar os produtos:", err);
      res.status(500).send("Erro ao buscar os produtos.");
    } else {
      //console.log(results); //isso suja o terminal só dar um "clear" depois
      res.json(results);
    }
  });
});

// Deleta o produto da Lista
app.delete('/deletarProduto/:id', (req, res) => {
  const produtoId = req.params.id;
  const query = 'DELETE FROM TB_LISTA WHERE TB_PRODUTO_ID = ? AND TB_LISTA_NOME = ?';
  conexao.query(query, [produtoId, listaId], (err, result) => {
    if (err) {
      console.error('Erro ao deletar o produto:', err);
      return res.status(500).send('Erro ao deletar o produto.');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Produto não encontrado.');
    }
    res.status(200).send('Produto deletado com sucesso');
  });
});
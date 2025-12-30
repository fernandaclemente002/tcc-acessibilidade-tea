const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'compre_comigo',
});

conexao.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso!');

    conexao.end(err => {
        if (err) {
            console.error('Erro ao fechar a conexão:', err);
        } else {
            console.log('Conexão fechada com sucesso.');
        }
    });
});
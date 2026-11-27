const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // insere a tua senha do MySQL se houver
    database: 'techos_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Conectado com sucesso à base de dados TechOS!");
});

module.exports = connection;
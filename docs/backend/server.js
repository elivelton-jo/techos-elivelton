const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com a Base de Dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Insere a tua senha do MySQL se houver
    database: 'techos_db'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado com sucesso à base de dados techos_db!');
});

// Importar e utilizar as rotas de Clientes
const clientesRoutes = require('./routes/clientes')(db);
app.use('/api/clientes', clientesRoutes);

// Rota de Teste da API
app.get('/', (req, res) => {
    res.json({ mensagem: 'API do TechOS a funcionar com sucesso! 🚀' });
});

// Iniciar o Servidor
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});
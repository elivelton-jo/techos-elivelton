const express = require('express');
const router = express.Router();

// Função para receber a conexão do banco de dados (passada via app ou importada)
module.exports = (db) => {

    // 1. Listar todos os clientes (GET /api/clientes)
    router.get('/', (req, res) => {
        const query = 'SELECT * FROM clientes ORDER BY id DESC';
        db.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ erro: 'Erro ao buscar clientes', detalhe: err });
            }
            res.json(results);
        });
    });

    // 2. Cadastrar um novo cliente (POST /api/clientes)
    router.post('/', (req, res) => {
        const { nome, cpf_cnpj, telefone, email } = req.body;

        if (!nome || !cpf_cnpj || !telefone) {
            return res.status(400).json({ aviso: 'Nome, CPF/CNPJ e Telefone são obrigatórios!' });
        }

        const query = 'INSERT INTO clientes (nome, cpf_cnpj, telefone, email) VALUES (?, ?, ?, ?)';
        db.query(query, [nome, cpf_cnpj, telefone, email], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ erro: 'Cliente com este CPF/CNPJ já está registado.' });
                }
                return res.status(500).json({ erro: 'Erro ao registar cliente', detalhe: err });
            }
            res.status(201).json({ 
                mensagem: 'Cliente registado com sucesso!', 
                clienteId: result.insertId 
            });
        });
    });

    return router;
};
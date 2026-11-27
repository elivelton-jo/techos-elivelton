const express = require('express');
const router = express.Router();

module.exports = (db) => {

    // 1. Listar todas as Ordens de Serviço com dados do cliente (GET /api/os)
    router.get('/', (req, res) => {
        const query = `
            SELECT os.*, c.nome AS cliente_nome, c.telefone AS cliente_telefone 
            FROM ordens_servico os
            JOIN clientes c ON os.cliente_id = c.id
            ORDER BY os.id DESC
        `;
        db.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ erro: 'Erro ao buscar ordens de serviço', detalhe: err });
            }
            res.json(results);
        });
    });

    // 2. Criar uma nova Ordem de Serviço (POST /api/os)
    router.post('/', (req, res) => {
        const { equipamento, defeito_relatado, cliente_id, utilizador_id } = req.body;

        if (!equipamento || !defeito_relatado || !cliente_id || !utilizador_id) {
            return res.status(400).json({ aviso: 'Equipamento, defeito, cliente e utilizador são obrigatórios!' });
        }

        // Gerar um protocolo único simples baseado no timestamp atual
        const protocolo = 'OS' + Date.now().toString().slice(-6);

        const query = `
            INSERT INTO ordens_servico (protocolo, equipamento, defeito_relatado, cliente_id, utilizador_id, status) 
            VALUES (?, ?, ?, ?, ?, 'Aberta')
        `;
        
        db.query(query, [protocolo, equipamento, defeito_relatado, cliente_id, utilizador_id], (err, result) => {
            if (err) {
                return res.status(500).json({ erro: 'Erro ao criar ordem de serviço', detalhe: err });
            }
            res.status(201).json({ 
                mensagem: 'Ordem de serviço criada com sucesso!', 
                protocolo: protocolo,
                osId: result.insertId 
            });
        });
    });

    // 3. Atualizar o status e laudo técnico de uma OS (PUT /api/os/:id)
    router.put('/:id', (req, res) => {
        const { id } = req.params;
        const { status, laudo_tecnico, valor } = req.body;

        const dataConclusao = (status === 'Concluída' || status === 'Cancelada') ? new Date() : null;

        const query = `
            UPDATE ordens_servico 
            SET status = ?, laudo_tecnico = ?, valor = ?, data_conclusao = ? 
            WHERE id = ?
        `;

        db.query(query, [status, laudo_tecnico, valor || 0.00, dataConclusao, id], (err, result) => {
            if (err) {
                return res.status(500).json({ erro: 'Erro ao atualizar ordem de serviço', detalhe: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ aviso: 'Ordem de serviço não encontrada.' });
            }
            res.json({ mensagem: 'Ordem de serviço atualizada com sucesso!' });
        });
    });

    return router;
};
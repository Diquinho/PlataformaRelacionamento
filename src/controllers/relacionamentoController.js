import conexao from "../conexao";

export default {
    async create(req, res) {
        const { titulo, descricao, idcliente, idempresa, idtipo_relacionamento, data_relacionamento, observacao, status } = req.body;

        try {
            const result = await conexao.client.query('INSERT INTO relacionamentos (titulo, descricao, idcliente, idempresa, idtipo_relacionamento,'
                + ' data_relacionamento, observacao, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING idrelacionamento',
                [titulo, descricao, idcliente, idempresa, idtipo_relacionamento, data_relacionamento, observacao, status]);

            return res.status(201).json({sucesso: true, mensagem:`${titulo} inserido com sucesso!`});
        } catch (error) {
            console.log(error)
            return res.status(500).json({sucesso: false, mensagem:'Erro ao realizar cadastro de relacionamento.'});
        }
    },

    async consultar(req, res) {
        try {
            const result = await conexao.client.query('SELECT * FROM relacionamentos');

            let lista_relacionamentos = [];

            result.rows.forEach((row) => {
                let listaRelacionamento = {
                    titulo: row.titulo,
                    idempresa: row.idempresa,
                    idtipo_relacionamento: row.idtipo_relacionamento,
                    data_relacionamento: row.data_relacionamento,
                    status: row.status,
                };
                lista_relacionamentos.push(listaRelacionamento);
                console.log(listaRelacionamento);
            });

            return res.status(200).send(lista_relacionamentos);
        } catch (error) {
            return res.status(500).json({sucesso: false, mensagem:'Nenhum relacionamento encontrado!'});
        }
    },

    async delete(req, res, next) {
        const { idrelacionamento } = req.params;

        try {
            const result = await conexao.client.query('DELETE FROM relacionamentos WHERE idrelacionamento = $1',
            [idrelacionamento]);

            if (result.rowCount == 0) {
                return res.status(404).json({ sucesso: false, mensagem: 'Cadastro de relacionamentos não encontrado' });
            } else {
                return res.status(200).json({sucesso: true, mensagem:`Relacionamento: ${titulo} removido com sucesso!`});
            }
        } catch (error) {
            return res.status(500).json({sucesso: false, mensagem:'Erro ao remover cadastro de relacionamento!'});
        }
    },

    async alterar(req, res, next) {
        const { idrelacionamento } = req.params;
        const { titulo, descricao, idcliente, idempresa, idtipo_relacionamento, data_relacionamento, observacoes } = req.body;

        try {
            const result = await conexao.client.query('UPDATE relacionamentos SET titulo = $1, descricao = $2,' +
                'idcliente = $3, idempresa = $4, idtipo_relacionamento = $5,' +
                'data_relacionamento = $6, observacoes = $7 WHERE idrelacionamento = $8',
                [titulo, descricao, idcliente, idempresa, idtipo_relacionamento, data_relacionamento, observacoes, idrelacionamento]);
            
            if (result.rowCount == 0) {
                return res.status(404).json({ sucesso: false, mensagem: 'Nenhúm relacionamento encontrado!' });
            } else {
                return res.status(200).json({sucesso: true, mensagem:`Relacionamento: ${titulo} alterado com sucesso!`});
            }
        } catch (error) {
            return res.status(500).json({sucesso: false, mensagem:'Erro ao atualizar cadastro de relacionamento!'});
        }
    },

    async consultaTipoRelacionamento(req, res, next) {
        const { idtipo_relacionamento, descricao } = req.body;

        try {
            const result = await conexao.client.query('SELECT idtipo_relacionamento, descricao FROM tipo_relacionamento');

            let tipo_relacionamento = [];

            result.rows.forEach((row) => {
                let tipoRelacionamento = {
                    idtipo_relacionamento: row.idtipo_relacionamento,
                    descricao: row.descricao
                };
                tipo_relacionamento.push(tipoRelacionamento);
                console.log(tipoRelacionamento);
            });

            return res.status(200).send(tipo_relacionamento);
        } catch (error) {
            
        }
    }
}
import conexao from "../conexao";


export default {
    async create(req, res) {
        console.log('Chegou no INSERT')
        const { nome, email, idempresa, telefone, data_nascimento, data_cadastro, data_atualizacao, ativo } = req.body;

        try {
            const result = await conexao.client.query('INSERT INTO cad_pessoas (nome, email, idempresa,'
                + ' telefone, data_nascimento, data_cadastro, data_atualizacao, ativo) VALUES ($1, $2, $3, $4, $5, now(), now(), true) RETURNING idpessoa',
                [nome, email, idempresa, telefone, data_nascimento]);

            return res.status(201).json({sucesso: true, mensagem: `${nome} inserido com sucesso!`});
        } catch (error) {
            console.log(error)
            return res.status(500).json({sucesso: false, mensagem:'Erro ao realizar cadastro de pessoa.'});
        }
    },

    async consultar(req, res) {
        try {
            const result = await conexao.client.query('SELECT * FROM cad_pessoas');

            return res.status(201).json({sucesso: true, mensagem:'Busca por cadastro de pessoa realizada com sucesso!'});
        } catch (error) {
            return res.status(500).json({sucesso: false, mensagem:'Nenhuma pessoa encontrado!'});
        }
    },

    async delete(req, res, next) {
        const { idpessoa } = req.params;

        try {
            const result = await conexao.client.query('DELETE FROM cad_pessoas WHERE idpessoa = $1',
            [idpessoa]);

            if (result.rowCount == 0) {
                return res.status(404).json({ sucesso: false, mensagem: 'Cadastro de pessoa não encontrado' });
            } else {
                return res.status(200).json({sucesso: true, mensagem:`Pessoa: ${nome} removido com sucesso!`});
            }
        } catch (error) {
            return res.status(500).json({sucesso: false, mensagem:'Erro ao remover cadastro de pessoa!'});
        }
    },

    async alterar(req, res, next) {
        const { idpessoa } = req.params;
        const { nome, email, idempresa, telefone, data_nascimento, data_cadastro, data_atualizacao, ativo } = req.body;

        try {
            const result = await conexao.client.query('UPDATE cad_pessoas SET nome = $1, email = $2,' +
            'telefone = $3, data_nascimento = $4, data_cadastro = $5, data_atualizacao = $6, ativo = $7 WHERE idpessoa = $8',
                [nome, email, idempresa, telefone, data_nascimento, data_cadastro, data_atualizacao, ativo]);
            
            if (result.rowCount == 0) {
                return res.status(404).json({ sucesso: false, mensagem: 'Nenhúm usuário encontrado!' });
            } else {
                return res.status(200).json({sucesso: true, mensagem:`Cadastro: ${nome} alterado com sucesso!`});
            }
        } catch (error) {
            return res.status(500).json({sucesso: false, mensagem:'Erro ao atualizar cadastro de pessoa!'});
        }
    },

    async consultaEmpresa(req, res, next) {
        const { idempresa, razao_social } = req.body;

        try {
            const result = await conexao.client.query('SELECT idempresa, razao_social FROM cad_empresas');
            let cad_empresas = [];

            result.rows.forEach((row) => {
                let cadEmpresas = {
                    idempresa: row.idempresa,
                    razao_social: row.razao_social
                };
                cad_empresas.push(cadEmpresas);
                console.log(cadEmpresas);
            });

            return res.status(200).send(cad_empresas);
        } catch (error) {
            return res.status(500).json({sucesso: true, mensagem:'Erro ao buscar empresas cadastradas'});
        }
    }
}
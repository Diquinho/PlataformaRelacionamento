import conexao from "../conexao";

export default {
    async create(req, res) {
        const { razao_social, idpessoa_responsavel, idtipo_empresa, data_cadastro, tipo, ativo } = req.body;

        try {
            const result = await conexao.client.query('INSERT INTO cad_empresas (razao_social, idpessoa_responsavel, idtipo_empresa,'
                + ' data_cadastro, tipo, ativo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING idempresa',
                [razao_social, idpessoa_responsavel, idtipo_empresa, data_cadastro, tipo, ativo]);

            return res.status(201).send(`Cadastro da empresa ${razao_social} realizado com sucesso!!`);
        } catch (error) {
            console.log(error)
            return res.status(500).send('Erro ao realizar cadastro da empresa!');
        }
    },

    async consultar(req, res) {
        try {
            const result = await conexao.client.query('SELECT * FROM cad_empresas');

            return res.status(201).send('Busca por cadastro de empresas realizada com sucesso!');
        } catch (error) {
            return res.status(500).send('Nenhuma empresa encontrado!');
        }
    },

    async delete(req, res, next) { // VERIFICAR ESSE BLOCO DE COMANDO, ESTÁ REALIZANDO A EXCLUSÃO DA EMPRESA MAS CAI NO CATCH NO POSTMAN
        const { idempresa } = req.params;

        try {
            const result = await conexao.client.query('DELETE FROM cad_empresas WHERE idempresa = $1',
            [idempresa]);

            if (result.rowCount == 0) {
                return res.status(404).send('Cadastro de empresa não encontrado');
            } else {
                return res.status(200).send(`Empresa: ${razao_social} removida com sucesso!`);
            }
        } catch (error) {
            return res.status(500).send('Erro ao remover cadastro de empresa!');
        }
    },

    async alterar(req, res, next) {
        const { idempresa } = req.params;
        const { razao_social, idpessoa_responsavel, idtipo_empresa, data_cadastro, tipo, ativo } = req.body;

        try {
            const result = await conexao.client.query('UPDATE cad_empresas SET razao_social = $1, idpessoa_responsavel = $2,' +
            'idtipo_empresa = $3, data_cadastro = $4, tipo = $5, ativo = $6 WHERE idempresa = $7',
                [razao_social, idpessoa_responsavel, idtipo_empresa, data_cadastro, tipo, ativo, idempresa]);
            
            if (result.rowCount == 0) {
                return res.status(404).send('Nenhuma empresa encontrada!');
            } else {
                return res.status(200).send(`Dados referente a empresa ${razao_social} alterados com sucesso!`);
            }
        } catch (error) {
            return res.status(500).send('Erro ao atualizar cadastro de empresa!');
        }
    }
}
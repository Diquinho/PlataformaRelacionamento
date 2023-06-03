import conexao from "../conexao";
const path = require('path');

export default {
    async create(req, res) {
        console.log('Chegou no INSERT de Empresas!')
        const { razao_social, nome_fantasia, cnpj, idtipo_empresa, data_cadastro, ativo } = req.body;
        console.log(req.body);

        try {
            const result = await conexao.client.query('INSERT INTO cad_empresas (razao_social, nome_fantasia, cnpj,'
                + ' idtipo_empresa, data_cadastro, ativo) VALUES ($1, $2, $3, $4, now(), true) RETURNING idempresa',
                [razao_social, nome_fantasia, cnpj, idtipo_empresa]);

            return res.status(201).json({sucesso: true, mensagem: `Cadastro da empresa ${razao_social} realizado com sucesso!!`});
        } catch (error) {
            console.error('Erro no banco de dados', error);
            return res.status(500).json({sucesso: false, mensagem:'Erro ao realizar cadastro da empresa!'});
        }
    },

    async consultar(req, res) {
        try {
            const result = await conexao.client.query('SELECT ce.idempresa, ce.cnpj, ce.razao_social, ce.nome_fantasia, te.descricao, ce.data_cadastro, ' +
            'ce.ativo FROM cad_empresas as ce left join tipo_empresas as te on ce.idtipo_empresa = te.idtipo_empresa ' +
                'where ce.ativo = true;');

            let lista_empresas = [];
            console.log('Montando o objeto json...')

            result.rows.forEach((row) => {
                let data_cadastro = new Date(row.data_cadastro).toLocaleDateString();
                let listaEmpresa = {
                    idempresa: row.idempresa,
                    razao_social: row.razao_social,
                    nome_fantasia: row.nome_fantasia,
                    cnpj: row.cnpj,
                    descricao: row.descricao,
                    data_cadastro: data_cadastro,
                    ativo: row.ativo
                };
                lista_empresas.push(listaEmpresa);
                console.log(listaEmpresa);
            });

            return res.status(200).send(lista_empresas);
        } catch (error) {
            console.error('Erro no banco de dados', error);
            return res.status(500).json({sucesso: false, mensagem:'Nenhuma empresa encontrado!'});
        }
    },

    async delete(req, res, next) { // VERIFICAR ESSE BLOCO DE COMANDO, ESTÁ REALIZANDO A EXCLUSÃO DA EMPRESA MAS CAI NO CATCH NO POSTMAN
        const { idempresa } = req.params;

        try {
            const result = await conexao.client.query('DELETE FROM cad_empresas WHERE idempresa = $1',
            [idempresa]);

            if (result.rowCount == 0) {
                return res.status(404).json({ sucesso: false, mensagem: 'Cadastro de empresa não encontrado' });
            } else {
                return res.status(200).json({sucesso: true, mensagem: `Empresa: ${razao_social} removida com sucesso!`});
            }
        } catch (error) {
            console.error('Erro no banco de dados', error);
            return res.status(500).json({sucesso: false, mensagem:'Erro ao remover cadastro de empresa!'});
        }
    },

    async alterar(req, res) {

        try {
            const { idempresa, razao_social, nome_fantasia, cnpj, idtipo_empresa, data_cadastro, ativo } = req.body;

            console.log(idempresa);
            console.log(razao_social);
            console.log(nome_fantasia);

            const result = await conexao.client.query('UPDATE cad_empresas SET razao_social = $1, nome_fantasia = $2, ' +
            'cnpj = $3, idtipo_empresa = $4, data_cadastro = $5, ativo = $6 WHERE idempresa = $7',
                [razao_social, nome_fantasia, cnpj, idtipo_empresa, data_cadastro, ativo, idempresa]);
            
            res.redirect('/lista/empresas');
            
        } catch (error) {
            console.error('Erro no banco de dados', error);
            return res.status(500).json({sucesso: false, mensagem:'Erro ao atualizar cadastro de empresa!'});
        }
    },

    async consultaTipoEmpresa(req, res, next) {
        const { idtipo_empresa, descricao } = req.body;

        try {
            const result = await conexao.client.query('SELECT idtipo_empresa, descricao FROM tipo_empresas');
            let tipo_empresas = [];

            result.rows.forEach((row) => {
                let tipoEmpresa = {
                    idtipo_empresa: row.idtipo_empresa,
                    descricao: row.descricao
                };
                tipo_empresas.push(tipoEmpresa);
                console.log(tipoEmpresa);
            });

            return res.status(200).send(tipo_empresas);
        } catch (error) {
            console.error('Erro no banco de dados', error);
            return res.status(500).json({sucesso: true, mensagem:'Erro ao buscar tipos de empresa'});
        }
    },

    async editarEmpresa(req, res) {
        try {
            const idempresa = req.params.idempresa;
            console.log("idempresa pego como parametro: " + idempresa);
            const result = await conexao.client.query('SELECT * FROM cad_empresas WHERE idempresa = ' + idempresa);
            
            console.log('Resultado:', result.rows); // Exibe os resultados da consulta
            console.log('Query:', result.command); // Exibe a query gerada

            if (result.rows.length > 0) {
                const empresa = result.rows[0];
                res.render('editarEmpresas', { empresa });
            } else {
                res.status(404).json({ message: 'Empresa não encontrada' });
            }

        } catch (error) {
            console.error('Erro no banco de dados', error);
            res.status(500).json({ message: 'Erro ao buscar empresa', error: error.message });
        }
    },
}
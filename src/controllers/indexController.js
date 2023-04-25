import conexao from "../conexao";

export default {
    async consultaRelacionamentoBom(req, res) {

        try {
            const result = await conexao.client.query('select r.num_relacionamento, coalesce(ce.razao_social, ce.nome_fantasia) as nome_empresa,' +
            'sr.descricao from relacionamentos as r inner join cad_empresas as ce on r.idempresa = ce.idempresa ' +
            'inner join status_relacionamento as sr on r.idstatus = sr.idstatus ' +
            'where r.idstatus = 1 order by r.data_relacionamento desc limit 5');
            
                let lista_relacionamento_bom = [];

                result.rows.forEach((row) => {
                    let listaRelacionamentoBom = {
                        num_relacionamento_t1: row.num_relacionamento,
                        nome_empresa_t1: row.nome_empresa,
                        descricao_t1: row.descricao
                    };
                    lista_relacionamento_bom.push(listaRelacionamentoBom);
                    console.log(lista_relacionamento_bom);
                });
    
                return res.status(200).send(lista_relacionamento_bom);

        } catch (error) {
            console.error('Erro no banco de dados', error);
            return res.status(500).json({ sucesso: false, mensagem: 'Nenhum relacionamento encontrado!' });
        }
    },

    async consultaRelacionamentoRegular(req, res) {

        try {
            const result = await conexao.client.query('select r.num_relacionamento, coalesce(ce.razao_social, ce.nome_fantasia) as nome_empresa,' +
            'sr.descricao from relacionamentos as r inner join cad_empresas as ce on r.idempresa = ce.idempresa ' +
            'inner join status_relacionamento as sr on r.idstatus = sr.idstatus ' +
            'where r.idstatus = 2 order by r.data_relacionamento desc limit 5');
            
                let lista_relacionamento_regular = [];

                result.rows.forEach((row) => {
                    let listaRelacionamentoRegular = {
                        num_relacionamento_t2: row.num_relacionamento,
                        nome_empresa_t2: row.nome_empresa,
                        descricao_t2: row.descricao
                    };
                    lista_relacionamento_regular.push(listaRelacionamentoRegular);
                    console.log(lista_relacionamento_regular);
                });
    
                return res.status(200).send(lista_relacionamento_regular);

        } catch (error) {
            console.error('Erro no banco de dados', error);
            return res.status(500).json({ sucesso: false, mensagem: 'Nenhum relacionamento encontrado!' });
        }
    },

    async consultaRelacionamentoRuim(req, res) {

        try {
            const result = await conexao.client.query('select r.num_relacionamento, coalesce(ce.razao_social, ce.nome_fantasia) as nome_empresa,' +
            'sr.descricao from relacionamentos as r inner join cad_empresas as ce on r.idempresa = ce.idempresa ' +
            'inner join status_relacionamento as sr on r.idstatus = sr.idstatus ' +
            'where r.idstatus = 3 order by r.data_relacionamento desc limit 5');
            
                let lista_relacionamento_ruim = [];

                result.rows.forEach((row) => {
                    let listaRelacionamentoRuim = {
                        num_relacionamento_t3: row.num_relacionamento,
                        nome_empresa_t3: row.nome_empresa,
                        descricao_t3: row.descricao
                    };
                    lista_relacionamento_ruim.push(listaRelacionamentoRuim);
                    console.log(lista_relacionamento_ruim);
                });
    
                return res.status(200).send(lista_relacionamento_ruim);

        } catch (error) {
            console.error('Erro no banco de dados', error);
            return res.status(500).json({ sucesso: false, mensagem: 'Nenhum relacionamento encontrado!' });
        }
    },

    async consultaRelacionamentoSemRetorno(req, res) {

        try {
            const result = await conexao.client.query('select r.num_relacionamento, coalesce(ce.razao_social, ce.nome_fantasia) as nome_empresa,' +
            'sr.descricao from relacionamentos as r inner join cad_empresas as ce on r.idempresa = ce.idempresa ' +
            'inner join status_relacionamento as sr on r.idstatus = sr.idstatus ' +
            'where r.idstatus = 4 order by r.data_relacionamento desc limit 5');
            
                let lista_relacionamento_sem_retorno = [];

                result.rows.forEach((row) => {
                    let listaRelacionamentoSemRetorno = {
                        num_relacionamento_t4: row.num_relacionamento,
                        nome_empresa_t4: row.nome_empresa,
                        descricao_t4: row.descricao
                    };
                    lista_relacionamento_sem_retorno.push(listaRelacionamentoSemRetorno);
                    console.log(lista_relacionamento_sem_retorno);
                });
    
                return res.status(200).send(lista_relacionamento_sem_retorno);

        } catch (error) {
            console.error('Erro no banco de dados', error);
            return res.status(500).json({ sucesso: false, mensagem: 'Nenhum relacionamento encontrado!' });
        }
    }
}
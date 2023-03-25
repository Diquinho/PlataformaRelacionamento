//import conexao_bd from "../conexao";
import conexao from "../conexao";

export default {
    async create(req, res) {
        const { login, senha, data_cadastro, ativo } = req.body;

        try {
            const result = await conexao.client.query('INSERT INTO cad_usuarios (login, senha, data_cadastro,'+
                ' ativo) VALUES ($1, $2, $3, $4) RETURNING idusuario', [login, senha, data_cadastro, ativo]);

            return res.status(201).send(`Usuário: ${login} inserido com sucesso!!`);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar usuário'});
        }
    },

    async consultar(req, res) {
        try {
            const result = await conexao.client.query('SELECT * FROM cad_usuarios');

            return res.status(201).send('Busca por usuário realizada com sucesso!');
        } catch (error) {
            return res.status(500).send('Nenhum usuário encontrado!');
        }
    },

    async delete(req, res, next) {
        const { idusuario } = req.params;

        try {
            const result = await conexao.client.query('DELETE FROM cad_usuarios WHERE idusuario = $1',
            [idusuario]);

            if (result.rowCount == 0) {
                return res.status(404).send('Usuário não encontrado');
            } else {
                return res.status(200).send(`Usuário: ${login} removido com sucesso!`);
            }
        } catch (error) {
            return res.status(500).send('Erro ao remover usuário!');
        }
    },

    async alterar(req, res, next) {
        const { idusuario } = req.params;
        const { login, senha, data_cadastro, ativo } = req.body;

        try {
            const result = await conexao.client.query('UPDATE cad_usuarios SET login = $1, senha = $2,' +
            'data_cadastro = $3, ativo = $4 WHERE idusuario = $5',
                [login, senha, data_cadastro, ativo, idusuario]);
            
            if (result.rowCount == 0) {
                return res.status(404).send('Nenhúm usuário encontrado!');
            } else {
                return res.status(200).send(`Usuário: ${login} alterado com sucesso!`);
            }
        } catch (error) {
            return res.status(500).send('Erro ao atualizar o usuário!');
        }
    },

    async logar(req, res, next) {
        const { login, senha } = req.body;
        console.log('Login: ',login);
        console.log('Senha: ',senha);
      
        try {
          const result = await conexao.client.query(
            'SELECT * FROM cad_usuarios WHERE login = $1 and senha = $2',
            [login, senha]
            );
            console.log('Consulta SQL: ', result.rows);
          if (result.rows.length == 0) {
              res.status(401).json({ sucesso: false, mensagem:'Usuário não encontrado!'});
          } else {
            if (result.rows[0].login === login && result.rows[0].senha === senha) {
              res.status(200).json({sucesso: true, mensagem: 'Login realizado com sucesso!'})
            } else {
              res.status(401).json({sucesso: false, mensagem: 'Usuário ou senha incorretos, verifique!'})
            }
          }
        } catch (error) {
          res.status(500).json({sucesso: false, mensagem: 'Erro ao realizar login!'});
        }
      }
    
      
}
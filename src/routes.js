import { Router } from "express";
import usuariosController from "./controllers/usuariosController";
import pessoasController from "./controllers/pessoasController";
import empresasController from "./controllers/empresasController";
import relacionamentoController from "./controllers/relacionamentoController";

const routes = new Router();
const path = require('path');

// ROTA INICIAL PARA VERIFICAÇÃO DE FUNCIONALIDADE

routes.get('/', (req, res) => {
    return res.json({ ok: true });
});

// ROTAS RELACIONADAS A TABELA DE USUÁRIOS

routes.post('/usuarios', usuariosController.create);
routes.get('/usuarios', usuariosController.consultar);
routes.delete('/usuarios/:idusuario', usuariosController.delete);
routes.put('/usuarios/:idusuario', usuariosController.alterar);

// ROTA PARA REALIZAR LOGIN
routes.post('/usuarios/login', usuariosController.logar);

// DEFININDO ROTA QUE SERÁ CHAMADO MEU ARQUIVO INDEX.HTML >> localhost:3333/login
routes.get('/login', (req, res) => {
    const loginPath = path.resolve(__dirname, '..', 'src', 'pages', 'login.html');
    res.sendFile(loginPath);
})

// ROTAS RELACIONADAS A TABELA DE PESSOAS

routes.post('/pessoas', pessoasController.create);
routes.get('/pessoas', pessoasController.consultar);
routes.delete('/pessoas/:idpessoa', pessoasController.delete);
routes.put('/pessoas/:idpessoa', pessoasController.alterar);

// ROTAS RELACIONAS A TABELA DE EMPRESAS

routes.post('/empresas', empresasController.create);
routes.get('/empresas', empresasController.consultar);
routes.delete('/empresas/:idempresa', empresasController.delete);
routes.put('/empresas/:idempresa', empresasController.alterar);

// ROTAS RELACIONADAS A TABELA DE RELACIONAMENTOS

routes.post('/relacionamentos', relacionamentoController.create);
routes.get('/relacionamentos', relacionamentoController.consultar);
routes.delete('/relacionamentos/:idrelacionamento', relacionamentoController.delete);
routes.put('/relacionamentos/:idrelacionamento', relacionamentoController.alterar);


export default routes;
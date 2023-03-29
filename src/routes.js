//import { Router } from "express";
const express = require('express');
const routes = express.Router();
import usuariosController from "./controllers/usuariosController";
import pessoasController from "./controllers/pessoasController";
import empresasController from "./controllers/empresasController";
import relacionamentoController from "./controllers/relacionamentoController";
const path = require('path');

// ==================================== ROTA INICIAL DE TESTE ========================================

routes.get('/', (req, res) => {
    return res.json({ ok: true });
});

//==================================== ROTA DE PÁGINAS HTML ========================================

// DEFININDO ROTAS QUE SERÃO CHAMADOS MEUS ARQUIVOS HTML. Exemplo: localhost:3333/login
routes.get('/login', (req, res) => {
    const loginPath = path.resolve(__dirname, '..', 'src', 'pages', 'login.html');
    res.sendFile(loginPath);
});

routes.get('/pessoas', (req, res) => {
    const formPath = path.resolve(__dirname, '..', 'src', 'pages', 'cadPessoas.html');
    res.sendFile(formPath);
})

routes.get('/empresas', (req, res) => {
    const formPath = path.resolve(__dirname, '..', 'src', 'pages', 'cadEmpresas.html');
    res.sendFile(formPath);
})

// ROTA ONDE É CHAMADO MEU SCRIPT.JS
routes.get('/login/script', (req, res) => {
    const loginPath = path.resolve(__dirname, '..', 'src', 'pages', 'script.js');
    res.sendFile(loginPath);
  });

//==================================== ROTA DE API RESTFULL ========================================
// ROTA PARA REALIZAR LOGIN
routes.post('/usuarios/login', usuariosController.logar);

// ROTA PARA CADASTRAR UMA NOVA PESSOA
routes.post('/cadastro/pessoas', pessoasController.create);

// ROTA PARA CADASTRAR UMA NOVA EMPRESA
routes.post('/cadastro/empresas', empresasController.create);

//USUARIOS
routes.post('/usuarios', usuariosController.create);
routes.get('/usuarios', usuariosController.consultar);
routes.delete('/usuarios/:idusuario', usuariosController.delete);
routes.put('/usuarios/:idusuario', usuariosController.alterar);

//PESSOAS
routes.post('/pessoas', pessoasController.create);
routes.get('/pessoas', pessoasController.consultar);
routes.delete('/pessoas/:idpessoa', pessoasController.delete);
routes.put('/pessoas/:idpessoa', pessoasController.alterar);

//EMPRESAS
routes.post('/empresas', empresasController.create);
routes.get('/empresas', empresasController.consultar);
routes.delete('/empresas/:idempresa', empresasController.delete);
routes.put('/empresas/:idempresa', empresasController.alterar);

//RELACIONAMENTO
routes.post('/relacionamentos', relacionamentoController.create);
routes.get('/relacionamentos', relacionamentoController.consultar);
routes.delete('/relacionamentos/:idrelacionamento', relacionamentoController.delete);
routes.put('/relacionamentos/:idrelacionamento', relacionamentoController.alterar);


export default routes;
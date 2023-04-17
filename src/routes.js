//import { Router } from "express";
const express = require('express');
const routes = express.Router();
import usuariosController from "./controllers/usuariosController";
import pessoasController from "./controllers/pessoasController";
import empresasController from "./controllers/empresasController";
import relacionamentoController from "./controllers/relacionamentoController";
const path = require('path');

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

routes.get('/relacionamentos', (req, res) => {
    const formPath = path.resolve(__dirname, '..', 'src', 'pages', 'cadRelacionamentos.html');
    res.sendFile(formPath);
});

routes.get('/lista/empresas', (req, res) => {
    const loginPath = path.resolve(__dirname, '..', 'src', 'pages', 'listaEmpresas.html');
    res.sendFile(loginPath);
});

routes.get('/lista/pessoas', (req, res) => {
    const loginPath = path.resolve(__dirname, '..', 'src', 'pages', 'listaPessoas.html');
    res.sendFile(loginPath);
});

routes.get('/lista/relacionamento', (req, res) => {
    const loginPath = path.resolve(__dirname, '..', 'src', 'pages', 'listaRelacionamento.html');
    res.sendFile(loginPath);
});

routes.get('/index', (req, res) => {
    const loginPath = path.resolve(__dirname, '..', 'src', 'pages', 'index.html');
    res.sendFile(loginPath);
});

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

// ROTA PARA CADASTRAR UM NOVO RELACIONAMENTO
routes.post('/cadastro/relacionamentos', relacionamentoController.create);

// ROTA PARA CADASTRAR UMA NOVA EMPRESA
routes.post('/cadastro/empresas', empresasController.create);

//ROTA PARA BUSCAR TIPOS DE EMPRESA
routes.get('/cadastro/tipo/empresa', empresasController.consultaTipoEmpresa);

// ROTA PARA BUSCAR CADASTRO DE EMPRESAS
routes.get('/cadastro/pessoas/empresa', pessoasController.consultaEmpresa);

// ROTA PARA BUSCAR CADASTRO DE PESSOAS
routes.get('/consulta/pessoas', pessoasController.consultar);

// ROTA PARA BUSCAR O TIPO DE RELACIONAMENTO
routes.get('/consultar/relacionamento/tipo', relacionamentoController.consultaTipoRelacionamento);

//ROTA PARA BUSCAR STATUS DE RELACIONAMENTO
routes.get('/consultar/relacionamento/status', relacionamentoController.consultaStatusRelacionamento);

// ROTA PARA LISTAR TODAS AS EMPRESAS
routes.get('/empresas/lista', empresasController.consultar);

// ROTA PARA LISTAR TODAS AS PESSOAS
routes.get('/pessoas/lista', pessoasController.lista_pessoas);

// ROTA PARA LISTAR TODOS OS RELACIONAMENTOS
routes.get('/relacionamento/lista', relacionamentoController.consultar);

//USUARIOS
routes.post('/usuarios', usuariosController.create);
routes.get('/usuarios', usuariosController.consultar);
routes.delete('/usuarios/:idusuario', usuariosController.delete);
routes.put('/usuarios/:idusuario', usuariosController.alterar);

//PESSOAS

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
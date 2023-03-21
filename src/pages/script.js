import { response } from "express";
import routes from "../routes";

function fazerLogin() {
    const login = document.getElementById('login');
    const senha = document.getElementById('senha');

    if (!login || !senha) {
        alert('Preencha os campos de login e senha!');
        return;
    }

    const requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({login, senha})
    };
    
    fetch('/usuarios/login', requestOptions).then(response => {
        if (response.ok) {
            // Login realizado com sucesso, redirecionando para uma outra página.
            window.location.href = '/logado.html';
        } else {
            // Login falhou, enviando mensagem de erro
            alert('Login ou senha inválidos!');
        }
    }).catch(error => {
        console.log('Erro ao realizar login', error)
    });
}
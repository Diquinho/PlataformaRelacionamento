import { response } from "express";
import routes from "../routes";

function fazerLogin() {
    const login = document.getElementById('username').value;
    const senha = document.getElementById('password').value;

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
        body: JSON.stringify({login: login, senha: senha})
    };
    
    fetch('/usuarios/login', requestOptions).then(response => {
        response.json().then(data => {
            if (data.sucesso) {
                // Login realizado com sucesso, redirecionando para uma outra página.
                window.location.href = '/logado.html';
            } else {
                // Login falhou, enviando mensagem de erro
                alert(data.mensagem);
            }
        });
    }).catch(error => {
        console.log('Erro ao realizar login', error)
    });
}
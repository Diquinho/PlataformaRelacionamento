    // =============== EVENTOS ==================

// EVENTO PARA REALIZAR LOGIN NA PÁGINA
const btnLogin = document.getElementById('btn-login');

if (btnLogin) {
        btnLogin.addEventListener('click', function (event) {
            event.preventDefault();
            fazerLogin();
        });
}
    
// EVENTO PARA CADASTRAR UMA NOVA PESSOA
const btnSalvarCadastro = document.getElementById('btn-cadastra-pessoa');
    
if (btnSalvarCadastro) {
        btnSalvarCadastro.addEventListener('click', function (event) {
            event.preventDefault();
            cadastraPessoa();
});
}

    // ================== FUNÇÕES ===============

    function fazerLogin() {

        console.log('Entrou no metodo')
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
            body: JSON.stringify({ login: login, senha: senha })
        };
    
        console.log(login);
        console.log(senha);

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


    function cadastraPessoa() {
        console.log('Entrou no método - Cadastro de Pessoa');
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const data_nascimento = document.getElementById('data_nascimento').value;
        const idempresa = document.getElementById('idempresa').value;

        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome, email: email, telefone: telefone,
                data_nascimento: data_nascimento, idempresa: idempresa
            })
        };

        console.log(nome);
        console.log(email);
        console.log(telefone);
        console.log(data_nascimento);

        fetch('/cadastro/pessoas', requestOptions).then(response => {
            response.json().then(data => {
                if (data.sucesso) {
                    // Se o cadastro for realizado com sucesso, ele retorna para a página de listagem
                    window.location.href = '/lista_pessoas.html';
                } else {
                    // Cadastro falhou, enviando mensagem de erro
                    alert(data.mensagem);
                }
            });
        }).catch(error => {
            console.log('Erro ao realizar cadastro', error)
        });
    }
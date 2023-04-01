// EVENTO PARA CADASTRAR UMA NOVA PESSOA
const btnSalvarCadastro = document.getElementById('btn-cadastra-pessoa');
    
if (btnSalvarCadastro) {
        btnSalvarCadastro.onclick = function () {
            cadastraPessoa();
    };
}

function cadastraPessoa() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const data_nascimento = document.getElementById('data_nascimento').value;
    const idempresa = document.getElementById('idempresa').value;

    if (!nome || !email || !telefone || !idempresa) {
        alert('Preencha todos os campos!');
        return
    }
    
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
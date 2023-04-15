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
    const idempresa = document.getElementById('cad-empresas').value;

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
                window.location.href = 'http://localhost:3333/lista/pessoas';
            } else {
                // Cadastro falhou, enviando mensagem de erro
                alert(data.mensagem);
            }
        });
    }).catch(error => {
        console.log('Erro ao realizar cadastro', error)
    });
}

function buscaEmpresa(idempresa) {
    //const idtipo_empresa = document.getElementById('idtipo_empresa').value;

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
  
    };

    return new Promise(function (resolve, reject) {
        fetch('http://localhost:3333/cadastro/pessoas/empresa?' + idempresa, requestOptions).then(async function (response) {
            if (response.status == 200) {
                const retorno = await response.json();
                resolve(retorno);
            } else if (response.status == 401) {
                alert('Erro ao trazer empresas cadastradas!')
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    });
}


function buscaPessoa(idpessoa) {
    //const idtipo_empresa = document.getElementById('idtipo_empresa').value;

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
  
    };

    return new Promise(function (resolve, reject) {
        fetch('http://localhost:3333/consulta/pessoas?' + idpessoa, requestOptions).then(async function (response) {
            if (response.status == 200) {
                const retorno = await response.json();
                resolve(retorno);
            } else if (response.status == 401) {
                alert('Erro ao trazer cadastros de pessoas!')
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    });
}
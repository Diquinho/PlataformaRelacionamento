const btnSalvarCadastroEmpresa = document.getElementById('btn-cadastra-empresa');

if (btnSalvarCadastroEmpresa) {
    btnSalvarCadastroEmpresa.onclick = function () {
        cadastraEmpresa();
    };
}

function cadastraEmpresa() {
    const razao_social = document.getElementById('razao_social').value;
    const nome_fantasia = document.getElementById('nome_fantasia').value;
    const cnpj = document.getElementById('cnpj').value;
    const idtipo_empresa = document.getElementById('idtipo_empresa').value;

    if (!razao_social || !nome_fantasia || !cnpj || !idtipo_empresa) {
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
            razao_social: razao_social, nome_fantasia: nome_fantasia, cnpj: cnpj,
            idtipo_empresa: idtipo_empresa
        })
    };

    console.log(razao_social);
    console.log(nome_fantasia);
    console.log(cnpj);
    console.log(idtipo_empresa);

    fetch('/cadastro/empresas', requestOptions).then(response => {
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

function buscaTipoEmpresa() {
    const idtipo_empresa = document.getElementById('idtipo_empresa').value;

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
  
    };

    console.log(idtipo_empresa);

    return new Promise(function (resolve, reject) {
        fetch('http://localhost:3333/cadastro/tipo/empresa?' + idtipo_empresa, requestOptions).then(async function (response) {
            if (response.status == 200) {
                const retorno = await response.json();
                resolve(retorno);
            } else if (response.status == 401) {
                alert('Erro ao trazer tipos de empresa!')
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    });
}
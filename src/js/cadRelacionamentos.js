// EVENTO DE CLIQUE PARA SALVAR O CADASTRO DE EMPRESA

const btnSalvarRelacionamento = document.getElementById('btn-cadastra-relacionamento');

if (btnSalvarRelacionamento) {
    btnSalvarRelacionamento.onclick = function () {
        cadastraRelacionamento();
    };
}

function cadastraRelacionamento() {
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const idcliente = document.getElementById('cad-pessoas').value;
    const idempresa = document.getElementById('cad-empresas').value;
    const idtipo_relacionamento = document.getElementById('tipo-relacionamento').value;
    const data_relacionamento = document.getElementById('data_relacionamento').value;
    const observacao = document.getElementById('observacao').value;
    const idstatus = document.getElementById('status-relacionamento').value;

    if (!titulo || !descricao || !idcliente || !idempresa || !idtipo_relacionamento ||
        !data_relacionamento || !observacao || !idstatus) {
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
            titulo: titulo, descricao: descricao, idcliente: idcliente,
            idempresa: idempresa, idtipo_relacionamento: idtipo_relacionamento,
            data_relacionamento: data_relacionamento, observacao: observacao, idstatus: idstatus
        })
    };

    console.log(titulo);
    console.log(descricao);
    console.log(idcliente);
    console.log(idempresa);
    console.log(idtipo_relacionamento);
    console.log(data_relacionamento);
    console.log(observacao);
    console.log(idstatus);

    fetch('/cadastro/relacionamentos', requestOptions).then(response => {
        response.json().then(data => {
            if (data.sucesso) {
                // Se o cadastro for realizado com sucesso, ele retorna para a página de listagem
                window.location.href = 'http://localhost:3333/lista/relacionamento';
            } else {
                // Cadastro falhou, enviando mensagem de erro
                alert(data.mensagem);
            }
        });
    }).catch(error => {
        console.log('Erro ao realizar cadastro', error)
    });
}


function buscaTipoRelacionamento(idtipo_relacionamento) {
    //const idtipo_empresa = document.getElementById('idtipo_empresa').value;

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
  
    };

    //console.log(idtipo_empresa);

    return new Promise(function (resolve, reject) {
        fetch('http://localhost:3333/consultar/relacionamento/tipo?' + idtipo_relacionamento, requestOptions).then(async function (response) {
            if (response.status == 200) {
                const retorno = await response.json();
                resolve(retorno);
            } else if (response.status == 401) {
                alert('Erro ao trazer tipos de relacionamentos!')
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    });
}


function buscaStatusRelacionamento(idstatus) {
    //const idtipo_empresa = document.getElementById('idtipo_empresa').value;

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
  
    };

    //console.log(idtipo_empresa);

    return new Promise(function (resolve, reject) {
        fetch('http://localhost:3333/consultar/relacionamento/status?' + idstatus, requestOptions).then(async function (response) {
            if (response.status == 200) {
                const retorno = await response.json();
                resolve(retorno);
            } else if (response.status == 401) {
                alert('Erro ao trazer tipos de relacionamentos!')
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    });
}




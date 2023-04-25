const btnAlteraEmpresa = document.getElementById('btn-altera-empresa');

if (btnAlteraEmpresa) {
    btnAlteraEmpresa.onclick = function () {
        altera_empresa();
    };
}

function lista_empresas() {
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
        fetch('http://localhost:3333/empresas/lista', requestOptions).then(async function (response) {
            if (response.status == 200) {
                const retorno = await response.json();
                console.log('estamos aqui')
                resolve(retorno);
            } else if (response.status == 401) {
                alert('Erro ao trazer listagem de empresas!')
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    });
}


function altera_empresa(idempresa) {
    console.log("chegamos na função, id: ", idempresa);

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
  
    };

    return new Promise(function (resolve, reject) {
        fetch('http://localhost:3333/empresas/' + idempresa, requestOptions).then(async function (response) {
            if (response.status == 200) {
                const data = await response.json(); // converte a resposta em JSON
                document.getElementById("razao_social").value = data.razao_social;
                document.getElementById('nome_fantasia').value = data.nome_fantasia;
                document.getElementById('cnpj').value = data.cnpj;
                document.getElementById('tipo-empresa').value = data.tipo_empresa;
                resolve(data);
            } else if (response.status == 401) {
                alert('Erro ao trazer listagem de empresas!')
            } else {
                reject({
                status: this.status,
                statusText: this.statusText
                });
            }
        })
    });
}

  
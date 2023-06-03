function editarEmpresa(idempresa) {
    console.log("Cheguei aqui" + idempresa);
    window.location.href = "http://localhost:3333/empresas/" + idempresa + "/editar";
}

function atualizarEmpresa() {
    const razao_social = document.getElementById('razao_social').value;
    const nome_fantasia = document.getElementById('nome_fantasia').value;
    const cnpj = document.getElementById('cnpj');
    const idtipo_empresa = document.getElementById('tipo-empresa').value;

    const data = {
        razao_social: razao_social,
        nome_fantasia: nome_fantasia,
        cnpj: cnpj,
        idtipo_empresa: idtipo_empresa
    }

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    console.log(data);

    fetch(`http://localhost:3333/empresas/${idempresa}`, requestOptions).then(response => {
        if (response == 200) {
            window.location.href = 'http://localhost:3333/lista/empresas';
        } else {
            console.error('Erro ao atualizar a empresa, confira o lado do servidor!', response.status);
        }
    }).catch(error => {
        console.error('Erro na requisição: ', error);
    });

}

function lista_empresas() {

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
  
    };

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



  
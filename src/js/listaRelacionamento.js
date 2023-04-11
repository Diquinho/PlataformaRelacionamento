function lista_relacionamentos() {
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
        fetch('http://localhost:3333/relacionamento/lista', requestOptions).then(async function (response) {
            if (response.status == 200) {
                const retorno = await response.json();
                console.log('estamos aqui')
                resolve(retorno);
            } else if (response.status == 401) {
                alert('Erro ao trazer listagem de pessoas!')
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    });
}
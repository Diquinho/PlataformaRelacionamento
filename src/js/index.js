function buscaRelacionamentoBom() {

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
  
    };

    return new Promise(function (resolve, reject) {
        fetch('http://localhost:3333/index/relacionamento/bom', requestOptions).then(async function (response) {
            if (response.status == 200) {
                const retorno = await response.json();
                resolve(retorno);
            } else if (response.status == 401) {
                alert('Erro ao trazer relacionamentos com classificação ótimo!')
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    });
}


function buscaRelacionamentoRegular() {

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
  
    };

    return new Promise(function (resolve, reject) {
        fetch('http://localhost:3333/index/relacionamento/regular', requestOptions).then(async function (response) {
            if (response.status == 200) {
                const retorno = await response.json();
                resolve(retorno);
            } else if (response.status == 401) {
                alert('Erro ao trazer relacionamentos com classificação regular!')
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    });
}


function buscaRelacionamentoRuim() {

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
  
    };

    return new Promise(function (resolve, reject) {
        fetch('http://localhost:3333/index/relacionamento/ruim', requestOptions).then(async function (response) {
            if (response.status == 200) {
                const retorno = await response.json();
                resolve(retorno);
            } else if (response.status == 401) {
                alert('Erro ao trazer relacionamentos com classificação ruim!')
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    });
}

function buscaRelacionamentoSemRetorno() {

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
  
    };

    return new Promise(function (resolve, reject) {
        fetch('http://localhost:3333/index/relacionamento/semretorno', requestOptions).then(async function (response) {
            if (response.status == 200) {
                const retorno = await response.json();
                resolve(retorno);
            } else if (response.status == 401) {
                alert('Erro ao trazer relacionamentos com classificação sem retorno!')
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    });
}
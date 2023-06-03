import { Client } from "pg";

class Conexao {
    constructor() {
    // Conexão com o banco de dados
        this.client = new Client({
            user: 'postgres',
            host: '20.226.9.164',
            database: 'arrow',
            password: 'dico2310',
            port: 5432,
        });
        
        // Nesse bloco de comando ele realiza uma verificação em cima do banco de dados para verificar se
        // a conexão foi realizada com sucesso ou não.

        this.client.connect((err) => {
            if (err) {
                console.error('Erro ao conectar no banco de dados: ', err.stack);
            }
            else {
                console.log('Conexão com banco de dados bem sucedida!');
            }
        });    
}
}

export default new Conexao();
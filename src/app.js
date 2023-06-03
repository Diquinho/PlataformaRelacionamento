import express from 'express';
import { Client } from 'pg';
import routes from './routes';


// Classe onde será utilizado os midlewares e rotas em outros arquivos js

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.server.use(express.static(__dirname + '/pages'));
        this.server.use('/controllers', express.static(__dirname + '/controllers'));
        this.server.use('/css', express.static(__dirname + '/css'));
        this.server.use('/js', express.static(__dirname + '/js'));

        this.server.engine('html', require('ejs').renderFile);
        this.server.set('views', __dirname + '/pages');
        this.server.set('view engine', 'html');
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;

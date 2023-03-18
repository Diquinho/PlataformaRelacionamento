import express from 'express';
import { Client } from 'pg';
import routes from './routes';

// Classe onde será utilizado os midlewares e rotas em outros arquivos js

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;

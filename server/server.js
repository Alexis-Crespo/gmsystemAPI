const express = require('express');
const cors = require('cors');
const ConnectionDB = require('../database/config');
require('dotenv').config();

console.log(process.env)
class Server {
    constructor(){
        this.port = process.env.PORT
        this.app = express();

        //Path
        this.usuarios = '/api/usuarios';
        this.auth = '/api/auth'
        this.jwtDecoded = '/api/jwtDecoded'
        this.executions = '/api/executions'

        this.dbConnection();

        this.middlewares()

        this.routes()
    }

    async dbConnection(){
        await ConnectionDB()
    }

    middlewares(){
        // Cors
        this.app.use(cors())
        // Convierte el req.body en Json
        this.app.use(express.json())

    }

    routes(){
        this.app.use(this.usuarios, require('../routes/usuarios'))
        this.app.use(this.auth, require('../routes/auth'))
        this.app.use(this.jwtDecoded, require('../routes/jwtDecoded'))
        this.app.use(this.executions, require('../routes/executions'))
    }
    
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }
}

module.exports = Server;
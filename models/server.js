const express = require('express')
const cors = require('cors')

const port = process.env.PORT

class Server{

  constructor() {
    this.app = express();
    this.usuariosRouter = '/api/usuarios';

    //middlewares
    this.middlewares();
    //Rutas aplicacion
    this.routes();
  }

  middlewares() {
    //cors
    this.app.use(cors());
    //lectura y porse de body
    this.app.use(express.json())
       //directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usuariosRouter, require('../routes/user'))
   
  }

  listen() {
    this.app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
  }

}

module.exports = Server;
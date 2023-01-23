const express = require('express')
const cors = require('cors');
const fileUpload =require('express-fileupload');
const { dbConnection } = require('../database/config.js');

const port = process.env.PORT

class Server{

  constructor() {
    this.app = express();
    
    this.usuariosRouter = '/api/usuarios';
    this.authPath = '/api/auth'
    this.categoriesRouter = '/api/categorias';
    this.productsRouter = '/api/products';
    this.buscar = '/api/buscar';
    this.uploads = '/api/uploads';

    //conectar a bd
    this.conectarDB();
    //middlewares
    this.middlewares();
    //Rutas aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //cors
    this.app.use(cors());
    //lectura y porse de body
    this.app.use(express.json())
       //directorio publico
    this.app.use(express.static('public'));
    //fileipload
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/'
  }));
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth'))
    this.app.use(this.usuariosRouter, require('../routes/user'))
    this.app.use(this.categoriesRouter, require('../routes/categories'))   
    this.app.use(this.productsRouter, require('../routes/products'))   
    this.app.use(this.buscar, require('../routes/buscar'))   
    this.app.use(this.uploads, require('../routes/uploads'))   

  }

  listen() {
    this.app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
  }

}

module.exports = Server;
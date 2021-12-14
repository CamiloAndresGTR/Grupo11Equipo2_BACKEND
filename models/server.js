const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      usuarios: "/api/usuarios",
      auth: "/api/auth",
      categorias: "/api/categorias",
      vehiculos : "/api/vehiculos",
      subastas : "/api/subastas",
      pujas : "/api/pujas",
      busqueda: '/api/buscar',
      uploads: '/api/uploads',

    };

    this.dbConnect();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  // DB Connection
  async dbConnect() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));

    //Carga de archivos
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
  }));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.vehiculos, require("../routes/vehiculos"));
    this.app.use(this.paths.subastas, require("../routes/subastas"));
    this.app.use(this.paths.pujas, require("../routes/pujas"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;

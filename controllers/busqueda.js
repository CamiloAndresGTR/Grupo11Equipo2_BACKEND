const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Vehiculo, Categoria, Subasta } = require("../models");

const coleccionesPermitidas = ["usuarios", "categorias", "vehiculos","subastas", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); //TRUE
  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      Results: usuario ? [usuario] : [],
    });
  }
  const regexp = new RegExp(termino, "i");
  
  const query = {
    $or: [
      { nombres: regexp },
      { apellidos: regexp },
      { documento: regexp },
      { correo: regexp },
    ],
    $and: [{estado:true}]
  };
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query),
  ]);
  
  res.json({
    total,
    usuarios
  });
};

const buscarVehiculos =  async (termino = "", res = response) => {
    const esMongoID = ObjectId.isValid(termino); //TRUE
    if (esMongoID) {
      const vehiculo = await Vehiculo.findById(termino);
      return res.json({
        Results: vehiculo ? [vehiculo] : [],
      });
    }
    const regexp = new RegExp(termino, "i");
    
    const query = {
      $or: [
        { nombre: regexp },
        { modeloYear: regexp },

      ],
      $and: [{estado:true}]
    };
   
    const [total, vehiculos] = await Promise.all([
      (Vehiculo.countDocuments(query)),
      (await Vehiculo.find(query)
                    .populate('usuario', 'correo')
                    .populate('categoria', 'nombre')),
    ]);
    
    res.json({
      total,
      vehiculos
    });
  };

  const buscarCategorias =  async (termino = "", res = response) => {
    const esMongoID = ObjectId.isValid(termino); //TRUE
    if (esMongoID) {
      const categoria = await Categoria.findById(termino);
      return res.json({
        Results: categoria ? [categoria] : [],
      });
    }
    const regexp = new RegExp(termino, "i");
    
    const query = {
      $or: [
        { nombre: regexp },
      ],
      $and: [{estado:true}]
    };
  
    const [total, categorias] = await Promise.all([
        (Categoria.countDocuments(query)),
        (await Categoria.find(query)
                        .populate('usuario', 'correo')),
    ]);
    
    res.json({
      total,
      categorias
    });
  };

  const buscarSubastas = async (termino = "", res = response) => {
    const esMongoID = ObjectId.isValid(termino); //TRUE
    if (esMongoID) {
      const subasta = await Subasta.findById(termino);
      return res.json({
        Results: subasta ? [subasta] : [],
      });
    }
    const regexp = new RegExp(termino, "i");
    
    const query = {
      $or: [
        { identificador: regexp },
        { descripcion: regexp },
      ],
      $and: [{estado:true}]
    };
  
    const [total, subastas] = await Promise.all([
        (Subasta.countDocuments(query)),
        (await Subasta.find(query)
                        .populate('usuario', 'correo')
                        .populate('categoria', 'nombre')
                        .populate('vehiculo', 'nombre, precioIni , modeloYear, precioFin')),
    ]);
    
    res.json({
      total,
      subastas
    });
  };

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
        buscarUsuarios(termino, res);
      break;
    case "categorias":
        buscarCategorias(termino, res);
      break;
    case "vehiculos":
        buscarVehiculos(termino, res);
      break;
      case "subastas":
        buscarSubastas(termino, res);
      break;
    default:
      res.status(500).json({
        msg: "Falta implementar busqueda",
      });
  }
};

module.exports = {
  buscar,
};

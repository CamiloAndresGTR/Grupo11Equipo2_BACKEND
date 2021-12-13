const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);
  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const {
    nombres,
    apellidos,
    nombreUsuario,
    password,
    correo,
    sexo,
    fechaNacimiento,
    documento,
    rol,
  } = req.body;
  const usuario = new Usuario({
    nombres,
    apellidos,
    nombreUsuario,
    correo,
    password,
    sexo,
    fechaNacimiento,
    documento,
    rol,
  });
  

  //encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();
  res.json({
    msg: "post API - usuariosPost",
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, ...rest } = req.body;



  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }
  const usuarioPut = await Usuario.findByIdAndUpdate(id, rest, {new:true});
  res.json(usuarioPut);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = async (req, res = response) => {

  const {id} = req.params;
 
  //Borrado Físico
  //const usuario = await Usuario.findByIdAndDelete(id);

  //Borrado lógico
  const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
  const usuarioAutenticado = req.usuario;

  res.json({usuario, usuarioAutenticado});
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};

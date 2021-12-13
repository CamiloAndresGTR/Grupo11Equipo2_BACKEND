const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {

  const {nombreUsuario, password} = req.body;

  try {

//Verificar que nombre de usuario existe
const usuario = await Usuario.findOne({ nombreUsuario });
if (!usuario) {
  return res.status(400).json({
    msg: 'Usuario / Password no son correctos - correo'
  });
}

//Verificar si el usuario está activo
if (!usuario.estado) {
  return res.status(400).json({
    msg: 'Usuario / Password no son correctos - estado: false'
  });
  
}

//verificar contraseña
const validPaswword= bcryptjs.compareSync(password, usuario.password);
if (!validPaswword) {
  return res.status(400).json({
    msg: 'Usuario / Password no son correctos - password'
  });
}

//Generar JWT
const token = await generarJWT(usuario.id);


    res.json({
      usuario,
      token 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal, contacte con el administrador"
    });
  }
  
};

module.exports = {
  login,
};

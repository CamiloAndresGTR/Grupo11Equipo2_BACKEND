const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validateJWT = async (req, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "Token invalido",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.PUBLICKEY);
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token invalido - Usuario no existe",
      });
    }
    //Validar si el usuario está activo
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token invalido - Usuario Inactivo",
      });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token invalido- catch",
    });
  }
};

module.exports = {
  validateJWT,
};

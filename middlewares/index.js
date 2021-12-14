
const validarCampos = require("./validar-campos");
const validateJWT = require("./validar-jwt");
const validaRoles = require("./validar-roles");
const validarMonto = require("./validarMonto");
const validarArchivo = require('./validarArchivo')


module.exports={
    ...validarCampos,
    ...validateJWT,
    ...validaRoles,
    ...validarMonto,
    ...validarArchivo,
}
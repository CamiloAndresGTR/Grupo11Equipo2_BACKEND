
const validarCampos = require("./validar-campos");
const validateJWT = require("./validar-jwt");
const validaRoles = require("./validar-roles");
const validarMonto = require("./validarMonto");


module.exports={
    ...validarCampos,
    ...validateJWT,
    ...validaRoles,
    ...validarMonto,
}

const validarCampos = require("./validar-campos");
const validateJWT = require("./validar-jwt");
const validaRoles = require("./validar-roles");


module.exports={
    ...validarCampos,
    ...validateJWT,
    ...validaRoles,
}
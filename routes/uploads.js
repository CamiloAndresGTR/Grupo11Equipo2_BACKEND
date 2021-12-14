const { Router } = require("express");
const { check } = require("express-validator");

const { cargarArchivo, actualizarImagen,mostrarImagen, actualizarImagenCloud } = require("../controllers/uploads");
const { coleccionesPermitidas, existeVehiculo } = require("../helpers");


const { validarCampos,validarArchivo,validateJWT } = require("../middlewares");




const router = Router();

router.post('/',validarArchivo, cargarArchivo);

router.get('/:coleccion/:id',[
    validateJWT,
    check('id','El id debe ser un id de mongo').isMongoId(),
    check('id').custom(existeVehiculo),
    check('coleccion').custom(c=> coleccionesPermitidas(c,['vehiculos'])),
    validarCampos
],
mostrarImagen
)

router.put('/:coleccion/:id',[
    validateJWT,
    validarArchivo,
    check('id','El id debe ser un id de mongo').isMongoId(),
    check('id').custom(existeVehiculo),
    check('coleccion').custom(c=> coleccionesPermitidas(c,['vehiculos'])),
    validarCampos
],
actualizarImagenCloud
)

module.exports = router;
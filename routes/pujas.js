const { Router } = require("express");
const { check } = require("express-validator");

const {crearPuja,
    obtenerPujas,
    obtenerPuja,
    obtenerPujaBySubasta,
    borrarPuja 
} = require('../controllers/pujas');


const {
    validarCampos,
    validateJWT,
    validarMonto
  } = require("../middlewares");
  const {
    
    existeSubasta,
    existePuja
  } = require("../helpers/db-validators");

const router = Router();

router.get("/", obtenerPujas);

router.get("/:id",[
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existePuja),
    validarCampos,
], obtenerPuja);

router.get("/subasta/:subasta",[
    check("subasta", "No es un id de Mongo válido").isMongoId(),
    check("subasta").custom(existeSubasta),
    validarCampos,
], obtenerPujaBySubasta);

router.post(
    "/",
    [
      validateJWT,
      check("monto", "El monto es requerido").not().isEmpty(),
      check("monto", "El monto debe ser numerico").isNumeric(),
      check("subasta", "La subasta es requerida").not().isEmpty(),
      check("subasta", "No es un mongo id").isMongoId(),
      validarMonto,
      validarCampos,
    ],
    crearPuja
  );

router.delete("/:id", [
    validateJWT,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existePuja),
    validarCampos,
  ], 
  borrarPuja);

module.exports = router;
const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearSubasta,
  obtenerSubastas,
  obtenerSubasta,
  actualizarSubasta,
  borrarSubasta,
} = require("../controllers/subastas");
const {
  validarCampos,
  validateJWT,
  tieneRole,
  esADminRole,
} = require("../middlewares");
const {
  esRoleValido,
  existeVehiculo,
  existeCategoria,
  existeSubasta,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", obtenerSubastas);

router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeSubasta),
    validarCampos,
  ],
  obtenerSubasta
);

router.post(
  "/",
  [
    validateJWT,
    check("identificador", "El identificador es requerido").not().isEmpty(),
    check("categoria", "La categoria es requerida").not().isEmpty(),
    check("categoria", "No es un mongo id").isMongoId(),
    check("categoria").custom(existeCategoria),
    check("vehiculo", "No es un mongo id").isMongoId(),
    check("vehiculo").custom(existeVehiculo),
    validarCampos,
  ],
  crearSubasta
);

router.put(
  "/:id",
  [
    validateJWT,
    tieneRole("ADMIN", "EMPLOYEE"),
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeSubasta),
    check("categoria", "No es un id de mongo valido").isMongoId(),
    check("rol").custom(esRoleValido),
  ],
  actualizarSubasta
);

router.delete(
  "/:id",
  [
    validateJWT,
    esADminRole,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeSubasta),
    validarCampos,
  ],
  borrarSubasta
);

module.exports = router;

const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
} = require("../controllers/categorias");

const {
  validarCampos,
  validateJWT,
  tieneRole,
  esADminRole,
} = require("../middlewares");

const {
  esRoleValido,
  correoExiste,
  usuarioPorIdExiste,
  existeCategoria,
} = require("../helpers/db-validators");

const router = Router();
//Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

// Obtener una categoria por id - Publico
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  obtenerCategoria
);

//Crear categoría - privado
router.post(
  "/",
  [
    validateJWT,
    check("nombre", "El nombre es requerido").not().isEmpty(),
    //check('usuario','El usuario es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//Actualizar una categoria - privado
router.put(
  "/:id",
  [
    validateJWT,
    tieneRole("ADMIN", "EMPLOYEE"),
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeCategoria),
    check('nombre', 'El nombre es un campo obligatorio'),
    check("rol").custom(esRoleValido),
  ],
  actualizarCategoria
);
//Delete lógico - privado - Admin
router.delete("/:id", [
  validateJWT,
  esADminRole,
  check("id", "No es un id valido").isMongoId(),
  check("id").custom(existeCategoria),
  validarCampos,
], 
borrarCategoria
);

module.exports = router;

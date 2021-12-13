const { Router } = require("express");
const { check } = require("express-validator");

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
  nombreUsuarioExiste,
} = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");

const router = Router();

router.get(
  "/",
  [
    validateJWT,
    tieneRole("ADMIN", "EMPLOYEE"),
    check("desde", "El valor (desde) debe ser númerico").isNumeric(),
    check("limite", "El valor (limite) debe ser númerico").isNumeric(),
    validarCampos,
  ],
  usuariosGet
);

router.put(
  "/:id",
  [
    validateJWT,
    tieneRole("ADMIN", "EMPLOYEE"),
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(usuarioPorIdExiste),
    check("rol").custom(esRoleValido),
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("correo", "El correo ingresado no es válido").isEmail(),
    check("correo").custom(correoExiste),
    check("nombreUsuario", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("nombreUsuario").custom(nombreUsuarioExiste),
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    check("apellidos", "El apellido es obligatorio").not().isEmpty(),

    check(
      "password",
      "La contraseña no puede estar vacía y debe ser de mas de 6 caracteres"
    ).isLength({ min: 6 }),
    check("documento", "El número de documento es obligatorio").not().isEmpty(),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validateJWT,
    esADminRole,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(usuarioPorIdExiste),
    validarCampos,
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

module.exports = router;

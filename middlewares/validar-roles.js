const { response } = require("express");

const esADminRole = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Algo salió mal -admin -token -rol",
    });
  }
  const { rol, correo } = req.usuario;
  if (rol != "ADMIN") {
    return res.status(401).json({
      msg: `El usuario: ${correo}, no tiene permisos para ejecutar esta acción`,
    });
  }
  next();
};
const tieneRole = (...roles) => {
  return (req, res = response, next) => {
 
    if (!req.usuario) {
        return res.status(500).json({
          msg: "Algo salió mal -admin -token -rol",
        });
    }
    if (!roles.includes(req.usuario.rol)) {
        return res.status(401).json({
            msg: `El usuario: ${req.usuario.correo}, no tiene permisos para ejecutar esta acción, debe ser ${roles}`,
          });
    }
    next();
  };
};

module.exports = {
  esADminRole,
  tieneRole,
};

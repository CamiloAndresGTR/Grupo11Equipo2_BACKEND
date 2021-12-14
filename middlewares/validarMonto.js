const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { Subasta } = require("../models");

const validarMonto = async (req, res = response, next) => {
  if (!req.body.monto) {
    return res.status(500).json({
      msg: "Algo salió mal monto",
    });
  }
  const { monto, subasta } = req.body;
  const esMongoID = ObjectId.isValid(subasta); //TRUE
  if (!esMongoID) {
    return res.status(400).json({
      msg: `El id de subasta: ${req.usuario.correo}, no existe`,
    });
  }
  const subastaDb = await Subasta.findById(subasta).populate(
    "vehiculo"
  );
 
  if ((monto <= subastaDb.vehiculo.precioIni) || (monto <= subastaDb.vehiculo.precioFin) ) {
      
    return res.status(400).json({
      msg: `El monto de puja: ${monto}, debe ser mayor al valor inicial y mayor a la puja actual`,
    });
  }

  next();
};

module.exports = {
  validarMonto,
};

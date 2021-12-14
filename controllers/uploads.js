const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const path = require("path");
const fs = require("fs");
const { status } = require("express/lib/response");
const { model } = require("mongoose");

const { subirArchivo } = require("../helpers");

const { Vehiculo } = require("../models");

const cargarArchivo = async (req, res = response) => {
  try {
    const fileName = await subirArchivo(req.files, "vehiculos", undefined);

    res.json({ fileName });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  const modelo = await Vehiculo.findById(id);
  if (!modelo) {
    return res, status(400).json({ msg: `El vehiculo: ${id}, no existe` });
  }

  //Limpiar imagenes previas
  try {
    if (modelo.img) {
      //Validar la imágen del server
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        coleccion,
        modelo.img
      );
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
      }
    }
  } catch (error) {
    throw new Error(`Algo salió mal al borrar la imagen -- ${error}`);
  }

  const fileName = await subirArchivo(req.files, coleccion, undefined);
  modelo.img = fileName;
  await modelo.save();
  res.json({ modelo });
};

const mostrarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  const modelo = await Vehiculo.findById(id);
  if (!modelo) {
    return res, status(400).json({ msg: `El vehiculo: ${id}, no existe` });
  }

  //Limpiar imagenes previas

  if (modelo.img) {
    //Validar la imágen del server
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );

    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }
  const noImagePath = path.join(__dirname, "../assets", "no-image.jpg");
  return res.sendFile(noImagePath);
};

const actualizarImagenCloud = async (req, res = response) => {
  const { id, coleccion } = req.params;

  const modelo = await Vehiculo.findById(id);
  if (!modelo) {
    return res, status(400).json({ msg: `El vehiculo: ${id}, no existe` });
  }

  //Limpiar imagenes previas
  try {
    if (modelo.img) {
      //Validar la imágen del server
      const nombreArr = modelo.img.split("/");
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split('.');
      
      cloudinary.uploader.destroy(public_id);
    }
  } catch (error) {
    throw new Error(`Algo salió mal al borrar la imagen -- ${error}`);
  }
  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  modelo.img = secure_url;
  await modelo.save();
  res.json({ modelo });
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloud,
};

const { Categoria,Role,Usuario,Vehiculo, Subasta, Puja } = require("../models");
const { collection } = require("../models/categoria");


const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });

  if (!existeRol) {
    throw new Error(`El rol: ${rol}, no está registrado en la base de datos`);
  }
};

const correoExiste = async (correo = '') => {
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error(
      `El correo: ${correo}, ya está registrado en la base de datos`
    );
  }
};
const nombreUsuarioExiste = async (nombreUsuario = '') =>{
  const existeNombreUsuario = await Usuario.findOne({ nombreUsuario });
  if (existeNombreUsuario) {
    throw new Error(
      `El usuario: ${nombreUsuario}, ya está registrado en la base de datos`
    );
  }
};

const usuarioPorIdExiste = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
      throw new Error(
        `El usuario: ${id}, no está registrado en la base de datos`
      );
    }
  };

  const existeCategoria = async (id = '') =>{
    const existeCat = await Categoria.findById(id);
    if (!existeCat) {
      throw new Error(
        `la Categoría: ${id}, no está registrada en la base de datos`
      );
    }

  }

  const existeVehiculo = async (id = '') =>{

    const existeProd = await Vehiculo.findById(id);

    if (!existeProd) {
      throw new Error(
        `El vehiculo: ${id}, no está registrada en la base de datos`
      );
    }

  }
  const existeSubasta = async (id = '') =>{

    const existeProd = await Subasta.findById(id);

    if (!existeProd) {
      throw new Error(
        `La subasta: ${id}, no está registrada en la base de datos`
      );
    }

  };

  const existePuja = async (id = '') =>{

    const existeProd = await Puja.findById(id);

    if (!existeProd) {
      throw new Error(
        `La puja: ${id}, no está registrada en la base de datos`
      );
    }

  };

  const coleccionesPermitidas = (coleccion='',colecciones =[])=>{

      const incluida = colecciones.includes(coleccion);
    if (!incluida) {
      throw new Error('La coleccion no es permitida');
    }
    return true;
  }

  

module.exports = {
  esRoleValido,
  correoExiste,
  usuarioPorIdExiste,
  existeCategoria,
  existeVehiculo,
  nombreUsuarioExiste,
  existeSubasta,
  existePuja,
  coleccionesPermitidas
 
};

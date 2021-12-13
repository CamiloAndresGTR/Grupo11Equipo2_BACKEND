const { Categoria,Role,Usuario,Vehiculo } = require("../models");


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

module.exports = {
  esRoleValido,
  correoExiste,
  usuarioPorIdExiste,
  existeCategoria,
  existeVehiculo,
  nombreUsuarioExiste
};

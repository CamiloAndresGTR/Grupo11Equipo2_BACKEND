const { response } = require("express");
const { Categoria } = require("../models");

//obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
  
    const [total, categorias] = await Promise.all([
      Categoria.countDocuments(query),
      Categoria.find(query)
                .populate('usuario', 'correo')
                .skip(Number(desde))
                .limit(Number(limite)),
    ]);
    res.json({
      total,
      categorias,
    });
  };

//obtenerCategoria - populate {}

const obtenerCategoria = async (req = request, res = response) => {
    
    const {id} = req.params;
  const categoria =await  Categoria.findById(id)
                                     .populate('usuario', 'correo');
    
    res.json(categoria);
  };


const crearCategoria = async (req, res= response) =>{

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDb = await Categoria.findOne({nombre});
    if (categoriaDb) {
        return res.status(400).json({
            msg: `La Categoría: ${categoriaDb.nombre}, ya está registrada en la base de datos`

        });
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = await Categoria(data);
    categoria.save();

    res.status(201).json(categoria);
}

//actualizarCategoria
const actualizarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const {estado, usuario, ...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const categoriaPut = await Categoria.findByIdAndUpdate(id, data, {new:true});
    res.json(categoriaPut);
  };

//borrarCategoria - lógico 
const borrarCategoria = async (req, res = response) => {

    const {id} = req.params;
   
    //Borrado Físico
    //const usuario = await Usuario.findByIdAndDelete(id);
  
    //Borrado lógico
    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false});
    const usuarioAutenticado = req.usuario;
  
    res.json({categoria, usuarioAutenticado});
  };


module.exports= {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}
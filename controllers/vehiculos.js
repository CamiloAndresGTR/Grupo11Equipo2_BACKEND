const { response } = require("express");
const { Vehiculo } = require("../models");

//obtenerVehiculos - paginado - total - populate
const obtenerVehiculos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
  
    const [total, vehiculos] = await Promise.all([
      Vehiculo.countDocuments(query),
      Vehiculo.find(query)
                .populate('usuario', 'correo')
                .populate('categoria', 'nombre')
                .skip(Number(desde))
                .limit(Number(limite)),
    ]);
    res.json({
      total,
      vehiculos,
    });
  };

//obtenerProducto - populate {}

const obtenerVehiculo = async (req = request, res = response) => {
    
    const {id} = req.params;
  const vehiculo =await  Vehiculo.findById(id)
                                     .populate('usuario', 'correo')
                                     .populate('categoria', 'nombre');
    
    res.json(vehiculo);
  };


const crearVehiculo = async (req, res= response) =>{

    const {estado, usuario,...body} = req.body;
    const nombre = req.body.nombre.toUpperCase();
    const vehiculoDb = await Vehiculo.findOne({nombre});
    if (vehiculoDb) {
        return res.status(400).json({
            msg: `El producto: ${vehiculoDb.nombre}, ya está registrada en la base de datos`

        });
    }

    //Generar la data a guardar   
    const data = {
        nombre,
        modeloYear: req.body.modeloYear,
        precio: req.body.precio,
        usuario: req.usuario._id,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion
        
    }
    
    const vehiculo = await Vehiculo(data);
    vehiculo.save();

    res.status(201).json(vehiculo);
}

//actualizarProducto
const actualizarVehiculo = async (req, res = response) => {
    const { id } = req.params;
    const {estado, usuario, ...data} = req.body;
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    
    data.usuario = req.usuario._id;
    const vehiculoPut = await Vehiculo.findByIdAndUpdate(id, data, {new:true});
    res.json(vehiculoPut);
  };

//borrarProducto - lógico 
const borrarVehiculo = async (req, res = response) => {

    const {id} = req.params;
   
    const vehiculo = await Vehiculo.findByIdAndUpdate(id,{estado:false});
    const usuarioAutenticado = req.usuario;
  
    res.json({vehiculo, usuarioAutenticado});
  };


module.exports= {
     obtenerVehiculos,
     crearVehiculo,
     obtenerVehiculo,
     actualizarVehiculo,
     borrarVehiculo
}
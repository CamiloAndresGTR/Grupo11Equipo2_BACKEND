const { response } = require("express");
const { Subasta } = require("../models");
const vehiculo = require("../models/vehiculo");

const obtenerSubastas = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
  
    const [total, subastas] = await Promise.all([
      Subasta.countDocuments(query),
      Subasta.find(query)
                .populate('usuario', 'correo')
                .populate('categoria', 'nombre')
                .populate('vehiculo', 'nombre, precioIni , modeloYear, precioFin')
                .skip(Number(desde))
                .limit(Number(limite)),
    ]);
    res.json({
      total,
      subastas,
    });
};
const obtenerSubasta = async (req = request, res = response) => {

    const {id} = req.params;
    const subasta =await  Subasta.findById(id)
                                     .populate('usuario', 'correo')
                                     .populate('categoria', 'nombre')
                                     .populate('vehiculo', 'nombre, precioIni , modeloYear, precioFin');
    
    res.json(subasta);
};

const crearSubasta = async (req, res= response) =>{
    const {estado, usuario,...body} = req.body;
    const identificador = req.body.identificador;

    const subastaDb = await Subasta.findOne({identificador});
    if (subastaDb) {
        return res.status(400).json({
            msg: `La subasta: ${subastaDb.identificador}, ya está registrada en la base de datos`

        });
    }

    const data ={
        identificador,
        fechaInicio: req.body.fechaInicio,
        fechaFin: req.body.fechaFin,
        descripcion: req.body.descripcion,
        usuario: req.usuario._id,
        categoria: req.body.categoria,
        vehiculo: req.body.vehiculo,
    }
    const subasta = await Subasta(data);
    subasta.save();
    res.status(201).json(subasta);

};

const actualizarSubasta =async (req, res = response) => {
    const { id } = req.params;
    const {estado, usuario, ...data} = req.body;
        
    data.usuario = req.usuario._id;
    const subastaPut = await Subasta.findByIdAndUpdate(id, data, {new:true});
    res.json(subastaPut);
  };

  const borrarSubasta = async (req, res = response) => {

    const {id} = req.params;
   
    const subasta = await Subasta.findByIdAndUpdate(id,{estado:false});
    const usuarioAutenticado = req.usuario;
  
    res.json({subasta, usuarioAutenticado});
  };



module.exports = {
    crearSubasta,
    obtenerSubastas,
    obtenerSubasta,
    actualizarSubasta,
    borrarSubasta
}
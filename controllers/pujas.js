const { response } = require("express");
const { Puja, Vehiculo, Subasta } = require("../models");


const obtenerPujas = async (req = request, res = response) => {
        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };
        
        const [total, pujas] = await Promise.all([
          
          Puja.countDocuments(query),
          Puja.find(query)
                    .populate('usuario', 'correo')
                    .populate('subasta', 'identificador')
                    .skip(Number(desde))
                    .limit(Number(limite)),
        ]);
        res.json({
          total,
          pujas,
        });
};
    
const obtenerPuja = async (req = request, res = response) => {
    
    const {id} = req.params;
  const puja =await  Puja.findById(id)
                                     .populate('usuario', 'correo')
                                     .populate('subasta', 'identificador');
    
    res.json(puja);
  };

  const obtenerPujaBySubasta = async (req = request, res = response) => {
    
    const {subasta} = req.params;

  const pujas =await  Puja.find({subasta})
                                     .populate('usuario', 'correo')
                                     .populate('subasta', 'identificador');
    
    res.json(pujas);
  };

const crearPuja = async (req, res= response) =>{

    const {usuario,subasta,...body} = req.body;

    //Generar la data a guardar   
    const data = {
        monto: req.body.monto,
        usuario: req.usuario._id,
        subasta
        
    }
    const subastaDb = await Subasta.findById(subasta).populate(
        "vehiculo"
      );
    const dataVehiculo = {
        precioAnterior: subastaDb.vehiculo.precioFin,
        precioFin:data.monto
    }        
    const vehiculoDb = await Vehiculo.findByIdAndUpdate(subastaDb.vehiculo._id,dataVehiculo);
 
    const puja = await Puja(data);
    puja.save();

    res.status(201).json(puja);
}


const borrarPuja = async (req, res = response) => {

    const {id} = req.params;
    const pujaAnt = await Puja.findById(id)
                            .populate('subasta');
    
    const vehiculo = await Vehiculo.findById(pujaAnt.subasta.vehiculo);
    console.log(pujaAnt.monto,vehiculo.precioFin,pujaAnt.estado );
     if ((pujaAnt.monto == vehiculo.precioFin)&&(pujaAnt.estado)) {
         console.log('Orale');
         const dataVehiculo = {
             precioFin: vehiculo.precioAnterior
         }
         await Vehiculo.findByIdAndUpdate(pujaAnt.subasta.vehiculo._id,dataVehiculo);
         
     }
   
    
    const puja = await Puja.findByIdAndUpdate(id,{estado:false});
    const usuarioAutenticado = req.usuario;
  
    res.json({pujaAnt, usuarioAutenticado});
  };

module.exports= {
    crearPuja,
    obtenerPujas,
    obtenerPuja,
    obtenerPujaBySubasta,
    borrarPuja

}
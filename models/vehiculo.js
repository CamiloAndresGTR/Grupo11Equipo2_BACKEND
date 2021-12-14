const { Schema, model } = require("mongoose");

const VehiculoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  precioIni: {
      type:Number,
      default: 0
  },
  modeloYear: {
    type:String,
    required: true,
},
  precioFin: {
    type:Number,
    default: 0
},
precioAnterior: {
  type:Number,
  default: 0
},
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  descripcion:{
      type: String
  },
  disponible:{
      type: Boolean,
      default: true
  }
});

VehiculoSchema.methods.toJSON = function () {
  const { __v, _id, estado, ...data } = this.toObject();
  data.uid = _id;
  return data;
};
module.exports = model("Vehiculo", VehiculoSchema);

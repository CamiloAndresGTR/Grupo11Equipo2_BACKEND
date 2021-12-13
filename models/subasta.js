const { Schema, model } = require("mongoose");

const SubastaSchema = Schema({
  identificador: {
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
  vehiculo: {
    type: Schema.Types.ObjectId,
    ref: "Vehiculo",
    required: true,
  },
  fechaInicio: {
    type: Date,
    required: true,
  },
  fechaFin: {
    type: Date,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  descripcion: {
    type: String,
  },

});

SubastaSchema.methods.toJSON = function () {
  const { __v, _id, estado, ...data } = this.toObject();
  data.uid = _id;
  return data;
};
module.exports = model("Subasta", SubastaSchema);

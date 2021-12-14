const { Schema, model } = require("mongoose");


const PujaSchema = Schema({
    monto: {
      type: Number,
      required: [true, "El nombre es obligatorio"],
      
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
    subasta: {
        type: Schema.Types.ObjectId,
        ref: "Subasta",
        required: true,
      },


  });
  
  PujaSchema.methods.toJSON = function () {
    const { __v, _id, estado, ...data } = this.toObject();
    data.uid = _id;
    return data;
  };
  module.exports = model("Puja", PujaSchema);
  

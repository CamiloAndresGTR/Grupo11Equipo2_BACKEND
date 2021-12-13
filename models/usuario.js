const {Schema, model} = require('mongoose');



const UsuarioSchema = Schema({
    nombres:{
        type: String,
        required: [true, 'Es requerido el nombre']
    },
    apellidos: {
        type: String,
        required: [true, 'El apellido es requerido']
    },
    documento:{
        type: String,
        required: [true, 'Es requerido el documento']
    },
    
    correo: {
        type: String,
        required: [true, 'Es requerido el correo'],
        unique: true
    },
    nombreUsuario: {
        type: String,
        required: [true, 'Es requerido el nombre de usuario'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'la contraseña es requerida']
    },
    sexo:{
        type: String,
        
    },
    fechaNacimiento:{
        type: Date
    },
    rol:{
        type: String,
        enum: ['ADMIN', 'EMPLOYEE', 'USER'],
        default : 'USER'
    },
    estado:{
        type: Boolean,
        default: true
    },
});

UsuarioSchema.methods.toJSON = function(){
    const {__v, password,_id,...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);
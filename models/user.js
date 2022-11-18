const { Schema, model  } = require('mongoose');

const UsuarioSchema = Schema({
  name: {
    type: String,
    required:[true,'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique:true    
  },
  password: {
    type: String,
    required: [true, 'El password es obligatorio'],    
  },
  imagen: {
    type: String,    
  },
  rol: {
    type: String,    
    required: [true, 'El rol es obligatorio'],    
    enum:['ADMIN_ROLE','USER_ROLE']
  },
  state: {
    type: Boolean,    
    default:true
  },
  google: {
    type: Boolean,    
    default:false
  },
})

module.exports= model('User',UsuarioSchema)
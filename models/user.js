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
    enum:['ADMIN_ROL','USER_ROL']
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

UsuarioSchema.methods.toJSON=function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
}

module.exports= model('User',UsuarioSchema)
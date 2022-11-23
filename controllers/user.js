const { response, request } = require('express');
const User = require('../models/user'); 
const bcrypt = require('../helpers/bcrypt')

const usuariosGet = async (req, res) => {
      const { limite=3, desde=0 } = req.query;
      const [total,users] = await Promise.all([
            User.countDocuments({ state: true }),
            User.find({state:true})
            .skip(Number(desde))    
            .limit(Number(limite))     
      ])
      res.status(200).json({
         total,
         users,              
         msg: 'listado de usuarios'
      });
}

const usuariosPost = async (req, res) => {
      const { name, email, password, rol } = req.body;
      //encriptar psw
        const passwordHash = await bcrypt.hashPassword(password);
        const user = new User({ name, email, password: passwordHash, rol });
        const newUser = await user.save();
        res.status(200).json({
                  newUser,
                  msg: 'usuario Creado'
        });      
}    

const usuariosPut = async (req, res) => {
      const id = req.params.id
      const { _id,password, google,email, ...resto } = req.body;
      if (password) {
            const passwordHash = await bcrypt.hashPassword(password); 
            resto.password = passwordHash;
      }
      const usuario = await User.findByIdAndUpdate(id, resto);      
      res.status(200).json({
         usuario,
         msg: 'El usuario fue actualizado'
      });
}

const usuariosPatch = (req, res) => {
      res.status(200).json({
         msg: 'Patch API - controlador'
      });
}

const usuariosDelete = async (req, res) => {
      const id = req.params.id
      // const userDelete = await User.findByIdAndDelete(id);
      const usuario = await User.findByIdAndUpdate(id, {state:false});  
      res.status(200).json({
         usuario, 
         msg: 'user dado de baja'
      });
}
    
module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}
const { response } = require('express');

const usuariosGet = (req, res) => {
  const params = req.query;

  res.status(200).json({
        params,
         msg: 'get API - controlador'
      });
}

const usuariosPost = (req, res) => {
  const { nombre, edad, profesion } = req.body;
  
  res.status(200).json({
        infoPersona: {nombre, edad, profesion } ,
         msg: 'post API - controlador'
      });
}

const usuariosPut = (req, res) => {
      const id=req.params.id
  res.status(200).json({
         id,
         msg: 'Put API - controlador'
      });
}

const usuariosPatch = (req, res) => {
      res.status(200).json({
         msg: 'Patch API - controlador'
      });
}

const usuariosDelete = (req, res) => {
      res.status(200).json({
         msg: 'delete API - controlador'
      });
}
    
module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}
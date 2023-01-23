const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //True  
  if (esMongoId) {
    const user = await User.findById(termino);
    return res.json({
      results: user ? [user] : [],
    });
  }
  const regex=new RegExp(termino,'i')
  const users=await User.find({
    $or:[{name:regex},{email:regex}],
    $and:[{state:true}]  
    });
  res.json({
    results:users
  })
};

const buscarCategorias = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //True  
  if (esMongoId) {
    const categoria = await Category.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }
  const regex=new RegExp(termino,'i')
  const categorias=await Category.find({
       name:regex,state:true  
    });
  res.json({
    results:categorias
  })
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //True  
  if (esMongoId) {
    const producto = await Product.findById(termino);
    return res.json({
      results: producto ? [producto] : [],
    });
  }
  const regex=new RegExp(termino,'i')
  const productos=await Product.find({
       name:regex,available:true  
    });
  res.json({
    results:productos
  })
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas} `,
    });
  }
  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino,res);
      break;
    case "productos":
      buscarProductos(termino,res);
      break;
    default:
      res.status(500).json({
        msg: "Seme olvido hacer esta busqueda",
      });
      break;
  }
};

module.exports = { buscar };

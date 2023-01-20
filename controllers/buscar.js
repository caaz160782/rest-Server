const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");

const coleccionesPermitidas = ["usuarios", "categoria", "productos", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //True
  if (esMongoId) {
    const user = await User.findById(termino);
    return res.json({
      results: user ? [user] : [],
    });
  }
  
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
    case "categoria":
      break;
    case "productos":
      break;
    default:
      res.status(500).json({
        msg: "Seme olvido hacer esta busqueda",
      });
      break;
  }
};

module.exports = { buscar };

const Rol = require('../models/rol');
const User = require('../models/user'); 
const Category=require('../models/category')
const Product=require('../models/product')

const isValidRole = async (rol = '') => {
  const existeRol = await Rol.findOne({ rol });  
  if (!existeRol) {
         throw new Error(`El rol ${rol} no se encuentra en el listado`);
      }
}

const emailExiste = async (email = '') => {
  const findEmail = await User.findOne({ email }).exec();
  if (findEmail) {
         throw new Error(`El email: ${email} ya fue registrado`);
      }
}

const existeUsuarioId = async (id) => {
  const findIdUser = await User.findById( id );
  if (!findIdUser) {
         throw new Error(`El usuario con : ${id} no existe`);
      }
}

const existeCategoryId = async (id) => {
  const findIdCategory = await Category.findById(id);
  if (!findIdCategory) {
         throw new Error(`El Producto con : ${id} no existe`);
      }
}

const existeProductId = async (id) => {
  const findIdProduct = await Product.findById(id);
  if (!findIdProduct) {
         throw new Error(`El Producto con : ${id} no existe`);
      }
}
//validar coleeciones permitidas
const coleccionesPermitidas= (coleccion ="",colecciones=[])=>{
  console.log(coleccion)
  const incluida= colecciones.includes(coleccion);
  if(!incluida){
    throw new Error(`la coleccion ${coleccion} no es permitida, ${colecciones}`)
  }
  return true;
}




module.exports = {
  isValidRole,
  emailExiste,
  existeUsuarioId,
  existeCategoryId,
  existeProductId,
  coleccionesPermitidas
}
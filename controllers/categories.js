const { Category } = require('../models'); 



const catregoriesGet = async (req, res) => {
   
      res.status(200).json({
         msg: 'listado de categories'
      });
}

const categoriesGetId = async (req, res) => {
   
      res.status(200).json({
         msg: 'listado de categories id'
      });
}

const categoriesPost = async (req, res) => {
      // const { name, state, user } = req.body;
      const name = req.body.name.toUpperCase();
      const categoryDB = await Category.findOne({ name });
      if ( categoryDB) {
           return res.status(400).json({
               msg: `Existe una categoria: ${categoryDB.name}`
             });
      }
      const data = {
            name,
            user: req.user._id
      }
     const category = new Category(data);
     const newCategory = await category.save();
      res.status(201).json({
                  newCategory,
                  msg: 'crear categoria'
        });      
}    

const categoriesPut = async (req, res) => {
      res.status(200).json({
           msg: 'modificar categoria'
      });
}

const categoriesDelete = async (req, res) => {
      res.status(200).json({
         usuario, 
         msg: 'categorua dada de baja'
      });
}
    
module.exports = {
   catregoriesGet,
   categoriesGetId,
   categoriesPost,
   categoriesPut,
   categoriesDelete
}
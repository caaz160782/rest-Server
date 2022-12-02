const  Category  = require('../models/category'); 

const catregoriesGet = async (req, res) => {
   
      const getCategories = await Category.find({})
    //.populate("user", ["name"])
      .populate("user", ["name"])    
      res.status(200).json({
         getCategories,   
         msg: 'listado de categories'
      });
}

const categoriesGetId = async (req, res) => {
      const idCategory = req.params.id
      const categoryDB = await Category.findById(idCategory)
            .populate("user", ["name"]);
      res.status(200).json({
         categoryDB,   
         msg: 'listado de categories id' 
      });
}

const categoriesPost = async (req, res) => {
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
      const idCategory = req.params.id
      const name = req.body.name.toUpperCase();      
      const state = req.body.state;      
      const category = await Category.findByIdAndUpdate(idCategory, { name,state},  { new: true });     
      res.status(200).json({
           category, 
           msg: 'modificar categoria'
      });
}

const categoriesDelete = async (req, res) => {
      const idCategory = req.params.id
      const category = await Category.findByIdAndUpdate(idCategory, { state:false},  { new: true });  
      res.status(200).json({
         category, 
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
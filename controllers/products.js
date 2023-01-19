const  Product  = require('../models/product'); 

const productsGet = async (req, res) => {
    const getproducts = await Product.find({})
      
      res.status(200).json({
         getproducts,   
         msg: 'listado de products'
      });
}

const productsGetId = async (req, res) => {
      const idProduct = req.params.id
      const productDB = await Product.findById(idProduct)
            .populate("user", ["name"]);
      res.status(200).json({
         productDB,   
         msg: 'listado de products id' 
      });
}

const productsPost = async (req, res) => {
      const name = req.body.name.toUpperCase();
      const category = req.body.category;
      const productDB = await Product.findOne({ name });
      if ( productDB) {
           return res.status(400).json({
               msg: `Existe una categoria: ${productDB.name}`
             });
      }
      const data = {
            name,
            user: req.user._id,
            category

      }
     const product = new Product(data);
     const newProduct = await product.save();
      res.status(201).json({
                  newProduct,
                  msg: 'crear producto'
     });      
}    

const productsPut = async (req, res) => {
      const idProduct = req.params.id
      const name = req.body.name.toUpperCase();      
      const price = req.body.price;      
      const product = await Product.findByIdAndUpdate(idProduct, { name,price},  { new: true });     
      res.status(200).json({
           product, 
           msg: 'modificar categoria'
      });
}

const productsDelete = async (req, res) => {
      const idProduct = req.params.id
      const product = await Product.findByIdAndUpdate(idProduct, { state:false},  { new: true });  
      res.status(200).json({
        product, 
        msg: 'producto dado de baja'
      });
}
    
module.exports = {
   productsGet,
   productsGetId,
   productsPost,
   productsPut,
   productsDelete
}
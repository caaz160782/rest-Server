const path = require('path');
const fs   = require('fs');
const cloudinary = require('cloudinary').v2

const {response}=require('express');
const { subirArchivo } = require('../helpers');
const {User,Product}=require('../models')

// const ext=['txt','md','pdf'] ; 
const ext=undefined; 
cloudinary.config(process.env.CLOUDINARY_URL)

const cargarArchivo = async (req,res=response)=>{
    // const nameFolder='textos'; 
    const nameFolder='imgs'; 
   try {
      const nameFile=await subirArchivo(req.files,ext,nameFolder);
      res.json({
        nameFile
      })
    } catch (error) {
       res.status(400).json(error);
    }
 }

 const uptdateImage = async (req,res=response)=>{
  const {id,coleccion}=req.params;
  let modelo;
  switch (coleccion) {
    case 'usuarios':
     modelo= await User.findById(id);
        if(!modelo){
          return res.status(400).json({msg:'No existe el usuario'});   
        }
     break;
     case 'productos':
      modelo= await Product.findById(id);
      if(!modelo){
        return res.status(400).json({msg:'No existe el producto'});   
      }
      
   break;
    default:
       return res.status(500).json({msg:'Se me olvido validar esto'});
    break;
  }
  //Limpiar imagenes previas
    if(modelo.image){
      //borrar imagen del server      
     const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.image)
     if(fs.existsSync(pathImagen)){
       fs.unlinkSync(pathImagen);
     }
    }

  const nameFile=await subirArchivo(req.files,ext,coleccion);
  modelo.image=nameFile;
  await modelo.save();
  res.json(modelo);

}

const getImage = async (req,res=response)=>{
  const {id,coleccion}=req.params;
  let modelo;
  switch (coleccion) {
    case 'usuarios':
     modelo= await User.findById(id);
        if(!modelo){
          return res.status(400).json({msg:'No existe el usuario'});   
        }
     break;
     case 'productos':
      modelo= await Product.findById(id);
      if(!modelo){
        return res.status(400).json({msg:'No existe el producto'});   
      }
      
   break;
    default:
       return res.status(500).json({msg:'Se me olvido validar esto'});
    break;
  }
  //Limpiar imagenes previas
    if(modelo.image){
     //  const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.image)
     //  if(fs.existsSync(pathImagen)){
     //     return res.sendFile(pathImagen);
     //  }
     return res.status(200).json({
      url: modelo.image,
      msg: 'ruta'
       });     
    }  
   const pathImagen=path.join(__dirname,'../assets/no-image.jpg');
   return res.sendFile(pathImagen);
 
}

const uptdateImageCloudinary = async (req,res=response)=>{
  const {id,coleccion}=req.params;
  let modelo;
  switch (coleccion) {
    case 'usuarios':
     modelo= await User.findById(id);
        if(!modelo){
          return res.status(400).json({msg:'No existe el usuario'});   
        }
     break;
     case 'productos':
      modelo= await Product.findById(id);
      if(!modelo){
        return res.status(400).json({msg:'No existe el producto'});   
      }
      
   break;
    default:
       return res.status(500).json({msg:'Se me olvido validar esto'});
    break;
  }
  //Limpiar imagenes previas
    if(modelo.image){
      //borrar imagen del cloudinary
      const nombreArr=modelo.image.split('/');
      const nombre   =nombreArr[nombreArr.length -1];
      const [public_id] =nombre.split('.');
      await cloudinary.uploader.destroy(public_id);
   }

  const {tempFilePath}=req.files.archivo;
  const {secure_url}= await  cloudinary.uploader.upload(tempFilePath)
  
  modelo.image=secure_url;
  await modelo.save();
  res.json(modelo);

}

module.exports={
    cargarArchivo,
    uptdateImage,
    getImage,
    uptdateImageCloudinary
}
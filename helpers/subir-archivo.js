
const path= require('path');
const { v4: uuidv4 } = require('uuid');

const extensiones=['png','jpg','jpeg','gif']
const subirArchivo =(files,extensionesValidas=extensiones,carpeta='')=>{

    return new Promise( (resolve,reject)=>{
     const{archivo} = files;  
     const nameShort= archivo.name.split('.');
     const extension= nameShort[nameShort.length - 1];
      
     if(!extensionesValidas.includes(extension)){
       return reject(`La extension  ${extension} no es permitada:${extensionesValidas}`);
    }
     
     const nameTemp =uuidv4() + '.'+extension;
     
     const uploadPath =path.join(__dirname, '../uploads/',carpeta,nameTemp);  
     archivo.mv(uploadPath, (err)=> {
       if (err) {
        reject(err);         
       }
       resolve(nameTemp)
     });
    });
}

module.exports ={
    subirArchivo
}
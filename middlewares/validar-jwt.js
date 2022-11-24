const User = require('../models/user'); 
const jwt = require("../helpers/jwt");


const validarJWT =async (req,res,next) => {  
  const token  = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg:'No hay token en la petición'
    })
  }
  try {
    const {sub} = await jwt.verify(token);   
    const user = await User.findById(sub);
    
    if (!user) {
       return res.status(401).json({
      msg:'Token no valido'
       })
    }     
    if (!user.state) {
       return res.status(401).json({
      msg:'Token no valido'
    })
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      msg:'token no valido'
    })
  }
  
}

module.exports = {
  validarJWT
};

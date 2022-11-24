const User = require('../models/user'); 
const bcrypt = require('../helpers/bcrypt');
const jwt = require("../helpers/jwt");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return   res.status(400).json({         
         msg: 'el usuario/password no es correcto'
     });
    }
    if (!usuario.state) {
      return   res.status(400).json({         
         msg: 'el usuario/password no es correcto'
     });
    }

    const validaPassword = await bcrypt.verifyPassword(password, usuario.password);
    if (!validaPassword) {
        return   res.status(400).json({         
         msg: 'el usuario/password no es correcto'
     });
    }
    const payload = {
                       sub: usuario._id.toString(),                         
                       rol:usuario.rol, 
                     }  
    const token = await jwt.token(payload)    
    res.status(200).json({         
         usuario,
         token,
         msg: 'ok login'
     });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Contacte con su administrador'
    });
  }

 
}

module.exports = {
login
}
const User = require('../models/user'); 
const bcrypt = require('../helpers/bcrypt');
const jwt = require("../helpers/jwt");
const {googleVerify} =require("../helpers/google-verify")

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

const googleSignIn = async (req, res) => {
  const { id_token } = req.body;

  try {
    const { name, imagen,email } =await googleVerify(id_token);
    //const googleUser=await googleVerify(id_token);
    let user = await User.findOne({ email });
    if (!user) {
      const data = {
        name,
        imagen,
        email,
        password: ':P',
        google: true,
        rol:"ADMIN_ROL"
      };
      user = new User(data);
      await user.save();
    }

    if (!user.state) {
      return res.status(400).json({
      msg: 'Hable con el admin, user bloqueado'
     });   
    }

    const payload = {
                       sub:user._id.toString(),                         
                       rol:user.rol, 
                     }  
    const token = await jwt.token(payload)    


    res.status(200).json({
      token,
      email,
    msg: 'todo bien'
    });  
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: 'El token no se pudo verificar'
    }); 
  }

  
  
}

module.exports = {
login,googleSignIn
}
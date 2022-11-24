const isAdminRol =async (req,res,next) => {  
  
  if (!req.user) {
    return res.status(500).json({
      msg: 'Se requiere verificar el role sin validar el token primero'
    });
  }
  const { rol, name } = req.user
  if (rol !== 'ADMIN_ROL') {
    return res.status(401).json({
      msg:`${name} no es administrador`
    });
  }
}

const tieneRol = (...roles) => {  
  
  return (req, res, next) => {
      if (!req.user) {
        return res.status(500).json({
        msg: 'Se requiere verificar el role sin validar el token primero'
       });
     }
    
    if (!roles.includes(req.user.rol)) {
        return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`
       });
    }
    next();
  }

}


module.exports = {
  isAdminRol,
  tieneRol
};

const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet,
   usuariosPost,
   usuariosPut,
   usuariosPatch,
   usuariosDelete
} = require('../controllers/user');
const {
   validarCampos,
   validarJWT,
   isAdminRol,
   tieneRol } = require('../middlewares');
const { isValidRole, emailExiste, existeUsuarioId } = require('../helpers/db-validators');
const router = Router();

router.get('/', usuariosGet);

router.post('/', [
   check('name', 'Se requiere el nombre').not().isEmpty(),
   check('password', 'El password debe tener más de 6 letras').isLength({ min: 6 }),
   check('email', 'El email no es correcto').isEmail(),
   check('email').custom(emailExiste),
   //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
   check('rol').custom(isValidRole),
   validarCampos
],usuariosPost);

router.put('/:id', [
   check('id', 'No es un Id valido').isMongoId(),
   check('id').custom(existeUsuarioId),
   check('rol').custom(isValidRole),
   validarCampos
], usuariosPut);
    
router.patch('/',usuariosPatch );
   
router.delete('/:id', [
   validarJWT,
   //isAdminRol,
   tieneRol('ADMIN_ROL','VENTAS_ROL'),
   check('id', 'No es un Id valido').isMongoId(),
   check('id').custom(existeUsuarioId),   
   validarCampos
],usuariosDelete);  


module.exports = router;
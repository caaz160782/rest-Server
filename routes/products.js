const { Router } = require('express');
const { check } = require('express-validator');
const {
    productsGet,
    productsGetId,
    productsPost,
    productsPut,
    productsDelete
} = require('../controllers/products');

const {
   validarJWT,
   validarCampos,
} = require('../middlewares');
const { existeProductId} = require('../helpers/db-validators');   
const router = Router();

router.get('/' ,productsGet);

router.get('/:id', [
   check('id', 'No es un Id valido').isMongoId(),
   check('id').custom(existeProductId),
   validarCampos], productsGetId);

router.post('/', [
   validarJWT,
   check('name', 'Se requiere el nombre').not().isEmpty(),
   validarCampos
],productsPost);

router.put('/:id', [
    validarJWT,
   check('id', 'No es un Id valido').isMongoId(),
   check('id').custom(existeProductId),
   validarCampos]
 , productsPut);
    
  
router.delete('/:id', [ validarJWT,
   check('id', 'No es un Id valido').isMongoId(),
   check('id').custom(existeProductId),
   validarCampos],productsDelete);  


module.exports = router;
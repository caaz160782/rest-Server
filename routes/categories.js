const { Router } = require('express');
const { check } = require('express-validator');
const {
   catregoriesGet,
   categoriesGetId,
   categoriesPost,
   categoriesPut,
   categoriesDelete
} = require('../controllers/categories');

const {
   validarJWT,
   validarCampos,
} = require('../middlewares');
const { existeCategoryId} = require('../helpers/db-validators');   
const router = Router();

router.get('/' ,catregoriesGet);

router.get('/:id', [
   check('id', 'No es un Id valido').isMongoId(),
   check('id').custom(existeCategoryId),
   validarCampos], categoriesGetId);

router.post('/', [
   validarJWT,
   check('name', 'Se requiere el nombre').not().isEmpty(),
   validarCampos
],categoriesPost);

router.put('/:id', [
    validarJWT,
   check('id', 'No es un Id valido').isMongoId(),
   check('id').custom(existeCategoryId),
   validarCampos]
 , categoriesPut);
    
  
router.delete('/:id', [ validarJWT,
   check('id', 'No es un Id valido').isMongoId(),
   check('id').custom(existeCategoryId),
   validarCampos],categoriesDelete);  


module.exports = router;
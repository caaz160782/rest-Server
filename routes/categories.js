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
const router = Router();

router.get('/', catregoriesGet);

router.get('/:id' ,categoriesGetId);

router.post('/', [
   validarJWT,
   check('name', 'Se requiere el nombre').not().isEmpty(),
   validarCampos
],categoriesPost);

router.put('/:id'
 , categoriesPut);
    
  
router.delete('/:id',categoriesDelete);  


module.exports = router;
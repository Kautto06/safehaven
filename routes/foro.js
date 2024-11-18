// expertosRoutes.js
const express = require('express');
const router = express.Router();
const foroController = require('../controllers/foro');

router.get('/ordenar', foroController.obtenerForoPaginado);

router.get('/detalles/:id', foroController.obtenerDetallesPost); 

router.get('/', foroController.obtenerForoHome);

router.post('/crear', [
    check('Contenido', 'El contenido es obligatorio').not().isEmpty(),
    check('Titulo', 'El título es obligatorio').not().isEmpty(),
    check('ID_Usuario', 'El ID del usuario es obligatorio').not().isEmpty(),
    validarJWT,          
    validarCampos        
], foroController.crearForo);


router.delete('/eliminar/:id', [
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarPublicacionExistente), 
    validarJWT,          
    validarCampos        
], foroController.eliminarForo);

router.put('/actualizar/:id', [
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarPublicacionExistente), 
    check('Contenido', 'El contenido es obligatorio').not().isEmpty(),
    check('Titulo', 'El título es obligatorio').not().isEmpty(),
    check('ID_Usuario', 'El ID del usuario es obligatorio').not().isEmpty(),
    validarJWT,          
    validarCampos        
], foroController.actualizarForo);



module.exports = router;

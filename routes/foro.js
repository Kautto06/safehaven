// expertosRoutes.js
const express = require('express');
const router = express.Router();
const foroController = require('../controllers/foro');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarPublicacionExistente} = require('../helpers/db-validator');




router.get('/ordenar', foroController.obtenerForoPaginado);

// Ruta para obtener los detalles de un post específico
router.get('/detalles/:id', foroController.obtenerDetallesPost);  

router.post('/like/:id', foroController.manejarLikeIncrement);

// Ruta para eliminar un like
router.post('/remove/:id', foroController.manejarLikeDecrement);

router.post('/crear', foroController.crearPublicacion);

router.get('/', foroController.obtenerForoHome);

router.get('/all',foroController.obtenerPublicaciones)

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

// expertosRoutes.js
const express = require('express');
const { check } = require('express-validator');
console.log('Check:', check);
const router = express.Router();
const expertosController = require('../controllers/experts');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarExpertoExistente } = require('../helpers/db-validator');

// Ruta para obtener todos los expertos
router.get('/todos', expertosController.obtenerExpertos);
router.get('/paginado', expertosController.obtenerExpertosPaginado);
router.get('/detalles/:id', expertosController.obtenerDetallesExperto); 

// Ruta para obtener un experto por ID
router.get('/:id', expertosController.obtenerExpertoPorId);

// Ruta para crear un nuevo experto
router.post('/crear', [
    check('First_Name', 'El nombre es obligatorio').not().isEmpty(),
    check('Last_Name', 'El apellido es obligatorio').not().isEmpty(),
    check('Telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('Email', 'El correo es obligatorio').isEmail(),
    check('Genero', 'El género es obligatorio').not().isEmpty(),
    check('Ocupación', 'La ocupación es obligatoria').not().isEmpty(),
    check('Modalidad_Atencion', 'La modalidad de atención es obligatoria').not().isEmpty(),
    validarJWT,          // Middleware de autenticación
    validarCampos        // Middleware para manejar errores de validación
], expertosController.crearExperto);

// Ruta para actualizar un experto por ID
router.put('/actualizar/:id', [
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarExpertoExistente), 
    check('First_Name', 'El nombre es obligatorio').not().isEmpty(),
    check('Last_Name', 'El apellido es obligatorio').not().isEmpty(),
    check('Telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('Email', 'El correo es obligatorio').isEmail(),
    check('Genero', 'El género es obligatorio').not().isEmpty(),
    check('Ocupación', 'La ocupación es obligatoria').not().isEmpty(),
    check('Modalidad_Atencion', 'La modalidad de atención es obligatoria').not().isEmpty(),
    validarJWT,          // Middleware de autenticación
    validarCampos        // Middleware para manejar errores de validación
], expertosController.actualizarExperto);

// Ruta para eliminar un experto por ID
router.delete('/eliminar/:id', [
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarExpertoExistente), 
    validarJWT,
    validarCampos  
], expertosController.eliminarExperto); 



module.exports = router;

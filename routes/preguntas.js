const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { eliminarPregunta, actualizarPregunta, crearPregunta, getPreguntas,getOpcionesPorPregunta,incrementarFrecuenciaOpcion } = require('../controllers/preguntas');
const { validarPreguntaExistente } = require('../helpers/db-validator');

const preguntasController = require('../controllers/preguntas');


const router = Router();

// Ruta para obtener las preguntas (con validación JWT)
router.get('/', [
  validarJWT,
  validarCampos
], getPreguntas);

router.get('/obtener/', preguntasController.getPreguntas);

// Ruta para crear una nueva pregunta (con validación JWT)
router.post('/crear', [
  check('pregunta', 'El contenido de la pregunta es obligatorio').not().isEmpty(),
  validarJWT,
  validarCampos
], crearPregunta);

// Ruta para actualizar una pregunta (con validación JWT)
router.put('/actualizar/:id', [
  check('id')
    .isInt().withMessage('El ID debe ser un número entero.')
    .custom(validarPreguntaExistente), 
  check('pregunta', 'El contenido de la pregunta es obligatorio').not().isEmpty(),
  validarJWT,
  validarCampos
], actualizarPregunta);

// Ruta para eliminar una pregunta (con validación JWT)
router.delete('/eliminar/:id', [
  check('id')
    .isInt().withMessage('El ID debe ser un número entero.')
    .custom(validarPreguntaExistente), 
  validarJWT,
  validarCampos
], eliminarPregunta);

router.get('/preguntas-con-opciones', preguntasController.getPreguntasConOpciones);



module.exports = router;

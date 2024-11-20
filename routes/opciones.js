const {Router}= require('express')
const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos')
const { check } = require('express-validator')
const { getPreguntas, crearOpcion, actualizarOpcion, eliminarOpcion, eliminarOpcionesPorPregunta } = require('../controllers/opciones')

const opcionesController = require('../controllers/opciones');

const router = Router()

router.get('/',[
    validarJWT,
    validarCampos
],getPreguntas)

router.post('/crear',[
    check('opcion','el contenido de la opcion es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
],crearOpcion)

router.put('/actualizar/:id',[
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarOpcionExistente), 
    check('opcion','el contenido de la opcion es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
],actualizarOpcion)

router.delete('/eliminar/:id',[
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarOpcionExistente), 
    validarJWT,
    validarCampos
],eliminarOpcion)

router.delete('/eliminarPorPregunta/:id',[
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarPreguntaExistente), 
    validarJWT,
    validarCampos
],eliminarOpcionesPorPregunta)

router.put('/incrementar/:id', preguntasController.incrementarFrecuenciaOpcion);

module.exports = router
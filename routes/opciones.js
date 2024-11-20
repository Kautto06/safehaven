const {Router}= require('express')
const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos')
const { check } = require('express-validator')
const { crearOpcion, actualizarOpcion, eliminarOpcion, eliminarOpcionesPorPregunta, getOpcionesPorPregunta, getOpciones, getOpcionesPorId } = require('../controllers/opciones')
const { validarOpcionExistente, validarPreguntaExistente } = require('../helpers/db-validator')

const preguntasController = require('../controllers/preguntas')

const router = Router()

router.get('/',[
    validarJWT,
    validarCampos
],getOpciones)

router.get('/:id',[
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarOpcionExistente), 
    validarJWT,
    validarCampos
],getOpcionesPorId)

router.get('/pregunta/:id',[
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarPreguntaExistente), 
    validarJWT,
    validarCampos
],getOpcionesPorPregunta)

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


module.exports = router
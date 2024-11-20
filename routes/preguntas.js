const {Router}= require('express')
const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos')
const { check } = require('express-validator')
const { eliminarPregunta, actualizarPregunta, crearPregunta, getPreguntas, getPreguntasPorId } = require('../controllers/preguntas')
const { validarPreguntaExistente } = require('../helpers/db-validator')

const router = Router()

router.get('/',[
    validarJWT,
    validarCampos
],getPreguntas)

router.get('/:id',[
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarPreguntaExistente), 
    validarJWT,
    validarCampos
],getPreguntasPorId)

router.post('/crear',[
    check('pregunta','el contenido de la pregunta es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
],crearPregunta)

router.put('/actualizar/:id',[
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarPreguntaExistente), 
    check('pregunta','el contenido de la pregunta es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
],actualizarPregunta)

router.delete('/eliminar/:id',[
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarPreguntaExistente), 
    validarJWT,
    validarCampos
],eliminarPregunta)


module.exports = router

const {Router}= require('express')
const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos')
const { check } = require('express-validator')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento, getEventoPorId } = require('../controllers/eventos')
const { validarEventoExistente } = require('../helpers/db-validator')

const router = Router()

router.get('/',[
    validarJWT,
    validarCampos
],getEventos)

router.post('/crear',[
    check('Titulo_Evento')
      .not().isEmpty().withMessage('El título del evento es obligatorio.')
      .isLength({ max: 100 }).withMessage('El título del evento no debe exceder los 100 caracteres.'),

    check('Tipo')
      .not().isEmpty().withMessage('El tipo del evento es obligatorio.')
      .isLength({ max: 50 }).withMessage('El tipo del evento no debe exceder los 50 caracteres.'),

    check('Fecha')
      .isDate().withMessage('La fecha del evento debe ser una fecha válida en formato YYYY-MM-DD.'),

    check('Horario')
      .isString().withMessage('El horario debe ser una cadena de texto.')
      .matches(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).withMessage('El horario debe tener el formato HH:MM.'),
    validarJWT,
    validarCampos
],crearEvento)

router.put('/actualizar/:id', [
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarEventoExistente), // Usamos la función personalizada para verificar si el evento existe

    check('Titulo_Evento')
        .optional()
        .isLength({ max: 100 }).withMessage('El título del evento no debe exceder los 100 caracteres.'),

    check('Tipo')
        .optional()
        .isLength({ max: 50 }).withMessage('El tipo del evento no debe exceder los 50 caracteres.'),

    check('Fecha')
        .optional()
        .isDate().withMessage('La fecha del evento debe ser una fecha válida en formato YYYY-MM-DD.'),

    check('Horario')
        .optional()
        .matches(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).withMessage('El horario debe tener el formato HH:MM.'),
    validarJWT,
    validarCampos
], actualizarEvento);

router.get('/:id',[
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarEventoExistente),
    validarJWT,
    validarCampos
],getEventoPorId)

router.delete('/eliminar/:id', [
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarEventoExistente), // Usamos la función personalizada para verificar si el evento existe
    validarJWT,
    validarCampos
], eliminarEvento);

module.exports=router;
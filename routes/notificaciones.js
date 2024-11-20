



const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const {
  getNotificaciones,
  crearNotificacion,
  actualizarNotificacion,
  eliminarNotificacion,
  obtenerNotificacionesPaginadas,
  getNotificacionesPorId,
} = require('../controllers/notificaciones');
const { validarNotificacionExistente } = require('../helpers/db-validator');

const router = Router()

router.get('/paginado', obtenerNotificacionesPaginadas);

// Obtener todas las notificaciones
router.get('/', [
  validarJWT,
  validarCampos
], getNotificaciones);

router.get('/:id',[
  check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarNotificacionExistente), 
  validarJWT,
  validarCampos
],getNotificacionesPorId)

// Crear una nueva notificación
router.post('/crear', [
  check('Titulo', 'El título es obligatorio').not().isEmpty(),
  check('Contenido', 'El contenido es obligatorio').not().isEmpty(),
  validarJWT,
  validarCampos,
], crearNotificacion);

// Actualizar una notificación por ID
router.put('/actualizar/:id', [
  check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarNotificacionExistente), 
  check('Titulo', 'El título es obligatorio').optional().not().isEmpty(),
  check('Contenido', 'El contenido es obligatorio').optional().not().isEmpty(),
  check('ID_Usuario', 'El ID del usuario es obligatorio').optional().not().isEmpty(),
  validarJWT,
  validarCampos,
], actualizarNotificacion);

// Eliminar una notificación por ID
router.delete('/eliminar/:id', [
  check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarNotificacionExistente), 
  validarJWT,
  validarCampos,
], eliminarNotificacion);

module.exports = router;

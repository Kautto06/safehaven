const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const {
  getNotificaciones,
  crearNotificacion,
  actualizarNotificacion,
  eliminarNotificacion,
} = require('../controllers/notificaciones');

const router = Router();

// Obtener todas las notificaciones
router.get('/', [
  validarJWT,
  validarCampos
], getNotificaciones);

// Crear una nueva notificación
router.post('/crear', [
  check('Titulo', 'El título es obligatorio').not().isEmpty(),
  check('Contenido', 'El contenido es obligatorio').not().isEmpty(),
  check('ID_Usuario', 'El ID del usuario es obligatorio').not().isEmpty(),
  validarJWT,
  validarCampos,
], crearNotificacion);

// Actualizar una notificación por ID
router.put('/actualizar/:id', [
  check('id', 'El ID debe ser un número entero').isInt(),
  check('Titulo', 'El título es obligatorio').optional().not().isEmpty(),
  check('Contenido', 'El contenido es obligatorio').optional().not().isEmpty(),
  check('ID_Usuario', 'El ID del usuario es obligatorio').optional().not().isEmpty(),
  check('Link', 'El link debe ser una URL válida').optional().isURL(),
  validarJWT,
  validarCampos,
], actualizarNotificacion);

// Eliminar una notificación por ID
router.delete('/eliminar/:id', [
  check('id', 'El ID debe ser un número entero').isInt(),
  validarJWT,
  validarCampos,
], eliminarNotificacion);

module.exports = router;

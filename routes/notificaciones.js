const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificaciones');

router.get('/paginado', notificationsController.obtenerNotificacionesPaginadas);

module.exports = router;
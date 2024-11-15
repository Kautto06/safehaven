// expertosRoutes.js
const express = require('express');
const router = express.Router();
const expertosController = require('../controllers/experts');

// Ruta para obtener todos los expertos
router.get('/', expertosController.obtenerExpertos);


module.exports = router;

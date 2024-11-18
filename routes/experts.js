// expertosRoutes.js
const express = require('express');
const router = express.Router();
const expertosController = require('../controllers/experts');

// Ruta para obtener todos los expertos
router.get('/todos', expertosController.obtenerExpertos);  // Ruta para obtener todos los expertos

// Ruta para obtener expertos paginados
router.get('/paginado', expertosController.obtenerExpertosPaginado);  // Ruta para obtener expertos paginados

// Ruta para obtener los detalles de un experto por su ID
router.get('/detalles/:id', expertosController.obtenerDetallesExperto);  // Ruta para obtener detalles de un experto

module.exports = router;

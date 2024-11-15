// expertosRoutes.js
const express = require('express');
const router = express.Router();
const foroController = require('../controllers/foro');

// Ruta para obtener todas las publicaciones del foro
router.get('/ordenar', foroController.obtenerForoPaginado);

// Ruta para obtener los detalles de un post específico
router.get('/foro/detalles/:id', foroController.obtenerDetallesPost);  // Usamos el controlador directamente

// Ruta para la página principal del foro
router.get('/', foroController.obtenerForoHome);

module.exports = router;

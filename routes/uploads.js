const { Router } = require('express');
const { cargarArchivo, actualizarImagenExpertos } = require('../controllers/uploadsExperts');
const { validarArchivoSubir } = require('../helpers/validar-archivo');
const { actualizarImagenDenuncia, cargarImagenDenuncia } = require('../controllers/uploadsPruebas');

const router = Router();

// Ruta para cargar el archivo
router.post('/experto/:id', validarArchivoSubir, cargarArchivo);

// Ruta para actualizar la imagen de un experto
router.put('/experto/:id', validarArchivoSubir, actualizarImagenExpertos);

router.post('/denuncia', validarArchivoSubir, cargarImagenDenuncia);

// Ruta para actualizar la imagen de una denuncia
router.put('/denuncia/:id', validarArchivoSubir, actualizarImagenDenuncia);

module.exports = router;

const express = require('express');
const router = express.Router();
const actividadController = require('../controllers/actividad');
const {guardarAccion} = require('../controllers/actividad');

router.post('/guardar', async (req, res) => {
    const { idUsuario, tipoAccion, descripcion,id_objeto } = req.body;
  
    if (!idUsuario || !tipoAccion || !descripcion) {
      return res.status(400).json({ mensaje: 'Todos los campos (idUsuario, tipoAccion, descripcion) son requeridos' });
    }
  
    try {
      await guardarAccion(idUsuario, tipoAccion, descripcion,id_objeto);
      res.status(200).json({ mensaje: 'Acción guardada con éxito' });
    } catch (error) {
      console.error('Error al guardar la acción:', error);
      res.status(500).json({ mensaje: 'Error al guardar la acción' });
    }
  });

router.get('/acciones/:email', actividadController.leerAcciones);  
  
  module.exports = router;
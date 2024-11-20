const express = require('express');
const { guardarAutoevaluacion, guardarRespuestas, obtenerNumeroIntento,obtenerDetallesAutoevaluacion } = require('../controllers/autoevaluacion');
const {incrementarFrecuenciaOpcion} = require('../controllers/opciones');
const router = express.Router();

const autController = require('../controllers/autoevaluacion');

// Ruta para guardar la autoevaluación
router.post('/guardar', async (req, res) => {
    const { email } = req.body.user;  // Recibe el email directamente desde el body
    const { respuestas } = req.body;  // Respuestas del usuario
  
    if (!email) {
      return res.status(400).json({ mensaje: 'El correo electrónico del usuario es obligatorio' });
    }
  
    try {
      // Verifica el número de intento del usuario
      const numeroIntento = await obtenerNumeroIntento(email);
  
      // Si no hay intento previo, guardamos el primer intento
      const autoevaluacion = await guardarAutoevaluacion(email, numeroIntento + 1);
  
      // Guarda las respuestas del usuario en la base de datos
      await Promise.all(respuestas.map(async (respuesta) => {
        // Guarda la respuesta en la base de datos
        await guardarRespuestas(email, respuesta.idPregunta, respuesta.idOpcion, autoevaluacion.numeroIntento);
  
        // Incrementa la frecuencia de la opción seleccionada
        await incrementarFrecuenciaOpcion(respuesta.idOpcion);  // Aquí incrementamos la frecuencia
      }));
  
      // Responde con éxito
      res.status(200).json({ mensaje: 'Autoevaluación guardada con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al guardar la autoevaluación' });
    }
  });

router.get('/resultado/:id_objeto', autController.obtenerDetallesAutoevaluacion);


module.exports = router;

const {Router}= require('express')
const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos')
const { check } = require('express-validator')
const { obtenerDenuncias, crearDenuncia, actualizarDenuncia, eliminarDenuncia, cambiarEstadoDenuncia } = require('../controllers/denuncias')
const { validarDenunciaExistente } = require('../helpers/db-validator')

const router = Router()

router.get('/',[
    validarJWT,
    validarCampos
], obtenerDenuncias);

router.post('/crear', [
    check('TipoViolencia', 'El tipo de violencia es obligatorio').not().isEmpty(),
    check('UbicacionIncidente', 'La ubicación del incidente es obligatoria').not().isEmpty(),
    check('Contenido', 'El contenido de la denuncia es obligatorio').not().isEmpty(),
    check('RelacionAgresor', 'La relación con el agresor es obligatoria').not().isEmpty(),
    validarJWT,
    validarCampos
], crearDenuncia);

router.put('/actualizar/:id',[
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarDenunciaExistente), 
    check('TipoViolencia', 'El tipo de violencia es obligatorio').optional().not().isEmpty(),
    check('UbicacionIncidente', 'La ubicación del incidente es obligatoria').optional().not().isEmpty(),
    check('Contenido', 'El contenido de la denuncia es obligatorio').optional().not().isEmpty(),
    check('RelacionAgresor', 'La relación con el agresor es obligatoria').optional().not().isEmpty(),
    validarJWT,
    validarCampos
], actualizarDenuncia);

router.put('/actualizarestado/:id',[
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarDenunciaExistente), 
    check('Estado', 'El estado es obligatorio').optional().not().isEmpty(),
    validarJWT,
    validarCampos
], cambiarEstadoDenuncia);

router.delete('/eliminar/:id', [
    check('id')
        .isInt().withMessage('El ID debe ser un número entero.')
        .custom(validarDenunciaExistente), 
    validarJWT,
    validarCampos
], eliminarDenuncia);

module.exports = router
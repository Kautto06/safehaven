const { Router } = require('express');
const { check } = require('express-validator');
const { updateUser } = require('../controllers/user');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.put('/update', [
    validarJWT, 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('phone', 'El teléfono debe tener 9 números').isLength({ min: 9, max: 9 }),
    validarCampos
], updateUser);

module.exports = router;

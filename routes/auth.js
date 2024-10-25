const {Router} = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()



router.post('/nuevo',[
    check('email','El email es obligatorio').isEmail(),
    check('phone','El telefono debe tener como minimo/maximo 9 numeros').isLength({max: 9,min:9}),
    check('password','El password debe tener como minimo 8 caracteres').isLength({min: 8}),
    check('birthday','El birthday debe ser una fecha valida').isDate(),
    validarCampos
],crearUsuario)

router.post('/login',[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password debe tener como minimo 8 caracteres').isLength({min: 8}),
    validarCampos
],loginUsuario)

router.get('/renew',validarJWT, revalidarToken);

module.exports = router
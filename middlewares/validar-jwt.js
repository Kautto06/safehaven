const { response } = require("express")
const jwt = require('jsonwebtoken')


const validarJWT = (req,res=response,next) => {

    // x-token headers
    const token = req.header('x-token')
    
    if(!token){
        console.log("error 2")
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        const {email,name,apellidos} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )

        req.email = email
        req.name = name
        req.apellidos=apellidos

    } catch (error) {
        console.log("error 2")
        return res.status(401).json({
            ok: false,
            msh: 'Token no válido'
        })
    }


    next()
}

module.exports ={
    validarJWT
}
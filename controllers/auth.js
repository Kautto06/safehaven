const { ejecutarConsulta } = require('../database/config')
const bcrypt = require('bcryptjs')
const {generarJWT} = require('../helpers/generar-jwt')
const {response} = require('express')

const crearUsuario = async(req,res=response) => {
    const {email,phone,password,birthday,genero} = req.body
    try{
        const query = `SELECT * FROM usuarios WHERE email = '${email}'`
        const existeUsuario = await ejecutarConsulta(query)

        console.log(existeUsuario)

        if(existeUsuario.length != 0){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            })
        }

        const salt = bcrypt.genSaltSync()
        const cryptPassword = bcrypt.hashSync(password,salt)

        const insertQuery = `
            INSERT INTO usuarios (email, phone, password, birthday, genero)
            VALUES ('${email}', '${phone}', '${cryptPassword}', '${birthday}', '${genero}')
        `;

        await ejecutarConsulta(insertQuery)

        const token = await generarJWT(email)

        res.status(201).json({
            ok: true,
            msg: 'Usuario creado correctamente',
            token
        });

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const loginUsuario = async(req,res=response) => {
    const {email,password} = req.body

    try{
        const query = `SELECT * FROM usuarios WHERE email = '${email}'`
        const usuario = await ejecutarConsulta(query)

        if(usuario.length == 0){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        const [rowDataPacket] = usuario
        console.log(rowDataPacket)
        const validPassword = bcrypt.compareSync(password,rowDataPacket.password)
        console.log(validPassword)

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Password incorrecto'
            })
        }

        const token = await generarJWT(rowDataPacket.email)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

module.exports = {
    crearUsuario,
    loginUsuario
}
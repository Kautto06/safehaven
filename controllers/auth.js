const { ejecutarConsulta } = require('../database/config')
const bcrypt = require('bcryptjs')
const {generarJWT} = require('../helpers/generar-jwt')
const {response} = require('express')

const crearUsuario = async(req,res=response) => {
    const {email,phone,password,birthday,gender,nombre,apellidos} = req.body
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
            INSERT INTO usuarios (email, phone, password, birthday, genero,nombre, apellidos)
            VALUES ('${email}', '${phone}', '${cryptPassword}', '${birthday}', '${gender}','${nombre}','${apellidos}' )
        `;

        await ejecutarConsulta(insertQuery)

        const token = await generarJWT(email,nombre,apellidos)

        res.status(201).json({
            ok: true,
            email,
            nombre,
            apellidos,
            phone,         
            birthday,     
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
        const validPassword = bcrypt.compareSync(password,rowDataPacket.password)

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Password incorrecto'
            })
        }

        const token = await generarJWT(rowDataPacket.email,rowDataPacket.nombre,rowDataPacket.apellidos)

        res.status(201).json({
            ok: true,
            email: rowDataPacket.email,
            nombre: rowDataPacket.nombre,
            apellidos: rowDataPacket.apellidos,
            phone: rowDataPacket.phone,  // Agregar teléfono aquí
            birthday: rowDataPacket.birthday,
            estado: rowDataPacket.estado,  // Agregar fecha de nacimiento aquí
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

const revalidarToken = async(req,res=response) => {

    const {email,nombre,apellidos} = req

    const nuevoToken= await generarJWT(email,nombre,apellidos)

    res.json({
        ok: true,
        email,
        nombre,
        apellidos,
        token: nuevoToken
    })
}

module.exports = {
    crearUsuario,
    loginUsuario, 
    revalidarToken
}
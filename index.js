const express = require('express')
const cors = require('cors')
const {db} = require('./database/config')
const fileUpload = require('express-fileupload')
require('dotenv').config()

const app = express()

app.use(cors())

app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
}))


app.use('/api/experts',require('./routes/experts'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/user', require('./routes/user'));
app.use('/api/foro', require('./routes/foro'));
app.use('/api/experts', require('./routes/experts'));
app.use('/api/notificaciones', require('./routes/notificaciones'));
app.use('/api/opciones', require('./routes/opciones'))
app.use('/api/preguntas', require('./routes/preguntas'))
app.use('/api/eventos', require('./routes/eventos'))
app.use('/api/denuncias', require('./routes/denuncias'))
app.use('/api/uploads',require('./routes/uploads'))
//app.use('/api/autoEvaluacion', require('./routes/'))
app.use('/api/preguntas', require('./routes/preguntas'));
app.use('/api/autoevaluacion', require('./routes/autoevaluacion'));
app.use('/api/actividad', require('./routes/actividad'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})

process.on('exit',()=>{
    db.end()
})


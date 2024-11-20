const express = require('express')
const cors = require('cors')
const {db} = require('./database/config')
require('dotenv').config()

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/experts',require('./routes/experts'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/user', require('./routes/user'));
app.use('/api/foro', require('./routes/foro'));
app.use('/api/experts', require('./routes/experts'));
app.use('/api/notificaciones', require('./routes/notificaciones'));
app.use('/api/preguntas', require('./routes/preguntas'));
app.use('/api/autoevaluacion', require('./routes/autoevaluacion'));
app.use('/api/actividad', require('./routes/actividad'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})

process.on('exit',()=>{
    db.end()
})


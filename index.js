const express = require('express')
const cors = require('cors')
const {db} = require('./database/config')
require('dotenv').config()

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/user', require('./routes/user'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})

process.on('exit',()=>{
    db.end()
})

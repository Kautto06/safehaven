const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_IP,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Conectar a la base de datos y listar tablas
db.connect((error) => {
    if (error) {
        console.log('Error de conexion:', error);
    } else {
        console.log('Conexion exitosa a la base de datos');
    }
});

const ejecutarConsulta = (query) => {
    return new Promise((resolve, reject) => {
        db.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    ejecutarConsulta,
    db
};

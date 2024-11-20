  // Asegúrate de importar la configuración de Cloudinary
const cloudinary= require('../cloudinary/config');
const { ejecutarConsulta } = require('../database/config');
const mysql = require('mysql');

// Controlador para cargar archivo
const cargarArchivo = async (req, res) => {
    try {
        if (!req.files || !req.files.archivo) {
            return res.status(400).json({ msg: 'No hay archivo para subir' });
        }
        const { archivo } = req.files;
        const { tempFilePath } = archivo;

        // Subir archivo a Cloudinary
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
            folder: 'proyectoWeb/expertos'  // Especificamos la carpeta
        });

        // Guardar la URL de la imagen en la base de datos MySQL
        const query = 'INSERT INTO denuncias (LinkImagen) VALUES (?)';
        const params = [secure_url]
        const formattedQuery = mysql.format(query,params)
        const result = await ejecutarConsulta(formattedQuery);

        res.json({ msg: 'Imagen subida y URL guardada', url: secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al cargar el archivo', error });
    }
};

// Actualizar imagen de un experto
const actualizarImagenExpertos = async (req, res) => {
    const { id } = req.params;
    const { imagen } = req.files;

    try {
        const { tempFilePath } = imagen;

        // Subir archivo a Cloudinary
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
            folder: 'proyectoWeb/Expertos'  // Especificamos la carpeta
        });

        // Actualizar la URL de la imagen en la base de datos
        const query = 'UPDATE experto SET LinkImagen = ? WHERE ID = ?';
        const params = [secure_url,id]
        const formattedQuery = mysql.format(query,params)
        const result = await ejecutarConsulta(formattedQuery);

        res.json({ msg: 'Imagen de experto actualizada correctamente', url: secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar la imagen', error });
    }
};

module.exports = {
    cargarArchivo,
    actualizarImagenExpertos,
};



const validarArchivoSubir = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No se subió ningún archivo' });
    }

    const { imagen } = req.files;

    // Validación simple de tipo de imagen
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif'];

    if (!tiposPermitidos.includes(imagen.mimetype)) {
        return res.status(400).json({ msg: 'Tipo de archivo no permitido' });
    }

    next();
};

module.exports = {
    validarArchivoSubir,
};
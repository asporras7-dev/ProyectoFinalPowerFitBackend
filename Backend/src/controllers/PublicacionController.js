const Publicacion = require('../models/Publicacion');

const PublicacionController = {
    getAll: async (req, res) => {
        try {
            const publicaciones = await Publicacion.findAll();

            if (!publicaciones || publicaciones.length === 0) {
                return res.status(404).json({ message: "No se encontraron publicaciones" });
            }
            res.status(200).json(publicaciones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const publicacion = await Publicacion.findByPk(id);

            if (!publicacion) {
                return res.status(404).json({ message: 'Publicacion no encontrado' });
            }

            res.status(200).json(publicacion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const { tiempo_Publicacion, titulo, texto, imagen, categoria_Publicaciones_idcategoria_Publicaciones, Usuario_idUsuario } = req.body;

            if (!titulo || !texto || !Usuario_idUsuario) {
                return res.status(400).json({ error: 'El titulo, texto, Usuario_idUsuario es requerido' });
            }

            const nuevo = await Publicacion.create({ tiempo_Publicacion, titulo, texto, imagen, categoria_Publicaciones_idcategoria_Publicaciones, Usuario_idUsuario });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { tiempo_Publicacion, titulo, texto, imagen, categoria_Publicaciones_idcategoria_Publicaciones, Usuario_idUsuario } = req.body;
            const publicacion = await Publicacion.findByPk(id);

            if (!publicacion) {
                return res.status(404).json({ message: 'Publicacion no encontrado' });
            }

            if (!titulo || !texto || !Usuario_idUsuario) {
                return res.status(400).json({ error: 'El titulo, texto, Usuario_idUsuario es requerido' });
            }

            await publicacion.update({ tiempo_Publicacion, titulo, texto, imagen, categoria_Publicaciones_idcategoria_Publicaciones, Usuario_idUsuario });
            res.status(200).json(publicacion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const publicacion = await Publicacion.findByPk(id);

            if (!publicacion) {
                return res.status(404).json({ message: 'Publicacion no encontrado' });
            }

            await publicacion.destroy();
            res.status(200).json({ message: 'Publicacion eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = PublicacionController;

const Comentario = require('../models/Comentario');

const ComentarioController = {
    getAll: async (req, res) => {
        try {
            const comentarios = await Comentario.findAll();

            if (!comentarios || comentarios.length === 0) {
                return res.status(404).json({ message: "No se encontraron comentarios" });
            }
            res.status(200).json(comentarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const comentario = await Comentario.findByPk(id);

            if (!comentario) {
                return res.status(404).json({ message: 'Comentario no encontrado' });
            }

            res.status(200).json(comentario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const { texto, Usuario_idUsuario } = req.body;

            if (!texto || !Usuario_idUsuario) {
                return res.status(400).json({ error: 'El texto, Usuario_idUsuario es requerido' });
            }

            const nuevo = await Comentario.create({ texto, Usuario_idUsuario });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { texto, Usuario_idUsuario } = req.body;
            const comentario = await Comentario.findByPk(id);

            if (!comentario) {
                return res.status(404).json({ message: 'Comentario no encontrado' });
            }

            if (!texto || !Usuario_idUsuario) {
                return res.status(400).json({ error: 'El texto, Usuario_idUsuario es requerido' });
            }

            await comentario.update({ texto, Usuario_idUsuario });
            res.status(200).json(comentario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const comentario = await Comentario.findByPk(id);

            if (!comentario) {
                return res.status(404).json({ message: 'Comentario no encontrado' });
            }

            await comentario.destroy();
            res.status(200).json({ message: 'Comentario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ComentarioController;

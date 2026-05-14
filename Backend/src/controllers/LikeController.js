const Like = require('../models/Like');

const LikeController = {
    getAll: async (req, res) => {
        try {
            const likes = await Like.findAll();

            if (!likes || likes.length === 0) {
                return res.status(404).json({ message: "No se encontraron likes" });
            }
            res.status(200).json(likes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const like = await Like.findByPk(id);

            if (!like) {
                return res.status(404).json({ message: 'Like no encontrado' });
            }

            res.status(200).json(like);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const { Usuario_idUsuario } = req.body;

            if (!Usuario_idUsuario) {
                return res.status(400).json({ error: 'El Usuario_idUsuario es requerido' });
            }

            const nuevo = await Like.create({ Usuario_idUsuario });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { Usuario_idUsuario } = req.body;
            const like = await Like.findByPk(id);

            if (!like) {
                return res.status(404).json({ message: 'Like no encontrado' });
            }

            if (!Usuario_idUsuario) {
                return res.status(400).json({ error: 'El Usuario_idUsuario es requerido' });
            }

            await like.update({ Usuario_idUsuario });
            res.status(200).json(like);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const like = await Like.findByPk(id);

            if (!like) {
                return res.status(404).json({ message: 'Like no encontrado' });
            }

            await like.destroy();
            res.status(200).json({ message: 'Like eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = LikeController;

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
            const { id_usuario } = req.body;

            if (!id_usuario) {
                return res.status(400).json({ error: 'El id_usuario es requerido' });
            }

            const nuevo = await Like.create({ id_usuario });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { id_usuario } = req.body;
            const like = await Like.findByPk(id);

            if (!like) {
                return res.status(404).json({ message: 'Like no encontrado' });
            }

            if (!id_usuario) {
                return res.status(400).json({ error: 'El id_usuario es requerido' });
            }

            await like.update({ id_usuario });
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

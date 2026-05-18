const Perfil = require('../models/Perfil');

const PerfilController = {
    getAll: async (req, res) => {
        try {
            const perfiles = await Perfil.findAll();

            if (!perfiles || perfiles.length === 0) {
                return res.status(404).json({ message: "No se encontraron perfiles" });
            }
            res.status(200).json(perfiles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const perfil = await Perfil.findByPk(id);

            if (!perfil) {
                return res.status(404).json({ message: 'Perfil no encontrado' });
            }

            res.status(200).json(perfil);
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

            const nuevo = await Perfil.create({ id_usuario });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { id_usuario } = req.body;
            const perfil = await Perfil.findByPk(id);

            if (!perfil) {
                return res.status(404).json({ message: 'Perfil no encontrado' });
            }

            if (!id_usuario) {
                return res.status(400).json({ error: 'El id_usuario es requerido' });
            }

            await perfil.update({ id_usuario });
            res.status(200).json(perfil);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const perfil = await Perfil.findByPk(id);

            if (!perfil) {
                return res.status(404).json({ message: 'Perfil no encontrado' });
            }

            await perfil.destroy();
            res.status(200).json({ message: 'Perfil eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = PerfilController;

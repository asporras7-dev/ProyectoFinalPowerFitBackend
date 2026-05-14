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
            const { Usuario_idUsuario } = req.body;

            if (!Usuario_idUsuario) {
                return res.status(400).json({ error: 'El Usuario_idUsuario es requerido' });
            }

            const nuevo = await Perfil.create({ Usuario_idUsuario });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { Usuario_idUsuario } = req.body;
            const perfil = await Perfil.findByPk(id);

            if (!perfil) {
                return res.status(404).json({ message: 'Perfil no encontrado' });
            }

            if (!Usuario_idUsuario) {
                return res.status(400).json({ error: 'El Usuario_idUsuario es requerido' });
            }

            await perfil.update({ Usuario_idUsuario });
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

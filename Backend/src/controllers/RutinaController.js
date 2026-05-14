const Rutina = require('../models/Rutina');

const RutinaController = {
    getAll: async (req, res) => {
        try {
            const rutinas = await Rutina.findAll();

            if (!rutinas || rutinas.length === 0) {
                return res.status(404).json({ message: "No se encontraron rutinas" });
            }
            res.status(200).json(rutinas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const rutina = await Rutina.findByPk(id);

            if (!rutina) {
                return res.status(404).json({ message: 'Rutina no encontrado' });
            }

            res.status(200).json(rutina);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const { datos_Usuario_iddatos_Usuario } = req.body;

            if (!datos_Usuario_iddatos_Usuario) {
                return res.status(400).json({ error: 'El datos_Usuario_iddatos_Usuario es requerido' });
            }

            const nuevo = await Rutina.create({ datos_Usuario_iddatos_Usuario });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { datos_Usuario_iddatos_Usuario } = req.body;
            const rutina = await Rutina.findByPk(id);

            if (!rutina) {
                return res.status(404).json({ message: 'Rutina no encontrado' });
            }

            if (!datos_Usuario_iddatos_Usuario) {
                return res.status(400).json({ error: 'El datos_Usuario_iddatos_Usuario es requerido' });
            }

            await rutina.update({ datos_Usuario_iddatos_Usuario });
            res.status(200).json(rutina);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const rutina = await Rutina.findByPk(id);

            if (!rutina) {
                return res.status(404).json({ message: 'Rutina no encontrado' });
            }

            await rutina.destroy();
            res.status(200).json({ message: 'Rutina eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = RutinaController;

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
            const { id_datos_usuario } = req.body;

            if (!id_datos_usuario) {
                return res.status(400).json({ error: 'El id_datos_usuario es requerido' });
            }

            const nuevo = await Rutina.create({ id_datos_usuario });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { id_datos_usuario } = req.body;
            const rutina = await Rutina.findByPk(id);

            if (!rutina) {
                return res.status(404).json({ message: 'Rutina no encontrado' });
            }

            if (!id_datos_usuario) {
                return res.status(400).json({ error: 'El id_datos_usuario es requerido' });
            }

            await rutina.update({ id_datos_usuario });
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

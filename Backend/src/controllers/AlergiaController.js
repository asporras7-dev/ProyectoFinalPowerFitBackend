const Alergia = require('../models/Alergia');

const AlergiaController = {
    getAll: async (req, res) => {
        try {
            const alergias = await Alergia.findAll();

            if (!alergias || alergias.length === 0) {
                return res.status(404).json({ message: "No se encontraron alergias" });
            }
            res.status(200).json(alergias);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const alergia = await Alergia.findByPk(id);

            if (!alergia) {
                return res.status(404).json({ message: 'Alergia no encontrado' });
            }

            res.status(200).json(alergia);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const { nombre } = req.body;

            if (!nombre) {
                return res.status(400).json({ error: 'El nombre es requerido' });
            }

            const nuevo = await Alergia.create({ nombre });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre } = req.body;
            const alergia = await Alergia.findByPk(id);

            if (!alergia) {
                return res.status(404).json({ message: 'Alergia no encontrado' });
            }

            if (!nombre) {
                return res.status(400).json({ error: 'El nombre es requerido' });
            }

            await alergia.update({ nombre });
            res.status(200).json(alergia);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const alergia = await Alergia.findByPk(id);

            if (!alergia) {
                return res.status(404).json({ message: 'Alergia no encontrado' });
            }

            await alergia.destroy();
            res.status(200).json({ message: 'Alergia eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = AlergiaController;

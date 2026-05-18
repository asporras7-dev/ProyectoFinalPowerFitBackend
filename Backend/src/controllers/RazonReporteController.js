const RazonReporte = require('../models/RazonReporte');

const RazonReporteController = {
    getAll: async (req, res) => {
        try {
            const razones = await RazonReporte.findAll();

            if (!razones || razones.length === 0) {
                return res.status(404).json({ message: "No se encontraron razones" });
            }
            res.status(200).json(razones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const razon = await RazonReporte.findByPk(id);

            if (!razon) {
                return res.status(404).json({ message: 'RazonReporte no encontrado' });
            }

            res.status(200).json(razon);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const { nombre, id_detalle_razon } = req.body;

            if (!nombre || !id_detalle_razon) {
                return res.status(400).json({ error: 'El nombre, id_detalle_razon es requerido' });
            }

            const nuevo = await RazonReporte.create({ nombre, id_detalle_razon });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, id_detalle_razon } = req.body;
            const razon = await RazonReporte.findByPk(id);

            if (!razon) {
                return res.status(404).json({ message: 'RazonReporte no encontrado' });
            }

            if (!nombre || !id_detalle_razon) {
                return res.status(400).json({ error: 'El nombre, id_detalle_razon es requerido' });
            }

            await razon.update({ nombre, id_detalle_razon });
            res.status(200).json(razon);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const razon = await RazonReporte.findByPk(id);

            if (!razon) {
                return res.status(404).json({ message: 'RazonReporte no encontrado' });
            }

            await razon.destroy();
            res.status(200).json({ message: 'RazonReporte eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = RazonReporteController;

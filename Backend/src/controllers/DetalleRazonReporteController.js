const DetalleRazonReporte = require('../models/DetalleRazonReporte');

const DetalleRazonReporteController = {
    getAll: async (req, res) => {
        try {
            const detalles = await DetalleRazonReporte.findAll();

            if (!detalles || detalles.length === 0) {
                return res.status(404).json({ message: "No se encontraron detalles" });
            }
            res.status(200).json(detalles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const detalle = await DetalleRazonReporte.findByPk(id);

            if (!detalle) {
                return res.status(404).json({ message: 'DetalleRazonReporte no encontrado' });
            }

            res.status(200).json(detalle);
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

            const nuevo = await DetalleRazonReporte.create({ nombre });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre } = req.body;
            const detalle = await DetalleRazonReporte.findByPk(id);

            if (!detalle) {
                return res.status(404).json({ message: 'DetalleRazonReporte no encontrado' });
            }

            if (!nombre) {
                return res.status(400).json({ error: 'El nombre es requerido' });
            }

            await detalle.update({ nombre });
            res.status(200).json(detalle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const detalle = await DetalleRazonReporte.findByPk(id);

            if (!detalle) {
                return res.status(404).json({ message: 'DetalleRazonReporte no encontrado' });
            }

            await detalle.destroy();
            res.status(200).json({ message: 'DetalleRazonReporte eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = DetalleRazonReporteController;

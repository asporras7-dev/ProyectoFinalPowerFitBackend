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
            const { nombre, detalle_Razon_Reporte_iddetalle_Razon_Reporte } = req.body;

            if (!nombre || !detalle_Razon_Reporte_iddetalle_Razon_Reporte) {
                return res.status(400).json({ error: 'El nombre, detalle_Razon_Reporte_iddetalle_Razon_Reporte es requerido' });
            }

            const nuevo = await RazonReporte.create({ nombre, detalle_Razon_Reporte_iddetalle_Razon_Reporte });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, detalle_Razon_Reporte_iddetalle_Razon_Reporte } = req.body;
            const razon = await RazonReporte.findByPk(id);

            if (!razon) {
                return res.status(404).json({ message: 'RazonReporte no encontrado' });
            }

            if (!nombre || !detalle_Razon_Reporte_iddetalle_Razon_Reporte) {
                return res.status(400).json({ error: 'El nombre, detalle_Razon_Reporte_iddetalle_Razon_Reporte es requerido' });
            }

            await razon.update({ nombre, detalle_Razon_Reporte_iddetalle_Razon_Reporte });
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

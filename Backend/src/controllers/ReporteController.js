const Reporte = require('../models/Reporte');

const ReporteController = {
    getAll: async (req, res) => {
        try {
            const reportes = await Reporte.findAll();

            if (!reportes || reportes.length === 0) {
                return res.status(404).json({ message: "No se encontraron reportes" });
            }
            res.status(200).json(reportes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const reporte = await Reporte.findByPk(id);

            if (!reporte) {
                return res.status(404).json({ message: 'Reporte no encontrado' });
            }

            res.status(200).json(reporte);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const { Usuario_idUsuario, publicaciones_idpublicaciones, razones_Reporte_idrazones_Reporte, descripcion, estado, fecha_Y_Hora } = req.body;

            if (!Usuario_idUsuario || !publicaciones_idpublicaciones || !razones_Reporte_idrazones_Reporte) {
                return res.status(400).json({ error: 'El Usuario_idUsuario, publicaciones_idpublicaciones, razones_Reporte_idrazones_Reporte es requerido' });
            }

            const nuevo = await Reporte.create({ Usuario_idUsuario, publicaciones_idpublicaciones, razones_Reporte_idrazones_Reporte, descripcion, estado, fecha_Y_Hora });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { Usuario_idUsuario, publicaciones_idpublicaciones, razones_Reporte_idrazones_Reporte, descripcion, estado, fecha_Y_Hora } = req.body;
            const reporte = await Reporte.findByPk(id);

            if (!reporte) {
                return res.status(404).json({ message: 'Reporte no encontrado' });
            }

            if (!Usuario_idUsuario || !publicaciones_idpublicaciones || !razones_Reporte_idrazones_Reporte) {
                return res.status(400).json({ error: 'El Usuario_idUsuario, publicaciones_idpublicaciones, razones_Reporte_idrazones_Reporte es requerido' });
            }

            await reporte.update({ Usuario_idUsuario, publicaciones_idpublicaciones, razones_Reporte_idrazones_Reporte, descripcion, estado, fecha_Y_Hora });
            res.status(200).json(reporte);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const reporte = await Reporte.findByPk(id);

            if (!reporte) {
                return res.status(404).json({ message: 'Reporte no encontrado' });
            }

            await reporte.destroy();
            res.status(200).json({ message: 'Reporte eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ReporteController;

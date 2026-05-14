const Contribuidor = require('../models/Contribuidor');

const ContribuidorController = {
    getAll: async (req, res) => {
        try {
            const contribuidores = await Contribuidor.findAll();

            if (!contribuidores || contribuidores.length === 0) {
                return res.status(404).json({ message: "No se encontraron contribuidores" });
            }
            res.status(200).json(contribuidores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const contribuidor = await Contribuidor.findByPk(id);

            if (!contribuidor) {
                return res.status(404).json({ message: 'Contribuidor no encontrado' });
            }

            res.status(200).json(contribuidor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const { puntos, Usuario_idUsuario, rol_Contribuidor_idrol_Contribuidor } = req.body;

            if (!Usuario_idUsuario || !rol_Contribuidor_idrol_Contribuidor) {
                return res.status(400).json({ error: 'El Usuario_idUsuario, rol_Contribuidor_idrol_Contribuidor es requerido' });
            }

            const nuevo = await Contribuidor.create({ puntos, Usuario_idUsuario, rol_Contribuidor_idrol_Contribuidor });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { puntos, Usuario_idUsuario, rol_Contribuidor_idrol_Contribuidor } = req.body;
            const contribuidor = await Contribuidor.findByPk(id);

            if (!contribuidor) {
                return res.status(404).json({ message: 'Contribuidor no encontrado' });
            }

            if (!Usuario_idUsuario || !rol_Contribuidor_idrol_Contribuidor) {
                return res.status(400).json({ error: 'El Usuario_idUsuario, rol_Contribuidor_idrol_Contribuidor es requerido' });
            }

            await contribuidor.update({ puntos, Usuario_idUsuario, rol_Contribuidor_idrol_Contribuidor });
            res.status(200).json(contribuidor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const contribuidor = await Contribuidor.findByPk(id);

            if (!contribuidor) {
                return res.status(404).json({ message: 'Contribuidor no encontrado' });
            }

            await contribuidor.destroy();
            res.status(200).json({ message: 'Contribuidor eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ContribuidorController;

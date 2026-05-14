const RolContribuidor = require('../models/RolContribuidor');

const RolContribuidorController = {
    getAll: async (req, res) => {
        try {
            const rolesContribuidor = await RolContribuidor.findAll();

            if (!rolesContribuidor || rolesContribuidor.length === 0) {
                return res.status(404).json({ message: "No se encontraron rolesContribuidor" });
            }
            res.status(200).json(rolesContribuidor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const rolContribuidor = await RolContribuidor.findByPk(id);

            if (!rolContribuidor) {
                return res.status(404).json({ message: 'RolContribuidor no encontrado' });
            }

            res.status(200).json(rolContribuidor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const { nombre, descripcion_Rol } = req.body;

            if (!nombre) {
                return res.status(400).json({ error: 'El nombre es requerido' });
            }

            const nuevo = await RolContribuidor.create({ nombre, descripcion_Rol });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, descripcion_Rol } = req.body;
            const rolContribuidor = await RolContribuidor.findByPk(id);

            if (!rolContribuidor) {
                return res.status(404).json({ message: 'RolContribuidor no encontrado' });
            }

            if (!nombre) {
                return res.status(400).json({ error: 'El nombre es requerido' });
            }

            await rolContribuidor.update({ nombre, descripcion_Rol });
            res.status(200).json(rolContribuidor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const rolContribuidor = await RolContribuidor.findByPk(id);

            if (!rolContribuidor) {
                return res.status(404).json({ message: 'RolContribuidor no encontrado' });
            }

            await rolContribuidor.destroy();
            res.status(200).json({ message: 'RolContribuidor eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = RolContribuidorController;

const Rol = require('../models/Rol');

const RolController = {
    getAll: async (req, res) => {
        try {
            const roles = await Rol.findAll();

            if (!roles || roles.length === 0) {
                return res.status(404).json({ message: "No se encontraron roles" });
            }
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const rol = await Rol.findByPk(id);

            if (!rol) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }

            res.status(200).json(rol);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const { nombre, descripcion } = req.body;

            if (!nombre) {
                return res.status(400).json({ error: 'El nombre es requerido' });
            }

            const nuevo = await Rol.create({ nombre, descripcion });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, descripcion } = req.body;
            const rol = await Rol.findByPk(id);

            if (!rol) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }

            if (!nombre) {
                return res.status(400).json({ error: 'El nombre es requerido' });
            }

            await rol.update({ nombre, descripcion });
            res.status(200).json(rol);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const rol = await Rol.findByPk(id);

            if (!rol) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }

            await rol.destroy();
            res.status(200).json({ message: 'Rol eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = RolController;

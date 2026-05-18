const CategoriaPublicacion = require('../models/CategoriaPublicacion');

const CategoriaPublicacionController = {
    getAll: async (req, res) => {
        try {
            const categorias = await CategoriaPublicacion.findAll();

            if (!categorias || categorias.length === 0) {
                return res.status(404).json({ message: "No se encontraron categorias" });
            }
            res.status(200).json(categorias);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const categoria = await CategoriaPublicacion.findByPk(id);

            if (!categoria) {
                return res.status(404).json({ message: 'CategoriaPublicacion no encontrado' });
            }

            res.status(200).json(categoria);
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

            const nuevo = await CategoriaPublicacion.create({ nombre });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre } = req.body;
            const categoria = await CategoriaPublicacion.findByPk(id);

            if (!categoria) {
                return res.status(404).json({ message: 'CategoriaPublicacion no encontrado' });
            }

            if (!nombre) {
                return res.status(400).json({ error: 'El nombre es requerido' });
            }

            await categoria.update({ nombre });
            res.status(200).json(categoria);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const categoria = await CategoriaPublicacion.findByPk(id);

            if (!categoria) {
                return res.status(404).json({ message: 'CategoriaPublicacion no encontrado' });
            }

            await categoria.destroy();
            res.status(200).json({ message: 'CategoriaPublicacion eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = CategoriaPublicacionController;

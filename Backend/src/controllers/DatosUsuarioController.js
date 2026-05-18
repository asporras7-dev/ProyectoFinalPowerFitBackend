const DatosUsuario = require('../models/DatosUsuario');

const DatosUsuarioController = {
    getAll: async (req, res) => {
        try {
            const datosUsuarios = await DatosUsuario.findAll();

            if (!datosUsuarios || datosUsuarios.length === 0) {
                return res.status(404).json({ message: "No se encontraron datosUsuarios" });
            }
            res.status(200).json(datosUsuarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const datosUsuario = await DatosUsuario.findByPk(id);

            if (!datosUsuario) {
                return res.status(404).json({ message: 'DatosUsuario no encontrado' });
            }

            res.status(200).json(datosUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const { sexo, altura, peso, lugar_entrenamiento, peso_meta, plazo_semanas, deficit_estimado, imagen, id_usuario, semanas_progreso, feedback_dieta, feedback_ejercicio } = req.body;

            if (!id_usuario) {
                return res.status(400).json({ error: 'El id_usuario es requerido' });
            }

            const nuevo = await DatosUsuario.create({ sexo, altura, peso, lugar_entrenamiento, peso_meta, plazo_semanas, deficit_estimado, imagen, id_usuario, semanas_progreso, feedback_dieta, feedback_ejercicio });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { sexo, altura, peso, lugar_entrenamiento, peso_meta, plazo_semanas, deficit_estimado, imagen, id_usuario, semanas_progreso, feedback_dieta, feedback_ejercicio } = req.body;
            const datosUsuario = await DatosUsuario.findByPk(id);

            if (!datosUsuario) {
                return res.status(404).json({ message: 'DatosUsuario no encontrado' });
            }

            if (!id_usuario) {
                return res.status(400).json({ error: 'El id_usuario es requerido' });
            }

            await datosUsuario.update({ sexo, altura, peso, lugar_entrenamiento, peso_meta, plazo_semanas, deficit_estimado, imagen, id_usuario, semanas_progreso, feedback_dieta, feedback_ejercicio });
            res.status(200).json(datosUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const datosUsuario = await DatosUsuario.findByPk(id);

            if (!datosUsuario) {
                return res.status(404).json({ message: 'DatosUsuario no encontrado' });
            }

            await datosUsuario.destroy();
            res.status(200).json({ message: 'DatosUsuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = DatosUsuarioController;

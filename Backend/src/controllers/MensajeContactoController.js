const MensajeContacto = require('../models/MensajeContacto');

const MensajeContactoController = {
    getAll: async (req, res) => {
        try {
            const mensajes = await MensajeContacto.findAll();

            if (!mensajes || mensajes.length === 0) {
                return res.status(404).json({ message: "No se encontraron mensajes" });
            }
            res.status(200).json(mensajes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const mensaje = await MensajeContacto.findByPk(id);

            if (!mensaje) {
                return res.status(404).json({ message: 'MensajeContacto no encontrado' });
            }

            res.status(200).json(mensaje);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const { nombre, telefono_Contacto, correo, mensaje, pais, fecha, Usuario_idUsuario } = req.body;

            if (!nombre || !mensaje || !Usuario_idUsuario) {
                return res.status(400).json({ error: 'El nombre, mensaje, Usuario_idUsuario es requerido' });
            }

            const nuevo = await MensajeContacto.create({ nombre, telefono_Contacto, correo, mensaje, pais, fecha, Usuario_idUsuario });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, telefono_Contacto, correo, mensaje, pais, fecha, Usuario_idUsuario } = req.body;
            const mensajeContacto = await MensajeContacto.findByPk(id);

            if (!mensajeContacto) {
                return res.status(404).json({ message: 'MensajeContacto no encontrado' });
            }

            if (!nombre || !mensaje || !Usuario_idUsuario) {
                return res.status(400).json({ error: 'El nombre, mensaje, Usuario_idUsuario es requerido' });
            }

            await mensajeContacto.update({ nombre, telefono_Contacto, correo, mensaje, pais, fecha, Usuario_idUsuario });
            res.status(200).json(mensajeContacto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const mensaje = await MensajeContacto.findByPk(id);

            if (!mensaje) {
                return res.status(404).json({ message: 'MensajeContacto no encontrado' });
            }

            await mensaje.destroy();
            res.status(200).json({ message: 'MensajeContacto eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = MensajeContactoController;

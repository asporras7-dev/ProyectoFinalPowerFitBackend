const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MensajeContacto = sequelize.define('MensajeContacto', {
    idmensajes_Contacto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    telefono_Contacto: {
        type: DataTypes.STRING(45)
    },
    correo: {
        type: DataTypes.STRING(150)
    },
    mensaje: {
        type: DataTypes.TEXT
    },
    pais: {
        type: DataTypes.STRING(100)
    },
    fecha: {
        type: DataTypes.DATE
    },
    Usuario_idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'mensajes_Contacto',
    timestamps: false
});

module.exports = MensajeContacto;

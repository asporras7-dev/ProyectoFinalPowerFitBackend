const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    correo: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    contrasenia: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER
    },
    Rol_idRol: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'Usuario',
    timestamps: false
});

module.exports = Usuario;

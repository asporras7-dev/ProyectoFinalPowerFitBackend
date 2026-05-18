const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_rol'
    }
}, {
    tableName: 'usuario',
    timestamps: false
});

module.exports = Usuario;

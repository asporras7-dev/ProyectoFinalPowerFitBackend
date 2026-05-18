const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Rol = sequelize.define('Rol', {
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    tableName: 'rol',
    timestamps: false
});

module.exports = Rol;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RolContribuidor = sequelize.define('RolContribuidor', {
    id_rol_contribuidor: {
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
    tableName: 'rol_contribuidor',
    timestamps: false
});

module.exports = RolContribuidor;

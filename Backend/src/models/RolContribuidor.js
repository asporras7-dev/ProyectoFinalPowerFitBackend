const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RolContribuidor = sequelize.define('RolContribuidor', {
    idrol_Contribuidor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    descripcion_Rol: {
        type: DataTypes.STRING(45)
    }
}, {
    tableName: 'rol_Contribuidor',
    timestamps: false
});

module.exports = RolContribuidor;

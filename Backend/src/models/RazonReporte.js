const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RazonReporte = sequelize.define('RazonReporte', {
    idrazones_Reporte: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    detalle_Razon_Reporte_iddetalle_Razon_Reporte: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'razones_Reporte',
    timestamps: false
});

module.exports = RazonReporte;

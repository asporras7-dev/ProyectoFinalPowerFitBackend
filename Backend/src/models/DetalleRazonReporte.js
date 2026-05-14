const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DetalleRazonReporte = sequelize.define('DetalleRazonReporte', {
    iddetalle_Razon_Reporte: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
}, {
    tableName: 'detalle_Razon_Reporte',
    timestamps: false
});

module.exports = DetalleRazonReporte;

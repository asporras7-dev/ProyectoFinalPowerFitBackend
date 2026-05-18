const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RazonReporte = sequelize.define('RazonReporte', {
    id_razon: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    id_detalle_razon: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'razon_reporte',
    timestamps: false
});

module.exports = RazonReporte;

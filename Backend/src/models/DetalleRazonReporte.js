const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DetalleRazonReporte = sequelize.define('DetalleRazonReporte', {
    id_detalle_razon: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
}, {
    tableName: 'detalle_razon',
    timestamps: false
});

module.exports = DetalleRazonReporte;

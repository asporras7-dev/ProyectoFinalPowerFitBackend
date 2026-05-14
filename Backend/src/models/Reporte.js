const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Reporte = sequelize.define('Reporte', {
    idReporte: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Usuario_idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    publicaciones_idpublicaciones: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    razones_Reporte_idrazones_Reporte: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    fecha_Y_Hora: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'Reporte',
    timestamps: false
});

module.exports = Reporte;

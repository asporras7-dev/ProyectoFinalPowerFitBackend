const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Rutina = sequelize.define('Rutina', {
    idRutina: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    datos_Usuario_iddatos_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Rutina',
    timestamps: false
});

module.exports = Rutina;

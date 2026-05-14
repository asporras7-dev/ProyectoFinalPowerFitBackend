const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TemaEnTendencia = sequelize.define('TemaEnTendencia', {
    idtemaEnTendencia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tema: {
        type: DataTypes.STRING(450),
        allowNull: false
    },
    miembros: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'temaEnTendencia',
    timestamps: false
});

module.exports = TemaEnTendencia;

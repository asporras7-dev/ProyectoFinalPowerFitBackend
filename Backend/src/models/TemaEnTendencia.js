const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TemaEnTendencia = sequelize.define('TemaEnTendencia', {
    id_tema: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
    tableName: 'tema_tendencia',
    timestamps: false
});

module.exports = TemaEnTendencia;

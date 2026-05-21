const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Perfil = sequelize.define('Perfil', {
    id_perfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    biografia: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    foto_perfil: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    foto_portada: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'perfil',
    timestamps: false
});

module.exports = Perfil;

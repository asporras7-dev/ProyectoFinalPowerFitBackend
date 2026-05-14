const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Perfil = sequelize.define('Perfil', {
    idPerfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Usuario_idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    biografia: {
        type: DataTypes.TEXT
    },
    foto_Perfil: {
        type: DataTypes.TEXT
    },
    foto_Portada: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'Perfil',
    timestamps: false
});

module.exports = Perfil;

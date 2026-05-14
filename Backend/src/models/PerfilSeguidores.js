const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PerfilSeguidores = sequelize.define('PerfilSeguidores', {
    Perfil_idPerfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Perfil',
            key: 'idPerfil'
        }
    },
    Perfil_idPerfil1: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Perfil',
            key: 'idPerfil'
        }
    }
}, {
    tableName: 'Perfil_has_Perfil',
    timestamps: false
});

module.exports = PerfilSeguidores;

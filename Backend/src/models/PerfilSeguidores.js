const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PerfilSeguidores = sequelize.define('PerfilSeguidores', {
    perfil_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Perfil',
            key: 'idPerfil'
        },
        allowNull: false
    },
    seguidor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'perfil',
            key: 'idPerfil'
        },
        allowNull: false
    }
}, {
    tableName: 'Perfil_has_Perfil',
    timestamps: false
});

module.exports = PerfilSeguidores;

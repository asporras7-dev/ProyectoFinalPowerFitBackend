const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PerfilSeguidores = sequelize.define('PerfilSeguidores', {
    p_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'Perfil_idPerfil',
        references: {
            model: 'Perfil',
            key: 'idPerfil'
        }
    },
    s_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'Perfil_idPerfil1',
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

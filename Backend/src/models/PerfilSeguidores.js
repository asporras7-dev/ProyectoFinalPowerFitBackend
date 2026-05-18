const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PerfilSeguidores = sequelize.define('PerfilSeguidores', {
    id_perfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'perfil',
            key: 'id_perfil'
        }
    },
    id_seguidor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'perfil',
            key: 'id_perfil'
        }
    }
}, {
    tableName: 'perfil_seguidor',
    timestamps: false
});

module.exports = PerfilSeguidores;

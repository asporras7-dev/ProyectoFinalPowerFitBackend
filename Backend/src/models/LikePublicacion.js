const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const LikePublicacion = sequelize.define('LikePublicacion', {
    id_like: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    id_publicacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    tableName: 'like_publicacion',
    timestamps: false
});

module.exports = LikePublicacion;

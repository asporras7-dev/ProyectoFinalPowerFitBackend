const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const LikePublicacion = sequelize.define('LikePublicacion', {
    likes_idlikes: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    publicaciones_idpublicaciones: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    tableName: 'likes_publicaciones',
    timestamps: false
});

module.exports = LikePublicacion;

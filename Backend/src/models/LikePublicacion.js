const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const LikePublicacion = sequelize.define('LikePublicacion', {
    likes_idlikes: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    publicaciones_idpublicaciones: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'likes_publicaciones',
    timestamps: false
});

module.exports = LikePublicacion;

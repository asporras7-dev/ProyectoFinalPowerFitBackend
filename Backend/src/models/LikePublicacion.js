const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const LikePublicacion = sequelize.define('LikePublicacion', {
    like_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'likes_idlikes'
    },
    pub_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'publicaciones_idpublicaciones'
    }
}, {
    tableName: 'likes_publicaciones',
    timestamps: false
});

module.exports = LikePublicacion;

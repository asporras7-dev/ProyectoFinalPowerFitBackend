const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const LikePublicacion = sequelize.define('LikePublicacion', {
    like_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    pub_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    tableName: 'likes_publicaciones',
    timestamps: false
});

module.exports = LikePublicacion;

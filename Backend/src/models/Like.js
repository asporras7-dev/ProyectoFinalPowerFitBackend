const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Like = sequelize.define('Like', {
    idlikes: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Usuario_idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'likes',
    timestamps: false
});

module.exports = Like;

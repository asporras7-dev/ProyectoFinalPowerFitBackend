const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PublicacionComentario = sequelize.define('PublicacionComentario', {
    pub_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    com_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    tableName: 'publicaciones_Comentarios',
    timestamps: false
});

module.exports = PublicacionComentario;

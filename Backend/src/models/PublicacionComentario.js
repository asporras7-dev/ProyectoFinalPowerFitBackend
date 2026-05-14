const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PublicacionComentario = sequelize.define('PublicacionComentario', {
    publicaciones_idpublicaciones: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    Comentario_idComentario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    tableName: 'publicaciones_Comentarios',
    timestamps: false
});

module.exports = PublicacionComentario;

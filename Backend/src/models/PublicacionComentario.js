const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PublicacionComentario = sequelize.define('PublicacionComentario', {
    pub_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'publicaciones_idpublicaciones' // Keep original column name in DB
    },
    com_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'Comentario_idComentario' // Keep original column name in DB
    }
}, {
    tableName: 'publicaciones_Comentarios',
    timestamps: false
});

module.exports = PublicacionComentario;

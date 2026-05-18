const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PublicacionComentario = sequelize.define('PublicacionComentario', {
    id_publicacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    id_comentario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    tableName: 'publicacion_comentario',
    timestamps: false
});

module.exports = PublicacionComentario;

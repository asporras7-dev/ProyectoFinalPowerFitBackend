const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comentario = sequelize.define('Comentario', {
    idComentario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    texto: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Usuario_idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'comentario',
    timestamps: false
});

module.exports = Comentario;

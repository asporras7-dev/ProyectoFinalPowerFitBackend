const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comentario = sequelize.define('Comentario', {
    idComentario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    texto: {
        type: DataTypes.TEXT
    },
    Usuario_idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Comentario',
    timestamps: false
});

module.exports = Comentario;

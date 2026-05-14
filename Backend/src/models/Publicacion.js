const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Publicacion = sequelize.define('Publicacion', {
    idpublicaciones: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tiempo_Publicacion: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    texto: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    categoria_Publicaciones_idcategoria_Publicaciones: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Usuario_idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'publicaciones',
    timestamps: false
});

module.exports = Publicacion;

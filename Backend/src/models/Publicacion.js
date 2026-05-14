const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Publicacion = sequelize.define('Publicacion', {
    idpublicaciones: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tiempo_Publicacion: {
        type: DataTypes.STRING(150)
    },
    titulo: {
        type: DataTypes.STRING(150)
    },
    texto: {
        type: DataTypes.TEXT
    },
    imagen: {
        type: DataTypes.TEXT
    },
    categoria_Publicaciones_idcategoria_Publicaciones: {
        type: DataTypes.INTEGER
    },
    Usuario_idUsuario: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'publicaciones',
    timestamps: false
});

module.exports = Publicacion;

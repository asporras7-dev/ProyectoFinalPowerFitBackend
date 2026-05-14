const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CategoriaPublicacion = sequelize.define('CategoriaPublicacion', {
    idcategoria_Publicaciones: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
}, {
    tableName: 'categoria_Publicaciones',
    timestamps: false
});

module.exports = CategoriaPublicacion;

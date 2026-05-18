const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CategoriaPublicacion = sequelize.define('CategoriaPublicacion', {
    id_categoria: {
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
    tableName: 'categoria_publicacion',
    timestamps: false
});

module.exports = CategoriaPublicacion;

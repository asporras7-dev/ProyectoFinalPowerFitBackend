const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ejercicio = sequelize.define('Ejercicio', {
    idEjercicios: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    nivel: {
        type: DataTypes.STRING(45)
    },
    musculo: {
        type: DataTypes.STRING(120)
    },
    video: {
        type: DataTypes.TEXT,
        field: 'video'
    },
    videoUrl: { // Map to the same field or separate if needed
        type: DataTypes.TEXT,
        field: 'video' 
    },
    imagen: {
        type: DataTypes.TEXT
    },
    tiempo: {
        type: DataTypes.STRING(45)
    },
    repeticiones: {
        type: DataTypes.INTEGER
    },
    series: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'Ejercicios',
    timestamps: false
});

module.exports = Ejercicio;

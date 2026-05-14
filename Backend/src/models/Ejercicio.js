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
        type: DataTypes.STRING(45),
        allowNull: false
    },
    musculo: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    video: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tiempo: {
        type: DataTypes.STRING(45)
    },
    repeticiones: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    series: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Ejercicios',
    timestamps: false
});

module.exports = Ejercicio;

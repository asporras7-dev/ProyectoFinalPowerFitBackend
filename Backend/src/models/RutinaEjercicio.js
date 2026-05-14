const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RutinaEjercicio = sequelize.define('RutinaEjercicio', {
    Rutina_idRutina: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Ejercicios_idEjercicios: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    repeticiones: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sets: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    tiempo_Entre_Sets: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    tableName: 'Rutina_Ejercicios',
    timestamps: false
});

module.exports = RutinaEjercicio;

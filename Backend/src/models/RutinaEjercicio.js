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
        type: DataTypes.INTEGER
    },
    sets: {
        type: DataTypes.STRING(45)
    },
    tiempo_Entre_Sets: {
        type: DataTypes.STRING(45)
    }
}, {
    tableName: 'Rutina_Ejercicios',
    timestamps: false
});

module.exports = RutinaEjercicio;

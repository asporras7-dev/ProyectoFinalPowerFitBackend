const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RutinaEjercicio = sequelize.define('RutinaEjercicio', {
    rut_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'Rutina_idRutina'
    },
    ej_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'Ejercicios_idEjercicios'
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

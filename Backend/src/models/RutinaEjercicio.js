const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RutinaEjercicio = sequelize.define('RutinaEjercicio', {
    id_rutina: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    id_ejercicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    repeticiones: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sets: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    tiempo_entre_sets: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    tableName: 'rutina_ejercicio',
    timestamps: false
});

module.exports = RutinaEjercicio;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Rutina = sequelize.define('Rutina', {
    id_rutina: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_datos_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'rutina',
    timestamps: false
});

module.exports = Rutina;

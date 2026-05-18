const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Contribuidor = sequelize.define('Contribuidor', {
    id_contribuidor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    puntos: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_rol_contribuidor: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'contribuidor',
    timestamps: false
});

module.exports = Contribuidor;

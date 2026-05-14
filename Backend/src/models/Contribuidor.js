const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Contribuidor = sequelize.define('Contribuidor', {
    idContribuidor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    puntos: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    Usuario_idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rol_Contribuidor_idrol_Contribuidor: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'contribuidor',
    timestamps: false
});

module.exports = Contribuidor;

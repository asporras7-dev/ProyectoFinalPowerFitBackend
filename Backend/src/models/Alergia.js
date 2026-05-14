const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Alergia = sequelize.define('Alergia', {
    idAlergias: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'alergias',
    timestamps: false
});

module.exports = Alergia;

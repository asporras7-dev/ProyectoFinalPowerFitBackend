const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DatosUsuarioAlergia = sequelize.define('DatosUsuarioAlergia', {
    datos_Usuario_iddatos_Usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Alergias_idAlergias: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'datos_Usuario_Alergias',
    timestamps: false
});

module.exports = DatosUsuarioAlergia;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DatosUsuarioAlergia = sequelize.define('DatosUsuarioAlergia', {
    id_datos_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    id_alergia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    tableName: 'datos_usuario_alergia',
    timestamps: false
});

module.exports = DatosUsuarioAlergia;

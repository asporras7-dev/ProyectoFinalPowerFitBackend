const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DatosUsuarioAlergia = sequelize.define('DatosUsuarioAlergia', {
    user_data_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'datos_Usuario_iddatos_Usuario'
    },
    alergia_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'Alergias_idAlergias'
    }
}, {
    tableName: 'datos_Usuario_Alergias',
    timestamps: false
});

module.exports = DatosUsuarioAlergia;

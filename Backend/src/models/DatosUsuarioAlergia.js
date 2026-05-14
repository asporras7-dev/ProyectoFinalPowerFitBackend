const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DatosUsuarioAlergia = sequelize.define('DatosUsuarioAlergia', {
    user_data_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    alergia_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    tableName: 'datos_Usuario_Alergias',
    timestamps: false
});

module.exports = DatosUsuarioAlergia;

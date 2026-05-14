const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DatosUsuario = sequelize.define('DatosUsuario', {
    iddatos_Usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sexo: {
        type: DataTypes.STRING(45)
    },
    altura: {
        type: DataTypes.DECIMAL(10, 2)
    },
    peso: {
        type: DataTypes.DECIMAL(10, 2)
    },
    lugarEntrenamiento: {
        type: DataTypes.STRING(100)
    },
    pesoMeta: {
        type: DataTypes.DECIMAL(10, 2)
    },
    plazoSemanas: {
        type: DataTypes.INTEGER
    },
    decifitEstimado: {
        type: DataTypes.INTEGER
    },
    imagen: {
        type: DataTypes.TEXT
    },
    Usuario_idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    semanas_En_Progreso: {
        type: DataTypes.INTEGER
    },
    ultimo_Feedback_Dieta: {
        type: DataTypes.STRING(150)
    },
    ultimo_Feedback_Ejercicio: {
        type: DataTypes.STRING(150)
    }
}, {
    tableName: 'datos_Usuario',
    timestamps: false
});

module.exports = DatosUsuario;

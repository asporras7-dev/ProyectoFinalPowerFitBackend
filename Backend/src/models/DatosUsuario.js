const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DatosUsuario = sequelize.define('DatosUsuario', {
    iddatos_Usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sexo: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    altura: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false
    },
    peso: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false
    },
    lugarEntrenamiento: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    pesoMeta: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false
    },
    plazoSemanas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    decifitEstimado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imagen: {
        type: DataTypes.TEXT,
        allowNull: false
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

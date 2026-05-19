const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    contrasenia: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_rol'
    }
}, {
    tableName: 'usuario',
    timestamps: false,
    hooks: {
        beforeCreate: async (usuario) => {
            if (usuario.contrasenia) {
                const salt = await bcrypt.genSalt(10);
                usuario.contrasenia = await bcrypt.hash(usuario.contrasenia, salt);
            }
        },
        beforeUpdate: async (usuario) => {
            if (usuario.changed('contrasenia')) {
                const salt = await bcrypt.genSalt(10);
                usuario.contrasenia = await bcrypt.hash(usuario.contrasenia, salt);
            }
        }
    }
});

Usuario.prototype.validarContrasenia = async function (contrasenia) {
    return await bcrypt.compare(contrasenia, this.contrasenia);
};

module.exports = Usuario;


const { Sequelize } = require('sequelize');
const config = require('../src/config/config');

const sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    {
        host: config.db.host,
        dialect: config.db.dialect,
        logging: false
    }
);

async function test() {
    try {
        await sequelize.authenticate();
        console.log('CONEXIÓN EXITOSA');
    } catch (error) {
        console.error('ERROR DE CONEXIÓN:', error.message);
        if (error.original) {
            console.error('DETALLE:', error.original.message);
        }
    } finally {
        await sequelize.close();
    }
}

test();

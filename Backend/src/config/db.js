const { Sequelize } = require('sequelize');
const config = require('./config');

let sequelize;

if (process.env.NODE_ENV === 'test') {
<<<<<<< HEAD
=======
    // Usar SQLite en memoria para pruebas automatizadas (aisladas y rápidas)
>>>>>>> 88a0599d891205455a82af413f7cd84f8c7bdf71
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
    });
} else {
    sequelize = new Sequelize(
        config.db.name,
        config.db.user,
<<<<<<< HEAD
        config.db.password, 
        {
            host: config.db.host,
            dialect: config.db.dialect,
            storage: config.db.storage,
=======
        config.db.password,
        {
            host: config.db.host,
            dialect: config.db.dialect,
>>>>>>> 88a0599d891205455a82af413f7cd84f8c7bdf71
            logging: false
        }
    );
}

module.exports = sequelize;

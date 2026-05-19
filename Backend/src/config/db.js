const {Sequelize} = require('sequelize')
const config = require ('./config')

<<<<<<< HEAD
let sequelize;

if (process.env.NODE_ENV === 'test') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
    });
} else {
    sequelize = new Sequelize(
        config.db.name,
        config.db.user,
        config.db.password, 
        {
            host: config.db.host,
            dialect: config.db.dialect,
            storage: config.db.storage,
            logging: false
        }
    );
}

module.exports = sequelize

=======
const sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password, 
    {
        host: config.db.host,
        dialect: config.db.dialect
    }
)

module.exports = sequelize
>>>>>>> f7e7d2999b6066b1f637d367a8065ff0b1adbd23

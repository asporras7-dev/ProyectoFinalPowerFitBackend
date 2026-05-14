const { sequelize } = require('./src/index');

sequelize.authenticate()
    .then(() => {
        console.log('Conexion exitosa');
        return sequelize.getQueryInterface().showAllTables();
    })
    .then(tablas => {
        console.log('Tablas en la base de datos:', tablas);
        process.exit(0);
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
        process.exit(1);
    });

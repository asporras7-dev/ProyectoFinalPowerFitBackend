const { sequelize, ...models } = require('../src/index');

async function syncAll() {
    try {
        console.log('--- INICIANDO SINCRONIZACIÓN DETALLADA ---');
        
        // Sync one by one to find where it fails
        const modelNames = Object.keys(models);
        console.log(`Modelos encontrados: ${modelNames.join(', ')}`);

        // Sincronización global (alter: true para añadir nuevas columnas)
        await sequelize.sync({ alter: true });
        
        console.log('--- SINCRONIZACIÓN COMPLETADA EXITOSAMENTE ---');
        
        // Verificar tablas en la DB
        const [results] = await sequelize.query("SHOW TABLES;");
        console.log('Tablas actuales en la base de datos:');
        console.log(results.map(r => Object.values(r)[0]));

    } catch (error) {
        console.error('--- ERROR DURANTE LA SINCRONIZACIÓN ---');
        console.error('MENSAJE:', error.message);
        if (error.original) {
            console.error('DETALLE SQL:', error.original.sql);
        }
    } finally {
        await sequelize.close();
    }
}

syncAll();

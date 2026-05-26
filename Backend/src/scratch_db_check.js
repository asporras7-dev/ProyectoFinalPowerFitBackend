const { Usuario, Ejercicio, MensajeContacto, Reporte } = require('./index');
const sequelize = require('./config/db');

async function main() {
    try {
        const usersCount = await Usuario.count();
        const exercisesCount = await Ejercicio.count();
        const messagesCount = await MensajeContacto.count();
        const reportsCount = await Reporte.count();
        
        console.log('--- DB COUNTS ---');
        console.log('Users:', usersCount);
        console.log('Exercises:', exercisesCount);
        console.log('Messages:', messagesCount);
        console.log('Reports:', reportsCount);
    } catch (e) {
        console.error(e);
    } finally {
        process.exit(0);
    }
}

main();

const sequelize = require('./src/config/db');
const { QueryTypes } = require('sequelize');

async function run() {
    try {
        const result = await sequelize.query("SHOW INDEX FROM perfil_seguidor", { type: QueryTypes.SELECT });
        console.log("Indexes in perfil_seguidor:");
        console.table(result);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
run();

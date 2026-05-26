const sequelize = require('./src/config/db');
const { Perfil } = require('./src/index');

async function test() {
    try {
        const p1 = await Perfil.findByPk(1);
        if (p1) {
            console.log("Methods:", Object.keys(p1.__proto__).filter(k => k.toLowerCase().includes('follow')));
        }
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
test();

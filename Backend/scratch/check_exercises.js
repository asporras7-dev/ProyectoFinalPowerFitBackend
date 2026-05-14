const { Ejercicio, sequelize } = require('../src/index');

async function check() {
    try {
        const exercises = await Ejercicio.findAll();
        console.log('--- EJERCICIOS EN LA DB ---');
        exercises.forEach(e => {
            console.log(`ID: ${e.idEjercicios}, Nombre: ${e.nombre}`);
            console.log(`  Imagen: ${e.imagen ? 'SÍ' : 'NO'} (${e.imagen?.substring(0, 30)}...)`);
            console.log(`  Video: ${e.video ? 'SÍ' : 'NO'} (${e.video?.substring(0, 30)}...)`);
            console.log(`  VideoUrl: ${e.videoUrl ? 'SÍ' : 'NO'} (${e.videoUrl?.substring(0, 30)}...)`);
        });
    } catch (error) {
        console.error(error);
    } finally {
        await sequelize.close();
    }
}

check();

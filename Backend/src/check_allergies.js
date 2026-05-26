const { DatosUsuarioAlergia, DatosUsuario, Usuario, Alergia } = require('./index');
const sequelize = require('./config/db');

async function checkAllergies() {
  try {
    const list = await DatosUsuarioAlergia.findAll();
    console.log('--- ALL ROWS IN DATOS_USUARIO_ALERGIA ---');
    console.log(`Total: ${list.length}`);
    for (const row of list) {
      console.log(row.toJSON());
    }

    const allAlergias = await Alergia.findAll();
    console.log('\n--- ALL ALERGIA RECORDS ---');
    allAlergias.forEach(a => console.log(a.toJSON()));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

checkAllergies();

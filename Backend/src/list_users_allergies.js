const { Usuario, DatosUsuario, Alergia } = require('./index');
const sequelize = require('./config/db');

async function listAllUsers() {
  try {
    const list = await Usuario.findAll({
      include: [
        {
          model: DatosUsuario,
          include: [{ model: Alergia }]
        }
      ]
    });
    console.log('--- ALL USERS IN SYSTEM ---');
    list.forEach(u => {
      console.log(`User ID: ${u.id_usuario}, Email: ${u.correo}, Name: ${u.nombre}`);
      if (u.DatosUsuario) {
        console.log(`  DatosUsuario ID: ${u.DatosUsuario.id_datos_usuario}`);
        const al = u.DatosUsuario.Alergia || u.DatosUsuario.Alergias || [];
        console.log(`  Allergies: ${al.map(a => a.nombre).join(', ') || 'None'}`);
      } else {
        console.log('  No DatosUsuario record');
      }
    });
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

listAllUsers();

const { Usuario, Rol, Perfil, DatosUsuario, Alergia } = require('./index');
const sequelize = require('./config/db');

async function testMap() {
  try {
    const user = await Usuario.findOne({
      where: { nombre: 'Registro Test User' },
      include: [
        { model: Rol },
        {
          model: DatosUsuario,
          include: [{ model: Alergia }]
        }
      ]
    });
    if (!user) {
      console.log('No user found');
      return;
    }
    const u = user.toJSON();
    console.log('--- User raw JSON from DB ---');
    console.log(JSON.stringify(u, null, 2));

    // Test mapUsuario logic:
    const alergias = u.alergias ?? (u.DatosUsuario?.Alergia ? u.DatosUsuario.Alergia.map(a => a.nombre).join(', ') : (u.DatosUsuario?.Alergias ? u.DatosUsuario.Alergias.map(a => a.nombre).join(', ') : 'Ninguna'));
    console.log('\nMapped alergias:', alergias);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

testMap();

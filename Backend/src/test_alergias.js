// Quick test: does allergy saving work end-to-end?
const { DatosUsuario, Alergia, DatosUsuarioAlergia, Usuario, Rol, Perfil } = require('./index');
const sequelize = require('./config/db');

async function testAllergyFlow() {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected');

    // 1. Create or get test user
    let testRol = await Rol.findOne({ where: { nombre: 'client' } });
    if (!testRol) testRol = await Rol.create({ nombre: 'client', descripcion: 'test' });

    const testEmail = `test_alergia_${Date.now()}@test.com`;
    const testUser = await Usuario.create({
      correo: testEmail,
      contrasenia: '$2a$10$abcdefgh1234567890abcdefgh12345678', // dummy hash
      nombre: 'Test Alergia User',
      edad: 25,
      id_rol: testRol.id_rol
    });
    console.log('✅ Test user created, id:', testUser.id_usuario);

    // 2. Create DatosUsuario
    const datosUsuario = await DatosUsuario.create({
      sexo: 'Masculino',
      altura: 175,
      peso: 75,
      lugar_entrenamiento: 'Casa',
      peso_meta: 70,
      plazo_semanas: 8,
      deficit_estimado: 450,
      imagen: '',
      id_usuario: testUser.id_usuario,
      semanas_progreso: 0,
      feedback_dieta: 'Ninguno',
      feedback_ejercicio: 'Ninguno'
    });
    console.log('✅ DatosUsuario created, id:', datosUsuario.id_datos_usuario);

    // 3. Create allergies with findOrCreate
    const alergiaNames = ['Lácteos / Lactosa', 'Maní', 'Penicilina'];
    const alergiaRecords = [];
    for (const name of alergiaNames) {
      const [record, created] = await Alergia.findOrCreate({ where: { nombre: name } });
      console.log(`  Alergia "${name}" -> id: ${record.id_alergia}, created: ${created}`);
      alergiaRecords.push(record);
    }

    // 4. Try setAlergia
    console.log('\n--- Checking available methods ---');
    console.log('setAlergia exists?', typeof datosUsuario.setAlergia);
    console.log('addAlergia exists?', typeof datosUsuario.addAlergia);

    if (typeof datosUsuario.setAlergia === 'function') {
      await datosUsuario.setAlergia(alergiaRecords);
      console.log('✅ setAlergia succeeded');
    } else if (typeof datosUsuario.setAlergias === 'function') {
      await datosUsuario.setAlergias(alergiaRecords);
      console.log('✅ setAlergias succeeded');
    } else {
      console.log('❌ No setAlergia/setAlergias method found!');
    }

    // 5. Verify in junction table
    const junctionRows = await DatosUsuarioAlergia.findAll({
      where: { id_datos_usuario: datosUsuario.id_datos_usuario }
    });
    console.log(`\n✅ Junction table rows for datos_usuario ${datosUsuario.id_datos_usuario}:`, junctionRows.length);
    junctionRows.forEach(r => console.log('  ->', r.toJSON()));

    // 6. Read back with include
    const datosWithAlergias = await DatosUsuario.findByPk(datosUsuario.id_datos_usuario, {
      include: [{ model: Alergia }]
    });
    const fetchedAlergias = datosWithAlergias.Alergia || datosWithAlergias.Alergias || [];
    console.log(`\n✅ DatosUsuario includes ${fetchedAlergias.length} allergies:`);
    fetchedAlergias.forEach(a => console.log(`  - ${a.nombre}`));

    // 7. Cleanup
    await DatosUsuarioAlergia.destroy({ where: { id_datos_usuario: datosUsuario.id_datos_usuario } });
    await datosUsuario.destroy();
    await Perfil.destroy({ where: { id_usuario: testUser.id_usuario } }).catch(() => {});
    await testUser.destroy();
    console.log('\n✅ Cleanup done');

  } catch (err) {
    console.error('❌ ERROR:', err.message);
    console.error(err.stack);
  } finally {
    process.exit(0);
  }
}

testAllergyFlow();

const fs = require('fs');
const path = require('path');
const { Usuario, DatosUsuario, Ejercicio, Rutina } = require('./src/index');

async function migrateData() {
    try {
        console.log('🔄 Iniciando migración de datos físicos y ejercicios...');
        
        // 1. Leer db.json
        const dbPath = path.resolve(__dirname, '../Front-End/db.json');
        if (!fs.existsSync(dbPath)) {
            throw new Error(`No se encontró el archivo db.json en: ${dbPath}`);
        }
        
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const dbUsers = data.usuarios || [];
        const dbExercises = data.ejercicios || [];
        
        // 2. Insertar/Actualizar Ejercicios
        console.log(`\n📋 Procesando ${dbExercises.length} ejercicios...`);
        for (const ex of dbExercises) {
            const idVal = parseInt(ex.id.replace('e', ''), 10);
            if (isNaN(idVal)) continue;
            
            const exercisePayload = {
                id_ejercicio: idVal,
                nombre: ex.nombre || '',
                nivel: ex.nivel || 'PRINCIPIANTE',
                musculo: ex.musculo || 'PECHO',
                video: ex.videoUrl || '',
                videoUrl: ex.videoUrl || '',
                imagen: ex.imagen || '',
                tiempo: ex.tiempo || '45 SEG',
                repeticiones: 12,
                series: 4
            };
            
            let dbEx = await Ejercicio.findByPk(idVal);
            if (dbEx) {
                await dbEx.update(exercisePayload);
            } else {
                await Ejercicio.create(exercisePayload);
            }
        }
        console.log('✅ Ejercicios migrados correctamente.');

        // 3. Migrar Datos Físicos y Rutinas por Usuario
        console.log(`\n👤 Procesando ${dbUsers.length} usuarios...`);
        for (const u of dbUsers) {
            const email = u.email;
            if (!email) continue;

            const user = await Usuario.findOne({ where: { correo: email } });
            if (!user) {
                console.log(`⚠️ Usuario con correo ${email} no encontrado en la base de datos MySQL, omitiendo.`);
                continue;
            }

            // Datos Físicos
            const physicalPayload = {
                sexo: u.sexo || 'm',
                altura: parseFloat(u.altura) || 170.0,
                peso: parseFloat(u.peso) || 70.0,
                lugar_entrenamiento: u.lugarEntrenamiento || 'gym',
                peso_meta: parseFloat(u.pesoMeta) || 65.0,
                plazo_semanas: parseInt(u.plazoSemanas, 10) || 8,
                deficit_estimado: parseInt(u.deficitEstimado, 10) || 450,
                imagen: u.avatar || '',
                semanas_progreso: parseInt(u.semanasEnProgreso, 10) || 1,
                feedback_dieta: u.ultimoFeedbackDieta || 'Ninguno',
                feedback_ejercicio: u.ultimoFeedbackEjercicio || 'Ninguno',
                id_usuario: user.id_usuario
            };

            let datosUsuario = await DatosUsuario.findOne({ where: { id_usuario: user.id_usuario } });
            if (datosUsuario) {
                await datosUsuario.update(physicalPayload);
            } else {
                datosUsuario = await DatosUsuario.create(physicalPayload);
            }

            // Rutinas (Ejercicios elegidos)
            if (u.ejerciciosElegidos && Array.isArray(u.ejerciciosElegidos)) {
                const exerciseIds = u.ejerciciosElegidos
                    .map(idStr => parseInt(idStr.replace('e', ''), 10))
                    .filter(idNum => !isNaN(idNum));

                if (exerciseIds.length > 0) {
                    let rutina = await Rutina.findOne({ where: { id_datos_usuario: datosUsuario.id_datos_usuario } });
                    if (!rutina) {
                        rutina = await Rutina.create({ id_datos_usuario: datosUsuario.id_datos_usuario });
                    }
                    
                    const actualExercises = await Ejercicio.findAll({ where: { id_ejercicio: exerciseIds } });
                    await rutina.setEjercicios(actualExercises);
                }
            }
            
            console.log(`✅ Datos físicos y rutina migrados para: ${user.nombre} (${email})`);
        }

        console.log('\n🎉 ¡Proceso de migración completado con éxito!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error durante la migración:', err);
        process.exit(1);
    }
}

migrateData();

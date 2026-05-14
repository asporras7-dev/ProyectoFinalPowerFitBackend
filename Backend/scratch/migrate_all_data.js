const fs = require('fs');
const path = require('path');
const { 
    Usuario, Rol, Publicacion, Ejercicio, CategoriaPublicacion, 
    TemaEnTendencia, Contribuidor, RolContribuidor, Comentario,
    DatosUsuario, Rutina, RutinaEjercicio, Perfil, PerfilSeguidores,
    MensajeContacto, sequelize 
} = require('../src/index');

async function migrate() {
    try {
        const dbPath = path.join(__dirname, '../../Front-End/db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

        console.log('--- INICIANDO MIGRACIÓN COMPLETA ---');

        // 1. Limpiar todas las tablas (con cuidado por las FK)
        console.log('Limpiando tablas...');
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        const tables = [
            'Rutina_Ejercicios', 'Rutina', 'datos_Usuario_Alergias', 'datos_Usuario', 
            'publicaciones_Comentarios', 'likes_publicaciones', 'Comentario', 
            'publicaciones', 'Perfil_has_Perfil', 'Perfil', 'Usuario', 'Ejercicios',
            'mensajes_Contacto', 'temaEnTendencia', 'Contribuidor', 'rol_Contribuidor',
            'categoria_Publicaciones', 'Rol'
        ];
        for (const table of tables) {
            await sequelize.query(`DELETE FROM ${table}`);
        }
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        // 2. Roles
        console.log('Migrando Roles...');
        const adminRol = await Rol.create({ nombre: 'admin' });
        const clientRol = await Rol.create({ nombre: 'client' });

        // 3. Categorías de Publicaciones
        console.log('Migrando Categorías...');
        const categoriesMap = {};
        const cats = ['Pérdida de Peso', 'Ganancia de Músculo', 'Consejos de Expertos', 'Nutrición'];
        for (const catName of cats) {
            const cat = await CategoriaPublicacion.create({ nombre: catName });
            categoriesMap[catName] = cat.idcategoria_Publicaciones;
        }

        // 4. Ejercicios
        console.log('Migrando Ejercicios...');
        const exercisesMap = {}; // jsonId -> mysqlId
        for (const e of dbData.ejercicios) {
            const created = await Ejercicio.create({
                nombre: e.nombre,
                musculo: e.musculo,
                nivel: e.nivel,
                tiempo: e.tiempo,
                imagen: e.imagen,
                video: e.videoUrl,
                videoUrl: e.videoUrl
            });
            exercisesMap[e.id] = created.idEjercicios;
        }

        // 5. Usuarios y Perfiles
        console.log('Migrando Usuarios y sus datos...');
        const usersMap = {}; // jsonId -> mysqlId
        const profilesMap = {}; // jsonId -> mysqlId (perfil)
        
        for (const u of dbData.usuarios) {
            // Crear Usuario
            const user = await Usuario.create({
                nombre: u.nombre,
                correo: u.email,
                contrasenia: u.password,
                Rol_idRol: u.rol === 'admin' ? adminRol.idRol : clientRol.idRol,
                avatar: u.avatar || ''
            });
            usersMap[u.id] = user.idUsuario;

            // Crear Perfil
            const profile = await Perfil.create({
                Usuario_idUsuario: user.idUsuario,
                biografia: 'Miembro de PowerFit',
                foto_Perfil: u.avatar || '',
                foto_Portada: u.cover || ''
            });
            profilesMap[u.id] = profile.idPerfil;

            // Crear DatosUsuario (Dashboard data)
            const datos = await DatosUsuario.create({
                Usuario_idUsuario: user.idUsuario,
                edad: parseInt(u.edad) || 0,
                sexo: u.sexo || 'm',
                altura: parseInt(u.altura) || 0,
                peso: parseFloat(u.peso) || 0,
                lugarEntrenamiento: u.lugarEntrenamiento || 'gym',
                pesoMeta: parseFloat(u.pesoMeta) || 0,
                plazoSemanas: parseInt(u.plazoSemanas) || 0,
                pesoActual: parseFloat(u.pesoActual) || 0,
                deficitEstimado: parseFloat(u.deficitEstimado) || 0
            });

            // Crear Rutina y Ejercicios Elegidos
            if (u.ejerciciosElegidos && u.ejerciciosElegidos.length > 0) {
                const rutina = await Rutina.create({
                    datos_Usuario_iddatos_Usuario: datos.iddatos_Usuario
                });
                for (const exId of u.ejerciciosElegidos) {
                    const mysqlExId = exercisesMap[exId];
                    if (mysqlExId) {
                        await RutinaEjercicio.create({
                            rut_id: rutina.idRutina,
                            ej_id: mysqlExId,
                            repeticiones: 12,
                            sets: '4',
                            tiempo_Entre_Sets: '60 SEG'
                        });
                    }
                }
            }
        }

        // 6. Seguidores (Following)
        console.log('Migrando Relaciones de Seguimiento...');
        for (const u of dbData.usuarios) {
            if (u.following && u.following.length > 0) {
                const myProfileId = profilesMap[u.id];
                for (const targetId of u.following) {
                    const targetProfileId = profilesMap[targetId];
                    if (myProfileId && targetProfileId) {
                        await PerfilSeguidores.create({
                            p_id: myProfileId,
                            s_id: targetProfileId
                        });
                    }
                }
            }
        }

        // 7. Stories (Publicaciones)
        console.log('Migrando Historias...');
        const storiesMap = {}; // jsonId -> mysqlId
        for (const s of dbData.stories) {
            const mysqlUserId = usersMap[s.userId] || usersMap[Object.keys(usersMap)[0]]; // Fallback to first user if not found
            const created = await Publicacion.create({
                titulo: s.title,
                texto: s.text,
                imagen: s.image || s.imageAfter || '',
                likes: s.likes || 0,
                Usuario_idUsuario: mysqlUserId,
                categoria_Publicaciones_idcategoria_Publicaciones: categoriesMap[s.category] || categoriesMap['Pérdida de Peso'],
                tiempo_Publicacion: new Date().toISOString()
            });
            storiesMap[s.id] = created.idpublicaciones;
        }

        // 8. Comentarios
        console.log('Migrando Comentarios...');
        for (const c of dbData.comentarios) {
            const mysqlUserId = usersMap[c.userId];
            const mysqlStoryId = storiesMap[c.storyId];
            if (mysqlUserId && mysqlStoryId) {
                const comm = await Comentario.create({
                    Usuario_idUsuario: mysqlUserId,
                    contenido: c.text,
                    fecha: c.fecha || new Date().toISOString()
                });
                // Note: The bridge table publicaciones_Comentarios might need an entry if using Many-to-Many
                // Assuming it's needed based on index.js associations
                await sequelize.query(`INSERT INTO publicaciones_Comentarios (publicaciones_idpublicaciones, Comentario_idComentario) VALUES (${mysqlStoryId}, ${comm.idComentario})`);
            }
        }

        // 9. Contactos
        console.log('Migrando Mensajes de Contacto...');
        for (const con of dbData.contactos) {
            await MensajeContacto.create({
                nombre: con.nombre,
                correo: con.email,
                mensaje: con.mensaje,
                Usuario_idUsuario: usersMap[Object.keys(usersMap)[0]] // Assign to first user as placeholder
            });
        }

        // 10. Trending Topics
        console.log('Migrando Temas en Tendencia...');
        for (const t of dbData.trendingTopics) {
            await TemaEnTendencia.create({
                tema: t.topic,
                miembros: t.count
            });
        }

        console.log('--- MIGRACIÓN COMPLETADA EXITOSAMENTE ---');

    } catch (error) {
        console.error('Error en la migración:', error);
    } finally {
        await sequelize.close();
    }
}

migrate();

const { sequelize, Usuario, Rol, Publicacion, CategoriaPublicacion, Ejercicio, MensajeContacto, Contribuidor, RolContribuidor, TemaEnTendencia } = require('../src/index');
const fs = require('fs');
const path = require('path');

async function seed() {
    try {
        const dbPath = path.resolve(__dirname, '../../Front-End/db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

        console.log('--- INICIANDO MIGRACIÓN DE DATOS A MYSQL ---');

        // 1. Roles
        console.log('Migrando Roles...');
        const adminRol = await Rol.findOrCreate({ where: { nombre: 'admin' }, defaults: { descripcion: 'Administrador del sistema' } });
        const clientRol = await Rol.findOrCreate({ where: { nombre: 'client' }, defaults: { descripcion: 'Usuario cliente' } });
        const adminId = adminRol[0].idRol;
        const clientId = clientRol[0].idRol;

        // 2. Usuarios
        console.log('Migrando Usuarios...');
        for (const u of dbData.usuarios) {
            await Usuario.findOrCreate({
                where: { correo: u.email },
                defaults: {
                    nombre: u.nombre,
                    contrasenia: u.password,
                    edad: parseInt(u.edad) || null,
                    Rol_idRol: u.rol === 'admin' ? adminId : clientId
                }
            });
        }

        // 3. Categorías de Publicación
        console.log('Migrando Categorías...');
        const categories = [...new Set(dbData.stories.map(s => s.category))];
        const categoryMap = {};
        for (const catName of categories) {
            const cat = await CategoriaPublicacion.findOrCreate({ where: { nombre: catName } });
            categoryMap[catName] = cat[0].idcategoria_Publicaciones;
        }

        // 4. Publicaciones (Stories)
        console.log('Migrando Publicaciones...');
        const usuariosDB = await Usuario.findAll();
        const userMap = {};
        usuariosDB.forEach(u => { userMap[u.correo] = u.idUsuario; });

        for (const s of dbData.stories) {
            // Find owner in dbData to get email, then map to DB ID
            const originalUser = dbData.usuarios.find(u => u.id === s.userId);
            const dbUserId = originalUser ? userMap[originalUser.email] : usuariosDB[0].idUsuario;

            await Publicacion.create({
                titulo: s.title,
                texto: s.text,
                imagen: s.image || s.imageAfter || null,
                tiempo_Publicacion: s.fecha || new Date().toISOString(),
                categoria_Publicaciones_idcategoria_Publicaciones: categoryMap[s.category] || 1,
                Usuario_idUsuario: dbUserId
            });
        }

        // 5. Ejercicios
        console.log('Migrando Ejercicios...');
        await Ejercicio.destroy({ where: {}, truncate: false, cascade: false }); // Clear existing to avoid missing fields
        for (const e of dbData.ejercicios) {
            await Ejercicio.create({
                nombre: e.nombre,
                musculo: e.musculo,
                nivel: e.nivel,
                tiempo: e.tiempo,
                imagen: e.imagen,
                videoUrl: e.videoUrl,
                video: e.videoUrl // Fallback for model field 'video'
            });
        }

        console.log('--- MIGRACIÓN COMPLETADA CON ÉXITO ---');
    } catch (error) {
        console.error('ERROR EN LA MIGRACIÓN:', error);
    } finally {
        await sequelize.close();
    }
}

seed();

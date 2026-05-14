const Usuario = require('../models/Usuario');

const UsuarioController = {
    getAll: async (req, res) => {
        try {
            const { page, limit } = req.query;
            if (page && limit) {
                const limitNum = parseInt(limit, 10) || 10;
                const offsetNum = (parseInt(page, 10) - 1) * limitNum;
                const { count, rows } = await Usuario.findAndCountAll({
                    limit: limitNum,
                    offset: offsetNum
                });
                return res.status(200).json({
                    data: rows,
                    total: count,
                    totalPages: Math.ceil(count / limitNum),
                    currentPage: parseInt(page, 10) || 1
                });
            }

            const usuarios = await Usuario.findAll();

            if (!usuarios || usuarios.length === 0) {
                return res.status(404).json({ message: "No se encontraron usuarios" });
            }
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const { Rol, DatosUsuario, Perfil, Rutina, Ejercicio } = require('../index');
            const usuario = await Usuario.findByPk(id, {
                include: [
                    { model: Rol },
                    { 
                        model: DatosUsuario,
                        include: [{
                            model: Rutina,
                            include: [{ model: Ejercicio }]
                        }]
                    },
                    { 
                        model: Perfil,
                        include: [
                            { model: Perfil, as: 'Followers' },
                            { model: Perfil, as: 'Following' }
                        ]
                    }
                ]
            });

            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const { correo, contrasenia, nombre, edad, Rol_idRol } = req.body;

            if (!correo || !contrasenia || !nombre) {
                return res.status(400).json({ error: 'El correo, contrasenia, nombre es requerido' });
            }

            const nuevo = await Usuario.create({ correo, contrasenia, nombre, edad, Rol_idRol });
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { correo, contrasenia, nombre, edad, Rol_idRol } = req.body;
            const usuario = await Usuario.findByPk(id);

            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            if (!correo || !contrasenia || !nombre) {
                return res.status(400).json({ error: 'El correo, contrasenia, nombre es requerido' });
            }

            await usuario.update({ correo, contrasenia, nombre, edad, Rol_idRol });

            const { DatosUsuario, Perfil } = require('../index');

            // Update or Create DatosUsuario if fields are present
            let datosUsuario = await DatosUsuario.findOne({ where: { Usuario_idUsuario: id } });
            
            const updateData = {};
            if (req.body.peso !== undefined) updateData.peso = req.body.peso;
            if (req.body.pesoActual !== undefined) updateData.peso = req.body.pesoActual; 
            if (req.body.pesoMeta !== undefined) updateData.pesoMeta = req.body.pesoMeta;
            if (req.body.altura !== undefined) updateData.altura = req.body.altura;
            if (req.body.plazoSemanas !== undefined) updateData.plazoSemanas = req.body.plazoSemanas;
            if (req.body.deficitEstimado !== undefined) updateData.decifitEstimado = req.body.deficitEstimado;
            if (req.body.semanasEnProgreso !== undefined) updateData.semanas_En_Progreso = req.body.semanasEnProgreso;
            if (req.body.ultimoFeedbackDieta !== undefined) updateData.ultimo_Feedback_Dieta = req.body.ultimoFeedbackDieta;
            if (req.body.ultimoFeedbackEjercicio !== undefined) updateData.ultimo_Feedback_Ejercicio = req.body.ultimoFeedbackEjercicio;
            if (req.body.sexo !== undefined) updateData.sexo = req.body.sexo;
            if (req.body.lugarEntrenamiento !== undefined) updateData.lugarEntrenamiento = req.body.lugarEntrenamiento;

            if (Object.keys(updateData).length > 0) {
                if (datosUsuario) {
                    await datosUsuario.update(updateData);
                } else {
                    await DatosUsuario.create({ ...updateData, Usuario_idUsuario: id });
                }
            }

            // Update or Create Perfil if fields are present
            let perfil = await Perfil.findOne({ where: { Usuario_idUsuario: id } });
            
            const perfilUpdate = {};
            if (req.body.avatar !== undefined) perfilUpdate.foto_Perfil = req.body.avatar;
            if (req.body.cover !== undefined) perfilUpdate.foto_Portada = req.body.cover;
            
            if (Object.keys(perfilUpdate).length > 0) {
                if (perfil) {
                    await perfil.update(perfilUpdate);
                } else {
                    perfil = await Perfil.create({ ...perfilUpdate, Usuario_idUsuario: id, biografia: 'Miembro de PowerFit' });
                }
            }

            // Update followers/following if provided
            if (req.body.following && Array.isArray(req.body.following)) {
                const followingPerfiles = await Perfil.findAll({
                    where: { Usuario_idUsuario: req.body.following }
                });
                if (perfil) await perfil.setFollowing(followingPerfiles);
            }

            if (req.body.followers && Array.isArray(req.body.followers)) {
                const followerPerfiles = await Perfil.findAll({
                    where: { Usuario_idUsuario: req.body.followers }
                });
                if (perfil) await perfil.setFollowers(followerPerfiles);
            }

            // Update ejercicios elegidos (Rutina)
            if (req.body.ejerciciosElegidos && Array.isArray(req.body.ejerciciosElegidos)) {
                const { Rutina } = require('../index');
                if (!datosUsuario) {
                    datosUsuario = await DatosUsuario.create({ Usuario_idUsuario: id });
                }
                
                let rutina = await Rutina.findOne({ where: { datos_Usuario_iddatos_Usuario: datosUsuario.iddatos_Usuario } });
                if (!rutina) {
                    rutina = await Rutina.create({ datos_Usuario_iddatos_Usuario: datosUsuario.iddatos_Usuario });
                }

                await rutina.setEjercicios(req.body.ejerciciosElegidos);
            }

            // Re-fetch the updated user with associations
            const { Rutina, Ejercicio } = require('../index');
            const updatedUser = await Usuario.findByPk(id, {
                include: [
                    { model: require('../index').Rol },
                    { 
                        model: DatosUsuario,
                        include: [{
                            model: Rutina,
                            include: [{ model: Ejercicio }]
                        }]
                    },
                    { 
                        model: Perfil,
                        include: [
                            { model: Perfil, as: 'Followers' },
                            { model: Perfil, as: 'Following' }
                        ]
                    }
                ]
            });

            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { correo, contrasenia } = req.body;
            if (!correo || !contrasenia) {
                return res.status(400).json({ error: 'Correo y contrasenia son requeridos' });
            }

            const { Rol, DatosUsuario, Perfil, Rutina, Ejercicio } = require('../index');
            const usuario = await Usuario.findOne({ 
                where: { correo, contrasenia },
                include: [
                    { model: Rol },
                    { 
                        model: DatosUsuario,
                        include: [{
                            model: Rutina,
                            include: [{ model: Ejercicio }]
                        }]
                    },
                    { 
                        model: Perfil,
                        include: [
                            { model: Perfil, as: 'Followers' },
                            { model: Perfil, as: 'Following' }
                        ]
                    }
                ]
            });

            if (!usuario) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(id);

            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            await usuario.destroy();
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = UsuarioController;

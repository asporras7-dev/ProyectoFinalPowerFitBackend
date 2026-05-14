const sequelize = require('./config/db');

// Import models
const Usuario = require('./models/Usuario');
const Rol = require('./models/Rol');
const Perfil = require('./models/Perfil');
const PerfilSeguidores = require('./models/PerfilSeguidores');
const Publicacion = require('./models/Publicacion');
const CategoriaPublicacion = require('./models/CategoriaPublicacion');
const Like = require('./models/Like');
const Comentario = require('./models/Comentario');
const PublicacionComentario = require('./models/PublicacionComentario');
const LikePublicacion = require('./models/LikePublicacion');
const Contribuidor = require('./models/Contribuidor');
const RolContribuidor = require('./models/RolContribuidor');
const TemaEnTendencia = require('./models/TemaEnTendencia');
const Reporte = require('./models/Reporte');
const RazonReporte = require('./models/RazonReporte');
const DetalleRazonReporte = require('./models/DetalleRazonReporte');
const MensajeContacto = require('./models/MensajeContacto');
const DatosUsuario = require('./models/DatosUsuario');
const Alergia = require('./models/Alergia');
const DatosUsuarioAlergia = require('./models/DatosUsuarioAlergia');
const Rutina = require('./models/Rutina');
const Ejercicio = require('./models/Ejercicio');
const RutinaEjercicio = require('./models/RutinaEjercicio');

// Define Associations

// Usuario - Rol
Usuario.belongsTo(Rol, { foreignKey: 'Rol_idRol' });
Rol.hasMany(Usuario, { foreignKey: 'Rol_idRol' });

// Usuario - Perfil
Usuario.hasOne(Perfil, { foreignKey: 'Usuario_idUsuario' });
Perfil.belongsTo(Usuario, { foreignKey: 'Usuario_idUsuario' });

// Usuario - DatosUsuario
Usuario.hasOne(DatosUsuario, { foreignKey: 'Usuario_idUsuario' });
DatosUsuario.belongsTo(Usuario, { foreignKey: 'Usuario_idUsuario' });

// Usuario - Comentario
Usuario.hasMany(Comentario, { foreignKey: 'Usuario_idUsuario' });
Comentario.belongsTo(Usuario, { foreignKey: 'Usuario_idUsuario' });

// Usuario - Publicacion
Usuario.hasMany(Publicacion, { foreignKey: 'Usuario_idUsuario' });
Publicacion.belongsTo(Usuario, { foreignKey: 'Usuario_idUsuario' });

// Usuario - Like
Usuario.hasMany(Like, { foreignKey: 'Usuario_idUsuario' });
Like.belongsTo(Usuario, { foreignKey: 'Usuario_idUsuario' });

// Usuario - MensajeContacto
Usuario.hasMany(MensajeContacto, { foreignKey: 'Usuario_idUsuario' });
MensajeContacto.belongsTo(Usuario, { foreignKey: 'Usuario_idUsuario' });

// Usuario - Contribuidor
Usuario.hasOne(Contribuidor, { foreignKey: 'Usuario_idUsuario' });
Contribuidor.belongsTo(Usuario, { foreignKey: 'Usuario_idUsuario' });

// Usuario - Reporte
Usuario.hasMany(Reporte, { foreignKey: 'Usuario_idUsuario' });
Reporte.belongsTo(Usuario, { foreignKey: 'Usuario_idUsuario' });

// Contribuidor - RolContribuidor
Contribuidor.belongsTo(RolContribuidor, { foreignKey: 'rol_Contribuidor_idrol_Contribuidor' });
RolContribuidor.hasMany(Contribuidor, { foreignKey: 'rol_Contribuidor_idrol_Contribuidor' });

// Publicacion - CategoriaPublicacion
Publicacion.belongsTo(CategoriaPublicacion, { foreignKey: 'categoria_Publicaciones_idcategoria_Publicaciones' });
CategoriaPublicacion.hasMany(Publicacion, { foreignKey: 'categoria_Publicaciones_idcategoria_Publicaciones' });

// Publicacion - Comentario (Many to Many)
Publicacion.belongsToMany(Comentario, { through: PublicacionComentario, foreignKey: 'publicaciones_idpublicaciones' });
Comentario.belongsToMany(Publicacion, { through: PublicacionComentario, foreignKey: 'Comentario_idComentario' });

// Publicacion - Like (Many to Many)
Publicacion.belongsToMany(Like, { through: LikePublicacion, foreignKey: 'publicaciones_idpublicaciones' });
Like.belongsToMany(Publicacion, { through: LikePublicacion, foreignKey: 'likes_idlikes' });

// Publicacion - Reporte
Publicacion.hasMany(Reporte, { foreignKey: 'publicaciones_idpublicaciones' });
Reporte.belongsTo(Publicacion, { foreignKey: 'publicaciones_idpublicaciones' });

// Reporte - RazonReporte
Reporte.belongsTo(RazonReporte, { foreignKey: 'razones_Reporte_idrazones_Reporte' });
RazonReporte.hasMany(Reporte, { foreignKey: 'razones_Reporte_idrazones_Reporte' });

// RazonReporte - DetalleRazonReporte
RazonReporte.belongsTo(DetalleRazonReporte, { foreignKey: 'detalle_Razon_Reporte_iddetalle_Razon_Reporte' });
DetalleRazonReporte.hasMany(RazonReporte, { foreignKey: 'detalle_Razon_Reporte_iddetalle_Razon_Reporte' });

// DatosUsuario - Alergia (Many to Many)
DatosUsuario.belongsToMany(Alergia, { through: DatosUsuarioAlergia, foreignKey: 'datos_Usuario_iddatos_Usuario' });
Alergia.belongsToMany(DatosUsuario, { through: DatosUsuarioAlergia, foreignKey: 'Alergias_idAlergias' });

// DatosUsuario - Rutina
DatosUsuario.hasMany(Rutina, { foreignKey: 'datos_Usuario_iddatos_Usuario' });
Rutina.belongsTo(DatosUsuario, { foreignKey: 'datos_Usuario_iddatos_Usuario' });

// Rutina - Ejercicio (Many to Many)
Rutina.belongsToMany(Ejercicio, { through: RutinaEjercicio, foreignKey: 'Rutina_idRutina' });
Ejercicio.belongsToMany(Rutina, { through: RutinaEjercicio, foreignKey: 'Ejercicios_idEjercicios' });

// Perfil - Perfil (Followers/Following)
Perfil.belongsToMany(Perfil, { 
    through: PerfilSeguidores, 
    as: 'Following', 
    foreignKey: 'Perfil_idPerfil', 
    otherKey: 'Perfil_idPerfil1' 
});
Perfil.belongsToMany(Perfil, { 
    through: PerfilSeguidores, 
    as: 'Followers', 
    foreignKey: 'Perfil_idPerfil1', 
    otherKey: 'Perfil_idPerfil' 
});

module.exports = {
    sequelize,
    Usuario,
    Rol,
    Perfil,
    PerfilSeguidores,
    Publicacion,
    CategoriaPublicacion,
    Like,
    Comentario,
    PublicacionComentario,
    LikePublicacion,
    Contribuidor,
    RolContribuidor,
    TemaEnTendencia,
    Reporte,
    RazonReporte,
    DetalleRazonReporte,
    MensajeContacto,
    DatosUsuario,
    Alergia,
    DatosUsuarioAlergia,
    Rutina,
    Ejercicio,
    RutinaEjercicio
};

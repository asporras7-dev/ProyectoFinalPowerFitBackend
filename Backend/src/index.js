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
Usuario.belongsTo(Rol, { foreignKey: 'id_rol' });
Rol.hasMany(Usuario, { foreignKey: 'id_rol' });

// Usuario - Perfil
Usuario.hasOne(Perfil, { foreignKey: 'id_usuario' });
Perfil.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Usuario - DatosUsuario
Usuario.hasOne(DatosUsuario, { foreignKey: 'id_usuario' });
DatosUsuario.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Usuario - Comentario
Usuario.hasMany(Comentario, { foreignKey: 'id_usuario' });
Comentario.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Usuario - Publicacion
Usuario.hasMany(Publicacion, { foreignKey: 'id_usuario' });
Publicacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Usuario - Like
Usuario.hasMany(Like, { foreignKey: 'id_usuario' });
Like.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Usuario - MensajeContacto
Usuario.hasMany(MensajeContacto, { foreignKey: 'id_usuario' });
MensajeContacto.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Usuario - Contribuidor
Usuario.hasOne(Contribuidor, { foreignKey: 'id_usuario' });
Contribuidor.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Usuario - Reporte
Usuario.hasMany(Reporte, { foreignKey: 'id_usuario' });
Reporte.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Contribuidor - RolContribuidor
Contribuidor.belongsTo(RolContribuidor, { foreignKey: 'id_rol_contribuidor' });
RolContribuidor.hasMany(Contribuidor, { foreignKey: 'id_rol_contribuidor' });

// Publicacion - CategoriaPublicacion
Publicacion.belongsTo(CategoriaPublicacion, { foreignKey: 'id_categoria' });
CategoriaPublicacion.hasMany(Publicacion, { foreignKey: 'id_categoria' });

// Publicacion - Comentario (Many to Many)
Publicacion.belongsToMany(Comentario, { through: PublicacionComentario, foreignKey: 'id_publicacion', otherKey: 'id_comentario', uniqueKey: 'pub_com_unique' });
Comentario.belongsToMany(Publicacion, { through: PublicacionComentario, foreignKey: 'id_comentario', otherKey: 'id_publicacion', uniqueKey: 'pub_com_unique' });

// Publicacion - Like (Many to Many)
Publicacion.belongsToMany(Like, { through: LikePublicacion, foreignKey: 'id_publicacion', otherKey: 'id_like', uniqueKey: 'pub_like_unique' });
Like.belongsToMany(Publicacion, { through: LikePublicacion, foreignKey: 'id_like', otherKey: 'id_publicacion', uniqueKey: 'pub_like_unique' });

// Publicacion - Reporte
Publicacion.hasMany(Reporte, { foreignKey: 'id_publicacion' });
Reporte.belongsTo(Publicacion, { foreignKey: 'id_publicacion' });

// Reporte - RazonReporte
Reporte.belongsTo(RazonReporte, { foreignKey: 'id_razon' });
RazonReporte.hasMany(Reporte, { foreignKey: 'id_razon' });

// RazonReporte - DetalleRazonReporte
RazonReporte.belongsTo(DetalleRazonReporte, { foreignKey: 'id_detalle_razon' });
DetalleRazonReporte.hasMany(RazonReporte, { foreignKey: 'id_detalle_razon' });

// DatosUsuario - Alergia (Many to Many)
DatosUsuario.belongsToMany(Alergia, { through: DatosUsuarioAlergia, foreignKey: 'id_datos_usuario', otherKey: 'id_alergia', uniqueKey: 'user_alergia_unique' });
Alergia.belongsToMany(DatosUsuario, { through: DatosUsuarioAlergia, foreignKey: 'id_alergia', otherKey: 'id_datos_usuario', uniqueKey: 'user_alergia_unique' });

// DatosUsuario - Rutina
DatosUsuario.hasMany(Rutina, { foreignKey: 'id_datos_usuario' });
Rutina.belongsTo(DatosUsuario, { foreignKey: 'id_datos_usuario' });

// Rutina - Ejercicio (Many to Many)
Rutina.belongsToMany(Ejercicio, { through: RutinaEjercicio, foreignKey: 'id_rutina', otherKey: 'id_ejercicio', uniqueKey: 'rut_ej_unique' });
Ejercicio.belongsToMany(Rutina, { through: RutinaEjercicio, foreignKey: 'id_ejercicio', otherKey: 'id_rutina', uniqueKey: 'rut_ej_unique' });

// Perfil - Perfil (Followers/Following)
Perfil.belongsToMany(Perfil, { 
    through: PerfilSeguidores, 
    as: 'Following', 
    foreignKey: 'id_perfil', 
    otherKey: 'id_seguidor',
    uniqueKey: 'perf_seg_unique'
});
Perfil.belongsToMany(Perfil, { 
    through: PerfilSeguidores, 
    as: 'Followers', 
    foreignKey: 'id_seguidor', 
    otherKey: 'id_perfil',
    uniqueKey: 'perf_seg_unique'
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

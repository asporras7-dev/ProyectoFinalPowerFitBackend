const express = require('express');
const cors = require('cors');
const { sequelize } = require('./index');
const config = require('./config/config');

const app = express();

app.use(cors());
app.use(express.json());

// Import Routes
const UsuarioRoutes = require('./routes/UsuarioRoutes');
const RolRoutes = require('./routes/RolRoutes');
const PerfilRoutes = require('./routes/PerfilRoutes');
const PublicacionRoutes = require('./routes/PublicacionRoutes');
const CategoriaPublicacionRoutes = require('./routes/CategoriaPublicacionRoutes');
const LikeRoutes = require('./routes/LikeRoutes');
const ComentarioRoutes = require('./routes/ComentarioRoutes');
const ContribuidorRoutes = require('./routes/ContribuidorRoutes');
const RolContribuidorRoutes = require('./routes/RolContribuidorRoutes');
const TemaEnTendenciaRoutes = require('./routes/TemaEnTendenciaRoutes');
const ReporteRoutes = require('./routes/ReporteRoutes');
const RazonReporteRoutes = require('./routes/RazonReporteRoutes');
const DetalleRazonReporteRoutes = require('./routes/DetalleRazonReporteRoutes');
const MensajeContactoRoutes = require('./routes/MensajeContactoRoutes');
const DatosUsuarioRoutes = require('./routes/DatosUsuarioRoutes');
const AlergiaRoutes = require('./routes/AlergiaRoutes');
const RutinaRoutes = require('./routes/RutinaRoutes');
const EjercicioRoutes = require('./routes/EjercicioRoutes');

// Use Routes
app.use('/api/usuarios', UsuarioRoutes);
app.use('/api/roles', RolRoutes);
app.use('/api/perfiles', PerfilRoutes);
app.use('/api/publicaciones', PublicacionRoutes);
app.use('/api/categorias', CategoriaPublicacionRoutes);
app.use('/api/likes', LikeRoutes);
app.use('/api/comentarios', ComentarioRoutes);
app.use('/api/contribuidores', ContribuidorRoutes);
app.use('/api/roles-contribuidor', RolContribuidorRoutes);
app.use('/api/temas', TemaEnTendenciaRoutes);
app.use('/api/reportes', ReporteRoutes);
app.use('/api/razones-reporte', RazonReporteRoutes);
app.use('/api/detalles-reporte', DetalleRazonReporteRoutes);
app.use('/api/mensajes', MensajeContactoRoutes);
app.use('/api/datos-usuario', DatosUsuarioRoutes);
app.use('/api/alergias', AlergiaRoutes);
app.use('/api/rutinas', RutinaRoutes);
app.use('/api/ejercicios', EjercicioRoutes);

const PORT = config.server.port || 3000;

if (process.env.NODE_ENV !== 'test') {
    sequelize.sync({ force: false })
        .then(() => {
            console.log('Database connected and synced');
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}

module.exports = app;


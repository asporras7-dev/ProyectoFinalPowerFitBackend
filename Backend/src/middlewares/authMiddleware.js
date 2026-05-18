const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        // Asume formato "Bearer <token>"
        const tokenLimpio = token.startsWith('Bearer ') ? token.slice(7) : token;
        
        // Verifica el token usando la clave secreta
        const payload = jwt.verify(tokenLimpio, process.env.JWT_SECRET || 'mi_secreto_super_seguro_123');
        
        // Guarda los datos del usuario en la request para que la siguiente función los pueda usar
        req.usuario = payload;
        
        next(); // Pasa al siguiente middleware o ruta
    } catch (error) {
        res.status(401).json({ error: 'Token no válido o expirado.' });
    }
};

const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({ error: 'Usuario no autenticado.' });
        }

        // Verifica si el rol del usuario está dentro de la lista de roles permitidos
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ 
                error: 'Acceso denegado. No tienes permisos suficientes para esta acción.' 
            });
        }

        next();
    };
};

module.exports = {
    verificarToken,
    verificarRol
};

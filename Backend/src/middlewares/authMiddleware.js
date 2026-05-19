const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado. Acceso denegado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'powerfit_default_secret');
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ error: 'La sesión ha expirado. Inicia sesión nuevamente.' });
        }
        return res.status(403).json({ error: 'Token inválido.' });
    }
};

module.exports = { verifyToken };

import { JwtService } from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
        return res.status(401).json({
            message: 'Token no proporcionado'
        });
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
        return res.status(401).json({
            message: 'Formato de token inválido'
        });
    }

    const payload = JwtService.verifyToken(token);

    if (!payload || typeof payload !== 'object') {
        return res.status(403).json({
            message: 'Token inválido o expirado'
        });
    }

    req.user = payload;
    return next();
};

import { JwtService } from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Token no proporcionado'
        });
    }

    const token = authHeader.split(' ')[1];
    const payload = JwtService.verifyToken(token);

    if (!payload) {
        return res.status(403).json({
            message: 'Token inválido o expirado'
        });
    }

    req.user = payload;
    return next();
};

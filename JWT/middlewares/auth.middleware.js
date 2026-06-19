import { JwtService } from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Token no proporcionado'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = JwtService.verifyToken(token);
        req.user = payload;
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({
                message: 'Token expirado'
            });
        }

        if (error.name === 'JsonWebTokenError' && error.message.includes('algorithm')) {
            return res.status(403).json({
                message: 'Algoritmo de token inválido'
            });
        }

        return res.status(403).json({
            message: 'Token inválido'
        });
    }
};

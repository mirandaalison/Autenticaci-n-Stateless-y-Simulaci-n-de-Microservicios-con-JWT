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

    try {
        const payload = JwtService.verifyToken(token);

        if (!payload || typeof payload !== 'object') {
            return res.status(403).json({
                message: 'Token inválido o expirado'
            });
        }

        req.user = payload;
        return next();
    } catch (error) {
        if (error?.name === 'JsonWebTokenError') {
            return res.status(403).json({
                message: 'Algoritmo inválido o firma incorrecta'
            });
        }

        if (error?.name === 'TokenExpiredError') {
            return res.status(403).json({
                message: 'Token expirado'
            });
        }

        return res.status(403).json({
            message: 'Error al verificar el token'
        });
    }
};

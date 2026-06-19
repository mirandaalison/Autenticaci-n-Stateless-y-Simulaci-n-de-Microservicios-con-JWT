import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export class JwtService {
    /**
     * Firma un token JWT basándose en el algoritmo configurado.
     * @param {Object} user - Datos básicos del usuario.
     * @returns {string} El token JWT generado.
     */
    static signToken(user) {
        const payload = {
            sub: user.id || user.sub,
            name: user.name || user.fullName || user.username,
            exp: Math.floor(Date.now() / 1000) + 60
        };

        const secretOrKey = config.ALGORITHM === 'RS256'
            ? config.PRIVATE_KEY
            : config.JWT_SECRET;

        return jwt.sign(payload, secretOrKey, {
            algorithm: config.ALGORITHM
        });
    }

    /**
     * Verifica un token JWT basándose en el algoritmo configurado.
     * @param {string} token - El token JWT a verificar.
     * @returns {Object} El payload decodificado.
     */
    static verifyToken(token) {
        const secretOrKey = config.ALGORITHM === 'RS256'
            ? config.PUBLIC_KEY
            : config.JWT_SECRET;

        return jwt.verify(token, secretOrKey, {
            algorithms: [config.ALGORITHM]
        });
    }
}

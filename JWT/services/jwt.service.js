import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export class JwtService {
    /**
     * Construye un payload compacto con los claims estándar requeridos
     * y firma el token usando la clave adecuada según la configuración.
     * @param {Object} user - Datos del usuario.
     * @returns {string} El token JWT generado.
     */
    static signToken(user) {
        const oneMinuteFromNow = Math.floor(Date.now() / 1000) + 60;
        const payload = {
            sub: user?.id ?? user?.sub ?? user?.username,
            name: user?.name ?? user?.username,
            exp: oneMinuteFromNow
        };

        const secretOrPrivateKey = config.ALGORITHM === 'RS256'
            ? config.PRIVATE_KEY
            : config.JWT_SECRET;

        return jwt.sign(payload, secretOrPrivateKey, {
            algorithm: config.ALGORITHM
        });
    }

    /**
     * Verifica un token JWT utilizando la llave pública o secreta según
     * la configuración establecida.
     * @param {string} token - El token JWT a verificar.
     * @returns {Object|null} El payload decodificado o null si es inválido.
     */
    static verifyToken(token) {
        const secretOrPublicKey = config.ALGORITHM === 'RS256'
            ? config.PUBLIC_KEY
            : config.JWT_SECRET;

        try {
            return jwt.verify(token, secretOrPublicKey, {
                algorithms: [config.ALGORITHM]
            });
        } catch (error) {
            return null;
        }
    }
}

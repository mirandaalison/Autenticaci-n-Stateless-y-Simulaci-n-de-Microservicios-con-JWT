import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export class JwtService {
    /**
     * Firma un token JWT basándose en el algoritmo configurado.
     * @param {Object} payload - Los datos del usuario a incluir en el token.
     * @returns {string} El token JWT generado.
     */
    static signToken(payload) {
        const secretOrPrivateKey = config.ALGORITHM === 'RS256'
            ? config.PRIVATE_KEY
            : config.JWT_SECRET;

        return jwt.sign(payload, secretOrPrivateKey, {
            algorithm: config.ALGORITHM,
            expiresIn: '1h'
        });
    }

    /**
     * Verifica un token JWT basándose en el algoritmo configurado.
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

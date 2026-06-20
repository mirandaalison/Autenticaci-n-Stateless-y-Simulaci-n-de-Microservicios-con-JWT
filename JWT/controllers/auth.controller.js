import { JwtService } from '../services/jwt.service.js';

export class AuthController {
    /**
     * Simula un servidor de autenticación que genera un token.
     */
    static async generateToken(req, res) {
        const username = req.body?.username ?? '';
        const password = req.body?.password ?? '';

        console.log('AUTH REQUEST BODY:', req.body);
        console.log('AUTH HEADERS:', req.headers);

        if (!username || !password) {
            return res.status(400).json({
                message: 'username y password son requeridos'
            });
        }

        const isValidCredentials = username === 'admin' && password === '1234';

        if (!isValidCredentials) {
            return res.status(401).json({
                message: 'Credenciales inválidas'
            });
        }

        const user = {
            id: username,
            name: username
        };

        try {
            const token = JwtService.signToken(user);

            return res.status(200).json({
                token,
                message: 'Token generado correctamente'
            });
        } catch (error) {
            console.error('Error al firmar token:', error);
            return res.status(500).json({
                message: 'Error interno al generar el token'
            });
        }
    }
}

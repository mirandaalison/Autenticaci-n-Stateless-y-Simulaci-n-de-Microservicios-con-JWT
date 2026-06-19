import { JwtService } from '../services/jwt.service.js';

export class AuthController {
    /**
     * Simula un servidor de autenticación que genera un token.
     */
    static async generateToken(req, res) {
        const { username, password } = req.body;

        if (username === 'admin' && password === 'admin123') {
            const user = {
                id: 'user-001',
                name: 'Administrador'
            };

            const token = JwtService.signToken(user);
            return res.status(200).json({
                token,
                message: 'Token generado correctamente'
            });
        }

        return res.status(401).json({
            message: 'Credenciales inválidas'
        });
    }
}

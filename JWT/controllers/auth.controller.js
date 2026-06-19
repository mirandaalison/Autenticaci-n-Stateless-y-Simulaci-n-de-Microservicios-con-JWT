import { JwtService } from '../services/jwt.service.js';

export class AuthController {
    /**
     * Simula un servidor de autenticación que genera un token.
     */
    static async generateToken(req, res) {
        const { username, password } = req.body;

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

        const token = JwtService.signToken(user);

        return res.status(200).json({
            token,
            message: 'Token generado correctamente'
        });
    }
}

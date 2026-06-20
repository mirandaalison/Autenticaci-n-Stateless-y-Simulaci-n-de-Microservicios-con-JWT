import * as Sentry from '@sentry/node';

export class ResourceController {
    /**
     * Simula un recurso privado del Microservicio Alpha.
     * Este error debe ser reportado a Sentry como un fallo operacional.
     */
    static getAlphaPrivateData(req, res) {
        throw new Error('Conexión perdida con la BDD');
    }

    /**
     * Simula un recurso privado del Microservicio Beta.
     * Captura explícitamente el error con tags y contexto adicional.
     */
    static getBetaPrivateData(req, res) {
        try {
            const userId = req.user?.sub || req.user?.id || 'unknown';

            if (userId === 'unknown') {
                throw new Error('Usuario no identificado');
            }

            Sentry.setTag('service', 'service-beta');
            Sentry.setTag('endpoint', '/v1/service-beta/private');
            Sentry.setExtra('user_id', userId);
            Sentry.setExtra('jwt_claims', {
                sub: userId
            });

            return res.status(200).json({
                service: 'service-beta',
                message: 'Acceso concedido al Servicio Beta',
                user: req.user
            });
        } catch (err) {
            Sentry.captureException(err);
            return res.status(500).json({
                message: 'Error interno en el servicio beta'
            });
        }
    }
}

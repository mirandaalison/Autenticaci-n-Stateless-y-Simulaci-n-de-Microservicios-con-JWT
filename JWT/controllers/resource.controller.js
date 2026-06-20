import * as Sentry from '@sentry/node';

export class ResourceController {
    /**
     * Simula un recurso privado del Microservicio Alpha.
     * Este error debe ser reportado a Sentry como un fallo operacional.
     */
    static getAlphaPrivateData(req, res, next) {
        const err = new Error('Conexión perdida con la BDD');

        Sentry.withScope((scope) => {
            scope.setTag('service', 'service-alpha');
            scope.setTag('endpoint', '/v1/service-alpha/private');
            scope.setTag('error_type', 'operational_error');
            scope.setContext('request_context', {
                service: 'service-alpha',
                route: '/v1/service-alpha/private'
            });
            scope.setExtra('request_path', req.originalUrl);
            Sentry.captureException(err);
        });

        return next(err);
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

            Sentry.withScope((scope) => {
                scope.setTag('service', 'service-beta');
                scope.setTag('endpoint', '/v1/service-beta/private');
                scope.setTag('event_type', 'beta_success_context');
                scope.setExtra('user_id', userId);
                scope.setExtra('jwt_claims', {
                    sub: userId
                });
                scope.setContext('request_context', {
                    service: 'service-beta',
                    route: '/v1/service-beta/private'
                });
                scope.setExtra('request_path', req.originalUrl);
            });

            return res.status(200).json({
                service: 'service-beta',
                message: 'Acceso concedido al Servicio Beta',
                user: req.user
            });
        } catch (err) {
            Sentry.withScope((scope) => {
                scope.setTag('service', 'service-beta');
                scope.setTag('endpoint', '/v1/service-beta/private');
                scope.setTag('event_type', 'beta_error_context');
                scope.setContext('request_context', {
                    service: 'service-beta',
                    route: '/v1/service-beta/private'
                });
                scope.setExtra('request_path', req.originalUrl);
                scope.setExtra('user_id', req.user?.sub || req.user?.id || 'unknown');
                Sentry.captureException(err);
            });

            return res.status(500).json({
                message: 'Error interno en el servicio beta'
            });
        }
    }
}

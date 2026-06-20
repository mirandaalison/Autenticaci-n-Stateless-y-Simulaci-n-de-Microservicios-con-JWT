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
     */
    static getBetaPrivateData(req, res) {
        return res.status(200).json({
            service: 'service-beta',
            message: 'Acceso concedido al Servicio Beta',
            user: req.user
        });
    }
}

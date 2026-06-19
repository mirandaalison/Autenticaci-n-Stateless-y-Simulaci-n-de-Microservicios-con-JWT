export class ResourceController {
    /**
     * Simula un recurso privado del Microservicio Alpha.
     */
    static getAlphaPrivateData(req, res) {
        return res.status(200).json({
            service: 'service-alpha',
            message: 'Acceso concedido al Servicio Alpha',
            user: req.user
        });
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

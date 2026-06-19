# JWT Stateless, expiración y Refresh Token

## 1) ¿Cómo resolvería un Refresh Token la experiencia del usuario?

Como los JWT son stateless, el servidor no guarda una sesión activa por usuario. Esto significa que, cuando el access token expira (en este caso en 1 minuto), el cliente debe obtener uno nuevo antes de poder seguir consumiendo recursos protegidos.

La implementación teórica de un Refresh Token permite resolver esto de forma segura porque:

- El **Access Token** se usa para acceder rápidamente a los recursos protegidos y tiene una vida corta.
- El **Refresh Token** se usa solo para solicitar un nuevo Access Token cuando este ya expiró.
- De esta manera, el usuario no necesita volver a autenticarse cada vez que el Access Token caduca, mejorando la experiencia.
- Como el Refresh Token suele tener una vida más larga, puede usarse para renovar la sesión sin exponer continuamente credenciales sensibles.

En una arquitectura distribuida, esta idea es útil porque cada servicio puede seguir validando el Access Token de forma independiente usando la firma y la clave pública, mientras el servidor de identidad se encarga de emitir y renovar los tokens.

## 2) ¿Dónde se debería almacenar y gestionar el Refresh Token?

Según las buenas prácticas, el Refresh Token no debe almacenarse en el navegador como un dato simple accesible por código JavaScript. Lo ideal es gestionarlo en el lado del servidor mediante:

- **Cookies HttpOnly y Secure**
- con el atributo `SameSite` configurado correctamente
- y, si aplica, con política de `Secure` para garantizar que solo se envíen en conexiones HTTPS

### ¿Por qué?

- La cookie `HttpOnly` evita que el JavaScript del cliente pueda leer el token.
- La cookie `Secure` evita que se transmita sobre HTTP inseguro.
- Esto reduce el riesgo de robo por XSS.

### Ubicación recomendada

- **Servidor**: el ciclo de vida del Refresh Token debe gestionarse desde el servidor.
- **Cliente**: el cliente solo debe recibir y enviar la cookie correspondiente, pero no debería manejar el token directamente como un valor visible o manipulable en el código.

En resumen:

- El **Access Token** se usa en el cliente para llamadas inmediatas.
- El **Refresh Token** se almacena y gestiona de forma segura en el servidor mediante cookies protegidas.
- Esto mantiene la experiencia del usuario fluida sin comprometer la seguridad del ecosistema distribuido.

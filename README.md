# JWT Stateless Authentication Practice

## How to run
1. Run `bash keypair.sh` to generate the RSA keys if they do not exist.
2. Configure `.env` with the correct key paths and `JWT_ALGORITHM=RS256`.
3. Install dependencies with `npm install`.
4. Start the server with `node index.js`.

## Refresh token analysis
1. A refresh token allows the client to obtain a new short-lived access token without forcing the user to re-authenticate every minute. In a stateless JWT setup, the access token can be kept very short-lived for security, while the refresh token is used to renew it securely when needed.
2. The refresh token should be stored and managed on the server side, ideally in an HTTP-only secure cookie or a server-side secure store, because the server must be able to revoke it when the user logs out, when suspicious activity is detected, or when a token is compromised.

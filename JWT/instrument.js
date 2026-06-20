import * as Sentry from '@sentry/node';
import { config } from './config/env.js';

Sentry.init({
    dsn: config.SENTRY_DSN,
    environment: config.SENTRY_ENVIRONMENT,
    dataCollection: {
        // userInfo: false,
        // httpBodies: []
    }
});

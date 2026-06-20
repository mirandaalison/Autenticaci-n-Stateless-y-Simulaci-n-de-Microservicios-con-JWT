import dotenv from 'dotenv';
dotenv.config();

import * as Sentry from '@sentry/node';

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT || 'development',
    enabled: Boolean(process.env.SENTRY_DSN),
    tracesSampleRate: 1.0,
    dataCollection: {
        // userInfo: false,
        // httpBodies: []
    }
});

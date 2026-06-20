import './instrument.js';
import express from 'express';
import * as Sentry from '@sentry/node';
import { config } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import resourceRoutes from './routes/resource.routes.js';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/', resourceRoutes);

app.get('/debug-sentry', async (_req, res) => {
    const err = new Error('Intentional Sentry test error');
    const eventId = Sentry.captureException(err);
    await Sentry.flush(2000);
    console.log(`Sentry test eventId: ${eventId}`);
    return res.status(500).json({
        message: 'Intentional Sentry test error',
        eventId
    });
});

Sentry.setupExpressErrorHandler(app);

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    const eventId = Sentry.captureException(err);
    res.statusCode = 500;
    return res.json({
        message: 'Internal Server Error',
        eventId
    });
});

app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
});

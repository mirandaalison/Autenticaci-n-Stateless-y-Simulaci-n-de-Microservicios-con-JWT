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

app.get('/debug-sentry', (_req, res) => {
    throw new Error('My first Sentry error!');
});

Sentry.setupExpressErrorHandler(app);

app.use((err, req, res, next) => {
    res.statusCode = 500;
    res.end(res.sentry + '\n');
});

app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
});

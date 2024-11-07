import express, { Application } from 'express';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import { sanitizeMiddleware } from './middlewares/sanitize.middleware';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(sanitizeMiddleware(['password', 'hash']));
app.use(express.json());

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;

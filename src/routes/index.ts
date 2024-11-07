import { Router } from 'express';
import userRoutes from './user.routes';
import authRouter from './auth.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/auth', authRouter);

export default routes;

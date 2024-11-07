import express from 'express';
import { login, register } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateUser } from '../middlewares/validation.middleware';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', validateUser, authMiddleware, register);

export default authRouter;

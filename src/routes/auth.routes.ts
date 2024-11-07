import express from 'express';
import { login, register } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateUser } from '../middlewares/validation.middleware';

const authRouter = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT gerado após login
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
authRouter.post('/login', login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 description: Senha do usuário (mínimo 8 caracteres)
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento do usuário
 *               cpf:
 *                 type: string
 *                 description: CPF do usuário
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: E-mail já registrado
 *       500:
 *         description: Erro interno do servidor
 */
authRouter.post('/register', validateUser, authMiddleware, register);

export default authRouter;

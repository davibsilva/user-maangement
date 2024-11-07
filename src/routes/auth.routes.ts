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
 *               cpf:
 *                 type: string
 *                 description: CPF do usuário
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
 *                 description: Nome completo do usuário
 *               cpf:
 *                 type: string
 *                 description: CPF do usuário
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento do usuário
 *               status:
 *                 type: string
 *                 description: Status do usuário (ativo ou inativo)
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 description: Senha do usuário (mínimo de 8 caracteres)
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                     description: Nome da rua do endereço
 *                   number:
 *                     type: string
 *                     description: Número da residência
 *                   complement:
 *                     type: string
 *                     nullable: true
 *                     description: Complemento do endereço (se houver)
 *                   neighborhood:
 *                     type: string
 *                     description: Bairro do endereço
 *                   city:
 *                     type: string
 *                     description: Cidade do endereço
 *                   state:
 *                     type: string
 *                     description: Estado do endereço
 *                   zipCode:
 *                     type: string
 *                     description: CEP do endereço
 *               createdBy:
 *                 type: string
 *                 description: Identificador do criador do usuário (geralmente admin)
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: CPF já registrado
 *       500:
 *         description: Erro interno do servidor
 */
authRouter.post('/register', validateUser, authMiddleware, register);

export default authRouter;

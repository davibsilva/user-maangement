import { Router } from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do usuário
 *                   cpf:
 *                     type: string
 *                     description: CPF do usuário
 *                   name:
 *                     type: string
 *                     description: Nome do usuário
 *                   birthdate:
 *                     type: string
 *                     format: date
 *                     description: Data de nascimento do usuário
 *                   status:
 *                     type: string
 *                     description: Status do usuário ('Ativo' ou Removido')
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Data de criação do usuário
 *                   createdBy:
 *                     type: string
 *                     description: Nome do usuário que criou este usuário
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Data da última atualização do usuário
 *                   updatedBy:
 *                     type: string
 *                     description: Nome do usuário que atualizou o usuário
 *                   removedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Data da remoção do usuário (se aplicável)
 *                   removedBy:
 *                     type: string
 *                     description: Nome do usuário que removeu este usuário (se aplicável)
 *                   address:
 *                     type: object
 *                     properties:
 *                       street:
 *                         type: string
 *                         description: Rua do endereço
 *                       number:
 *                         type: string
 *                         description: Número do endereço
 *                       complement:
 *                         type: string
 *                         description: Complemento do endereço (opcional)
 *                       neighborhood:
 *                         type: string
 *                         description: Bairro do endereço
 *                       city:
 *                         type: string
 *                         description: Cidade do endereço
 *                       state:
 *                         type: string
 *                         description: Estado do endereço
 *                       zipCode:
 *                         type: string
 *                         description: CEP do endereço
 */
router.get('/', authMiddleware, getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Detalhes do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do usuário
 *                 cpf:
 *                   type: string
 *                   description: CPF do usuário
 *                 name:
 *                   type: string
 *                   description: Nome do usuário
 *                 birthdate:
 *                   type: string
 *                   format: date
 *                   description: Data de nascimento do usuário
 *                 status:
 *                   type: string
 *                   description: Status do usuário
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Data de criação do usuário
 *                 createdBy:
 *                   type: string
 *                   description: Nome do usuário que criou o usuário
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Data da última atualização do usuário
 *                 updatedBy:
 *                   type: string
 *                   description: Nome do usuário que fez a última atualização
 *                 removedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Data da remoção do usuário (se aplicável)
 *                 removedBy:
 *                   type: string
 *                   description: Nome do usuário que removeu o usuário (se aplicável)
 *                 address:
 *                   type: object
 *                   properties:
 *                     street:
 *                       type: string
 *                       description: Rua do endereço
 *                     number:
 *                       type: string
 *                       description: Número do endereço
 *                     complement:
 *                       type: string
 *                       description: Complemento do endereço (opcional)
 *                     neighborhood:
 *                       type: string
 *                       description: Bairro do endereço
 *                     city:
 *                       type: string
 *                       description: Cidade do endereço
 *                     state:
 *                       type: string
 *                       description: Estado do endereço
 *                     zipCode:
 *                       type: string
 *                       description: CEP do endereço
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', authMiddleware, getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
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
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento do usuário
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                     description: Rua do endereço
 *                   number:
 *                     type: string
 *                     description: Número do endereço
 *                   complement:
 *                     type: string
 *                     description: Complemento do endereço (opcional)
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
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 description: Senha do usuário (mínimo 8 caracteres)
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', authMiddleware, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', authMiddleware, deleteUser);

export default router;

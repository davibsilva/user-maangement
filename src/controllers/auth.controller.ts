import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const handleError = (res: Response, error: unknown, statusCode = 500) => {
  console.error('Error:', error);
  res.status(statusCode).json({ error: 'Internal server error' });
};

const generateToken = (userId: string, secret: string): string => {
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
};

export async function login(req: Request, res: Response): Promise<void> {
  const { cpf, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    res.status(500).json({ error: 'JWT_SECRET must be provided' });
    return;
  }

  try {
    const user = await userService.verifyPassword(cpf, password);

    if (!user.id) {
      throw new Error('User not found');
    }

    const token = generateToken(user.id, JWT_SECRET);
    res.status(200).json({ token });
  } catch (error: any) {
    handleError(res, error, 401);
  }
}

export async function register(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json({ error: 'Actual user not found' });
    return;
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const user = await userService.createUser(req.body, req.user.id);
    res.status(201).json(user);
  } catch (error) {
    handleError(res, error);
  }
}

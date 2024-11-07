import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { validationResult } from 'express-validator';

const handleValidationError = (res: Response, errors: any) => {
  res.status(400).json({ errors: errors.array() });
};

const handleUnauthorizedError = (res: Response) => {
  res.status(401).json({ error: 'Actual user not found' });
};

export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    handleUnauthorizedError(res);
    return;
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    handleValidationError(res, errors);
    return;
  }

  try {
    const user = await userService.updateUser(req.params.id, req.body, req.user.id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    handleUnauthorizedError(res);
    return;
  }

  try {
    await userService.deleteUser(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

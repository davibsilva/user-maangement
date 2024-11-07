import prisma from '../prisma/client';
import { User } from '../types/User';

export async function createUser(data: User): Promise<User> {
  const { cpf, name, birthdate, createdBy, password, address } = data;

  try {
    return await prisma.user.create({
      data: {
        cpf,
        name,
        password,
        birthdate,
        createdBy,
        address: {
          create: address
        }
      }
    });
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (error: any) {
    throw new Error(`Error fetching user by ID: ${error.message}`);
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    return await prisma.user.findMany();
  } catch (error: any) {
    throw new Error(`Error fetching all users: ${error.message}`);
  }
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  const { cpf, name, birthdate, password, address, updatedAt, updatedBy, status, removedAt, removedBy } = data;

  try {
    return await prisma.user.update({
      where: { id },
      data: {
        cpf,
        name,
        password,
        birthdate,
        updatedAt,
        updatedBy,
        status,
        removedAt,
        removedBy,
        address: {
          update: address
        }
      }
    });
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}

export async function deleteUser(id: string): Promise<User> {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch (error: any) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
}

export async function getUserByCPF(cpf: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({ where: { cpf } });
  } catch (error: any) {
    throw new Error(`Error fetching user by CPF: ${error.message}`);
  }
}

import prisma from '../prisma/client';
import { WriteUserDto, GetUserDto } from '../types/User';

export async function createUser(data: WriteUserDto): Promise<GetUserDto> {
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
      },
      include: {
        address: true,
      },
    });
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

export async function getUserById(id: string): Promise<GetUserDto | null> {
  try {
    return await prisma.user.findUnique({ where: { id }, include: { address: true } });
  } catch (error: any) {
    throw new Error(`Error fetching user by ID: ${error.message}`);
  }
}

export async function getAllUsers(): Promise<GetUserDto[]> {
  try {
    return await prisma.user.findMany({ include: { address: true } });
  } catch (error: any) {
    throw new Error(`Error fetching all users: ${error.message}`);
  }
}

export async function updateUser(id: string, data: Partial<WriteUserDto>): Promise<GetUserDto> {
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
      },
      include: {
        address: true
      }
    });
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}

export async function deleteUser(id: string): Promise<GetUserDto> {
  try {
    return await prisma.user.delete({ where: { id }, include: { address: true } });
  } catch (error: any) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
}

export async function getUserByCPF(cpf: string): Promise<GetUserDto | null> {
  try {
    return await prisma.user.findUnique({ where: { cpf }, include: { address: true } });
  } catch (error: any) {
    throw new Error(`Error fetching user by CPF: ${error.message}`);
  }
}

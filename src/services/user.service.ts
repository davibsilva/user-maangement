import * as userRepository from '../repositories/user.repository';
import { User, UserStatus } from '../types/User';
import bcrypt from 'bcryptjs';

export async function createUser(data: User, actualUserId: string): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);

    const actualUser = await userRepository.getUserById(actualUserId);
    if (!actualUser) {
        throw new Error('Actual user not provided');
    }

    data.createdBy = actualUser.name;
    return userRepository.createUser(data);
}

export async function verifyPassword(cpf: string, password: string): Promise<User> {
    const user = await userRepository.getUserByCPF(cpf);
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    return user;
}

export async function getUserById(id: string): Promise<User | null> {
    return userRepository.getUserById(id);
}

export async function getAllUsers(): Promise<User[]> {
    return userRepository.getAllUsers();
}

export async function updateUser(id: string, data: Partial<User>, actualUserId: string): Promise<User> {
    const actualUser = await userRepository.getUserById(actualUserId);
    if (!actualUser) {
        throw new Error('Actual user not provided');
    }

    return userRepository.updateUser(id, {
        ...data,
        updatedAt: new Date().toISOString(),
        updatedBy: actualUser.name
    });
}

export async function deleteUser(id: string, actualUserId: string): Promise<User> {
    const actualUser = await userRepository.getUserById(actualUserId);
    if (!actualUser) {
        throw new Error('Actual user not provided');
    }

    return userRepository.updateUser(id, {
        status: UserStatus.Removido,
        removedAt: new Date().toISOString(),
        removedBy: actualUser.name
    });
}

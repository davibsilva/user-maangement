import * as userRepository from '../repositories/user.repository';
import { WriteUserDto, GetUserDto, UserStatus } from '../types/User';
import bcrypt from 'bcryptjs';

export async function createUser(data: WriteUserDto, actualUserId: string): Promise<GetUserDto> {
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);

    const actualUser = await userRepository.getUserById(actualUserId);
    if (!actualUser) {
        throw new Error('Actual user not provided');
    }

    data.createdBy = actualUser.name;
    return userRepository.createUser(data);
}

export async function verifyPassword(cpf: string, password: string): Promise<GetUserDto> {
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

export async function getUserById(id: string): Promise<GetUserDto | null> {
    return userRepository.getUserById(id);
}

export async function getAllUsers(): Promise<GetUserDto[]> {
    return userRepository.getAllUsers();
}

export async function updateUser(id: string, data: Partial<WriteUserDto>, actualUserId: string): Promise<GetUserDto> {
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

export async function deleteUser(id: string, actualUserId: string): Promise<GetUserDto> {
    const actualUser = await userRepository.getUserById(actualUserId);
    if (!actualUser) {
        throw new Error('Actual user not provided');
    }

    return userRepository.updateUser(id, {
        status: UserStatus.Removido.toString(),
        removedAt: new Date().toISOString(),
        removedBy: actualUser.name
    });
}

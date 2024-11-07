import * as userService from '../services/user.service';
import * as userRepository from '../repositories/user.repository';
import bcrypt from 'bcryptjs';
import { WriteUserDto, GetUserDto, UserStatus } from '../types/User';

jest.mock('../repositories/user.repository', () => ({
    getUserById: jest.fn(),
    getUserByCPF: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    getAllUsers: jest.fn(),
  }));
  
  jest.mock('bcryptjs', () => ({
    genSaltSync: jest.fn(),
    hashSync: jest.fn(),
    compareSync: jest.fn(),
  }));

describe('User Service', () => {
    describe('createUser', () => {
        it('should successfully create a user', async () => {
            const actualUserId = '123';
            const actualUser = { id: actualUserId, name: 'Admin' };
            const userData: WriteUserDto = { cpf: '123456789', name: 'John Doe', password: 'hashedPassword', createdBy: '', birthdate: '1999-06-28T00:00:00.000Z' };

            (userRepository.getUserById as jest.Mock).mockResolvedValue(actualUser);
            (userRepository.createUser as jest.Mock).mockResolvedValue({ ...userData, createdBy: actualUser.name });
            (bcrypt.genSaltSync as jest.Mock).mockReturnValue('salt');
            (bcrypt.hashSync as jest.Mock).mockReturnValue('hashedPassword');

            const result = await userService.createUser(userData, actualUserId);

            expect(userRepository.getUserById).toHaveBeenCalledWith(actualUserId);
            expect(bcrypt.hashSync).toHaveBeenCalledWith(userData.password, 'salt');
            expect(userRepository.createUser).toHaveBeenCalledWith({
                ...userData,
                password: 'hashedPassword',
                createdBy: actualUser.name,
            });
            expect(result.createdBy).toBe('Admin');
        });

        it('should throw an error if the actual user is not found', async () => {
            (userRepository.getUserById as jest.Mock).mockResolvedValue(null);

            const actualUserId = '123';
            const userData: WriteUserDto = { cpf: '123456789', name: 'John Doe', password: 'password123', createdBy: '', birthdate: '1999-06-28T00:00:00.000Z' };

            await expect(userService.createUser(userData, actualUserId)).rejects.toThrow('Actual user not provided');
        });
    });

    describe('verifyPassword', () => {
        it('should return the user if password is valid', async () => {
            const cpf = '123456789';
            const password = 'password123';
            const user = { cpf, password: bcrypt.hashSync(password, 10), name: 'John Doe' };

            (userRepository.getUserByCPF as jest.Mock).mockResolvedValue(user);
            (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

            const result = await userService.verifyPassword(cpf, password);

            expect(result).toEqual(user);
            expect(userRepository.getUserByCPF).toHaveBeenCalledWith(cpf);
            expect(bcrypt.compareSync).toHaveBeenCalledWith(password, user.password);
        });

        it('should throw an error if user is not found', async () => {
            const cpf = '123456789';
            const password = 'password123';

            (userRepository.getUserByCPF as jest.Mock).mockResolvedValue(null);

            await expect(userService.verifyPassword(cpf, password)).rejects.toThrow('User not found');
        });

        it('should throw an error if the password is invalid', async () => {
            const cpf = '123456789';
            const password = 'wrongPassword';
            const user = { cpf, password: bcrypt.hashSync('password123', 10), name: 'John Doe' };

            (userRepository.getUserByCPF as jest.Mock).mockResolvedValue(user);
            (bcrypt.compareSync as jest.Mock).mockReturnValue(false);

            await expect(userService.verifyPassword(cpf, password)).rejects.toThrow('Invalid credentials');
        });
    });

    describe('getUserById', () => {
        it('should return the user if found', async () => {
            const userId = '123';
            const user = { id: userId, name: 'John Doe', cpf: '123456789' };

            (userRepository.getUserById as jest.Mock).mockResolvedValue(user);

            const result = await userService.getUserById(userId);

            expect(result).toEqual(user);
            expect(userRepository.getUserById).toHaveBeenCalledWith(userId);
        });

        it('should return null if the user is not found', async () => {
            const userId = '123';

            (userRepository.getUserById as jest.Mock).mockResolvedValue(null);

            const result = await userService.getUserById(userId);

            expect(result).toBeNull();
            expect(userRepository.getUserById).toHaveBeenCalledWith(userId);
        });
    });

    describe('getAllUsers', () => {
        it('should return all users', async () => {
            const users = [{ id: '123', name: 'John Doe' }, { id: '456', name: 'Jane Doe' }];

            (userRepository.getAllUsers as jest.Mock).mockResolvedValue(users);

            const result = await userService.getAllUsers();

            expect(result).toEqual(users);
            expect(userRepository.getAllUsers).toHaveBeenCalled();
        });
    });

    describe('updateUser', () => {
        it('should successfully update a user', async () => {
            const userId = '123';
            const actualUserId = '456';
            const actualUser = { id: actualUserId, name: 'Admin' };
            const updatedData = { name: 'Updated Name' };

            (userRepository.getUserById as jest.Mock).mockResolvedValue(actualUser);
            (userRepository.updateUser as jest.Mock).mockResolvedValue({ ...updatedData, updatedBy: actualUser.name, updatedAt: expect.any(String) });

            const result = await userService.updateUser(userId, updatedData, actualUserId);

            expect(userRepository.getUserById).toHaveBeenCalledWith(actualUserId);
            expect(userRepository.updateUser).toHaveBeenCalledWith(userId, {
                ...updatedData,
                updatedBy: actualUser.name,
                updatedAt: expect.any(String),
            });
            expect(result.updatedBy).toBe('Admin');
        });

        it('should throw an error if the actual user is not found', async () => {
            const userId = '123';
            const actualUserId = '456';
            const updatedData = { name: 'Updated Name' };

            (userRepository.getUserById as jest.Mock).mockResolvedValue(null);

            await expect(userService.updateUser(userId, updatedData, actualUserId)).rejects.toThrow('Actual user not provided');
        });
    });

    describe('deleteUser', () => {
        it('should successfully delete a user', async () => {
            const userId = '123';
            const actualUserId = '456';
            const actualUser = { id: actualUserId, name: 'Admin' };

            (userRepository.getUserById as jest.Mock).mockResolvedValue(actualUser);
            (userRepository.updateUser as jest.Mock).mockResolvedValue({ status: UserStatus.Removido.toString(), removedBy: actualUser.name, removedAt: expect.any(String) });

            const result = await userService.deleteUser(userId, actualUserId);

            expect(userRepository.getUserById).toHaveBeenCalledWith(actualUserId);
            expect(userRepository.updateUser).toHaveBeenCalledWith(userId, {
                status: UserStatus.Removido,
                removedBy: actualUser.name,
                removedAt: expect.any(String),
            });
            expect(result.status).toBe(UserStatus.Removido.toString());
        });

        it('should throw an error if the actual user is not found', async () => {
            const userId = '123';
            const actualUserId = '456';

            (userRepository.getUserById as jest.Mock).mockResolvedValue(null);
            
            await expect(userService.deleteUser(userId, actualUserId)).rejects.toThrow('Actual user not provided');
        });
    });
});

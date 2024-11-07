import { body } from 'express-validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cpfExists = async (cpf: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({ where: { cpf } });
    return !user;
};

const isValidCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let firstCheckDigit = (sum * 10) % 11;
    if (firstCheckDigit === 10 || firstCheckDigit === 11) firstCheckDigit = 0;
    if (firstCheckDigit !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondCheckDigit = (sum * 10) % 11;
    if (secondCheckDigit === 10 || secondCheckDigit === 11) secondCheckDigit = 0;
    if (secondCheckDigit !== parseInt(cpf.charAt(10))) return false;

    return true;
};

export const validateUser = [
    body('name')
        .isString()
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({ min: 3, max: 64 })
        .withMessage('Name length must be between 3 and 64 characters.'),
    body('birthdate')
        .notEmpty()
        .withMessage('Birthdate is required.')
        .isISO8601()
        .withMessage('Birthdate must be a valid ISO8601 date.'),
    body('password')
        .isString()
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ min: 8, max: 64 })
        .withMessage('Password length must be between 8 and 64 characters.'),
    body('cpf')
        .isString()
        .notEmpty()
        .withMessage('CPF is required.')
        .custom((cpf) => {
            if (!isValidCPF(cpf)) {
                throw new Error('CPF is not valid');
            }
            return true;
        })
        .custom(async (cpf) => {
            const exists = await cpfExists(cpf);
            if (!exists) {
                throw new Error('User with this CPF already exists.');
            }
            return true;
        }),
    body('address.street')
        .isString()
        .notEmpty()
        .withMessage('Street is required.')
        .isLength({ min: 6, max: 128 })
        .withMessage('Street length must be between 6 and 128 characters.'),
    body('address.number')
        .isString()
        .notEmpty()
        .withMessage('Number is required.')
        .isLength({ min: 1, max: 6 })
        .withMessage('Number length must be between 1 and 6 characters.'),
    body('address.complement')
        .isString()
        .isLength({ min: 4, max: 24 })
        .withMessage('Complement length must be between 4 and 24 characters.'),
    body('address.neighborhood')
        .isString()
        .notEmpty()
        .withMessage('Neighborhood is required.')
        .isLength({ min: 6, max: 48 })
        .withMessage('Neighborhood length must be between 6 and 48 characters.'),
    body('address.city')
        .isString()
        .notEmpty()
        .withMessage('City is required.')
        .isLength({ min: 8, max: 48 })
        .withMessage('City length must be between 8 and 48 characters.'),
    body('address.state')
        .isString()
        .notEmpty()
        .withMessage('State is required.')
        .isLength({ min: 4, max: 48 })
        .withMessage('State length must be between 4 and 48 characters.'),
    body('address.zipCode')
        .isString()
        .notEmpty()
        .withMessage('ZipCode is required.')
        .isLength({ min: 8, max: 8 })
        .withMessage('ZipCode length must be exactly 8 characters.'),
];

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  const adminIdentification = process.env.ADMIN_IDENTIFICATION;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminIdentification || !adminPassword) {
    console.error('Admin credentials not set in environment variables');
    return;
  }

  const hashedPassword = bcrypt.hashSync(adminPassword, 10);
  const existingAdmin = await prisma.user.findUnique({
    where: { cpf: adminIdentification },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: 'Admin',
        cpf: adminIdentification,
        password: hashedPassword,
        birthdate: '1999-06-28T00:00:00Z',
        createdBy: 'system'
      },
    });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

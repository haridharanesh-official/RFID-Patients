import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'doctor@care-hub.test';
  const pass = process.env.ADMIN_PASS || 'admin123';
  const hashed = bcrypt.hashSync(pass, 10);
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: 'Doctor', role: 'doctor', password: hashed }
  });
  console.log('Seeded doctor:', email);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());

import prisma from '@/lib/prisma';
import { RoleName } from '@/generated/prisma';
import { hashPassword } from '@/lib/hash';

async function main() {
  // Roles
  const roles: RoleName[] = [RoleName.SUPER_ADMIN, RoleName.PURCHASING, RoleName.WAREHOUSE];
  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Super Admin
  const superAdminEmail = 'superadmin@example.com';
  const hashedPassword = await hashPassword('superadmin123');

  await prisma.user.upsert({
    where: { email: superAdminEmail },
    update: {},
    create: {
      name: 'Super Admin',
      email: superAdminEmail,
      password: hashedPassword,
      role: { connect: { name: 'SUPER_ADMIN' } },
    },
  });

  console.log('Seed data created!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      name: "System Admin",
      email: "admin@gmail.com",
      password: hashed,
      role: "ADMIN",
    },
  });

  console.log("ADMIN CREATED");
}

main().finally(() => prisma.$disconnect());
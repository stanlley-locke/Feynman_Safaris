const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkModels() {
  const models = Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$'));
  console.log("Available Prisma models:", models);
  process.exit(0);
}

checkModels().catch(err => {
  console.error("Prisma error:", err);
  process.exit(1);
});

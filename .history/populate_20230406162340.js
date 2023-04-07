const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function populateTokenTable() {
  for (let i = 0; i < 96; i++) {
    const randomYear = Math.floor(Math.random() * (1900 - 1885 + 1)) + 1885;

    await prisma.token.create({
      data: {
        year: randomYear.toString(),
      },
    });
  }

  console.log("Token table populated.");
  await prisma.$disconnect();
}

populateTokenTable();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const ipfs__base_link =
  "https://bafybeibfnjocqdrkotizp7tqmjznuj577skwx7p5anbdjwzf736oay53sa.ipfs.nftstorage.link/";

async function main() {
  const tokens = await prisma.token.findMany();

  tokens.forEach(async (token) => {
    console.log(ipfs__base_link + token.id + ".png");
  });
}

main();
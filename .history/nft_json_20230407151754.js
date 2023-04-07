const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient();
const json_folder = "./metadata/";
const ipfs__base_link =
  "https://bafybeibfnjocqdrkotizp7tqmjznuj577skwx7p5anbdjwzf736oay53sa.ipfs.nftstorage.link/";

async function main() {
  const tokens = await prisma.token.findMany();

  tokens.forEach(async (token) => {
    const image = ipfs__base_link + token.id + ".png";
    const name = token.title;
    const description = token.year;
    const external_url = "http://van-gogh-nft.vercel.app/works/" + token.id;

    const json = {
      name,
      description,
      image,
      external_url,
    };

    const json_string = JSON.stringify(json);
    const file_name = json_folder + token.id + ".json";

    fs.writeFile(file_name, json_string, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  });
}

main();

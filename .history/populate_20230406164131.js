const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const titles = [
  "Misty Morning at the River's Edge",
  "Fields of Lavender in Bloom",
  "The Whispering Wind through the Willows",
  "A Garden of Roses in Full Bloom",
  "Twilight over the Hills",
  "The Melancholy of the Autumn Leaves",
  "A Sea of Daffodils",
  "The Dance of the Sunflowers",
  "A Meadow in Spring",
  "The Secret Garden",
  "A Forest in the Mist",
  "A Sunset of Golden Hues",
  "The Magic of the Moonlit Garden",
  "A Bouquet of Wildflowers",
  "A Stream through the Forest",
  "A Path through the Poppy Fields",
  "The Call of the Nightingale",
  "A Hillside Covered in Heather",
  "The Romance of the Red Roses",
  "The Light in the Forest",
  "The Windswept Fields",
  "The Enchantment of the Butterflies",
  "A Starry Night over the Mountains",
  "The Sunflower Symphony",
  "The Secret Life of Flowers",
  "The River of Dreams",
  "A Field of Poppies in the Afternoon Sun",
  "The Cherry Blossom Waltz",
  "The Wonders of the Universe",
  "The Glow of the Fireflies",
  "The Rose Garden at Twilight",
  "A Meadow of Sunflowers",
  "The Twilight of the Autumn Leaves",
  "A Walk through the Bluebells",
  "The Solitude of the Deserted Beach",
  "The Mysterious Forest",
  "The Majestic Mountains at Dawn",
  "The Serenity of the Lotus Pond",
  "The Rustling of the Leaves",
  "The Delightful Daisies",
  "The Ocean's Embrace",
  "The Hummingbirds' Haven",
  "The Beauty of the Aurora",
  "The Blossoming Cherry Trees",
  "The Golden Sunset over the Lake",
  "The Mystical Caves",
  "The Blissful Fields of Wildflowers",
  "The Enchanted Waterfall",
  "The Tranquility of the Lily Pond",
  "The Luminous Moonlit Night",
  "The Majestic Redwoods",
  "The Song of the Nightingale",
  "The Dandelion Dream",
  "The Sparkling Sea",
  "The Magic of the Rainbow",
  "The Magnificent Magnolias",
  "The Dance of the Butterflies",
  "The Wonder of the Universe",
  "The Beauty of the Blossoms",
  "The Serenity of the Mountain Lake",
  "The Serenity of the Cherry Blossom Garden",
  "The Purity of the White Lilies",
  "The Playfulness of the Poppies",
  "The Mysterious Blue Forest",
  "The Enchanting Coral Reef",
  "The Romance of the Red Tulips",
  "The Tranquility of the Blue Lotus Pond",
  "The Wonders of the Cosmos",
  "The Beauty of the Autumn Leaves",
  "The Serenity of the Water Lily Pond",
];
async function populateTokenTable() {
  for (let i = 0; i < 96; i++) {
    const randomYear = Math.floor(Math.random() * (1900 - 1885 + 1)) + 1885;

    await prisma.token.create({
      data: {
        id: i.toString(),
        year: randomYear.toString(),
      },
    });
  }

  console.log("Token table populated.");
  await prisma.$disconnect();
}

populateTokenTable();

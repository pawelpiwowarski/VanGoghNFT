const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const titles = [
  "Dancing Daffodils at Sunrise",
  "A Garden of Hope",
  "The Vibrant Bouquet",
  "The Captivating Cosmos",
  "Radiant Roses in a White Vase",
  "The Golden Harvest Fields",
  "The Tranquil Pond",
  "The Playful Butterflies in a Field of Lavender",
  "The Serene Cherry Blossom Tree",
  "The Majestic Magnolias",
  "The Bold Sunflowers in a Blue Vase",
  "The Mysterious Forest at Dusk",
  "The Melancholy of the Wilted Flowers",
  "The Enchanting Bluebells in a Green Vase",
  "The Serene Lavender Fields at Sunset",
  "The Passionate Poppies in a Red Vase",
  "The Mellow Yellow Tulips",
  "The Playful Daisies in a White Vase",
  "The Dazzling Wildflowers in a Glass Vase",
  "The Vibrant Hydrangeas",
  "The Serene Rose Garden",
  "The Majestic Mountains at Sunset",
  "The Tranquil Ocean at Dawn",
  "The Enchanting Meadow",
  "The Playful Bumblebees in a Field of Sunflowers",
  "The Radiant Red Roses",
  "The Enchanting Water Lilies",
  "The Serene Lake at Dusk",
  "The Majestic Cypress Trees",
  "The Bold Yellow Daisies",
  "The Mysterious Blue Forest at Twilight",
  "The Melancholy of the Dead Flowers",
  "The Enchanting Pink Cherry Blossoms",
  "The Serene White Roses in a Crystal Vase",
  "The Passionate Red Poppies in a Purple Vase",
];

titles.forEach(async (title, index) => {
  await prisma.token.update({
    where: {
      id: (index + 70).toString(),
    },
    data: {
      title,
    },
  });
});

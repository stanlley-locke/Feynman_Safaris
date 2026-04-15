import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const acc = await prisma.accommodation.create({
      data: {
        name: "Test Camp",
        location: "Test Location",
        description: "Test Description",
        category: "Test Category",
        rating: 5,
        image: "https://example.com/image.jpg",
        website: "https://example.com",
        amenities: [],
      },
    });
    console.log("Success:", acc);
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function main() {
  // 1. Create Admin User
  const hashedPassword = await bcrypt.hash("feynman2026", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@feynmansafaris.com" },
    update: {},
    create: {
      email: "admin@feynmansafaris.com",
      name: "Feynman Admin",
      passwordHash: hashedPassword,
      role: "admin",
    },
  });
  console.log("Admin user created/updated");

  // 2. Create Destinations (using user's content)
  const destinations = [
    {
      name: "Mara Classic Safari",
      slug: "mara-classic",
      description: "Experience one of the world’s greatest wildlife spectacles in the Maasai Mara—the annual Wildebeest Migration. This 3-day safari includes Nairobi pick-up, thrilling game drives, and a cultural Maasai experience.",
      highlights: ["Wildebeest Migration", "Big Five sightings", "Maasai cultural visit", "Luxury camping"],
      bestTime: "July - October",
      wildlife: ["Lions", "Cheetahs", "Elephants", "Wildebeest"],
      image: "/assets/mara.jpg",
      itinerary: [
        { day: 1, title: "Nairobi to Maasai Mara", content: "Depart Nairobi for a scenic drive to the Mara. Afternoon game drive." },
        { day: 2, title: "Full Day Game Drive", content: "Full day exploring the vast plains. Picnic lunch included." },
        { day: 3, title: "Morning Drive & Return", content: "Final morning drive followed by departure for Nairobi." }
      ]
    },
    {
      name: "Amboseli Elephant Trail",
      slug: "amboseli-elephants",
      description: "Famous for its massive herds of elephants and stunning views of Mt. Kilimanjaro. A 3-day journey into the heart of the elephant kingdom.",
      highlights: ["Kilimanjaro views", "Large elephant herds", "Observation Hill", "Bird watching"],
      bestTime: "June - October",
      wildlife: ["Elephants", "Lions", "Giraffes", "Zebras"],
      image: "/assets/amboseli.jpg",
      itinerary: [
        { day: 1, title: "Arrival in Amboseli", content: "Drive to Amboseli. Check-in and afternoon game drive with Kilimanjaro backdrop." },
        { day: 2, title: "The Kingdom of Elephants", content: "Full day in the park. Visit Observation Hill for panoramic views." },
        { day: 3, title: "Sunrise Drive", content: "Morning drive before returning to Nairobi." }
      ]
    }
  ];

  for (const dest of destinations) {
    await prisma.destination.upsert({
      where: { slug: dest.slug },
      update: {},
      create: {
        name: dest.name,
        slug: dest.slug,
        description: dest.description,
        highlights: dest.highlights,
        bestTime: dest.bestTime,
        wildlife: dest.wildlife,
        image: dest.image,
        itinerary: dest.itinerary as any,
      },
    });
  }
  console.log("Destinations seeded");

  // 3. Create Accommodations (from provided list)
  const accommodations = [
    { name: "Emayian Luxury Camp", location: "Maasai Mara", description: "Top-tier luxury camping experience within the Mara ecosystem." },
    { name: "Mara Concordia", location: "Maasai Mara", description: "Seamless blend of comfort and wilderness." },
    { name: "Ashnil Aruba Lodge", location: "Tsavo East", description: "Overlooking the Aruba Dam." },
    { name: "Sarova Salt Lick", location: "Taita Hills", description: "Unique stilted lodge overlooking waterholes." },
    { name: "Leopard Beach Resort", location: "Diani", description: "Ultimate coastal luxury." }
  ];

  for (const acc of accommodations) {
    await prisma.accommodation.create({
      data: acc
    });
  }
  console.log("Accommodations seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

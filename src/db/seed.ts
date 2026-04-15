import crypto from "crypto";
import { db } from "./index";
import {
  accommodations,
  blogPosts,
  bookings,
  destinations,
  messages,
  reviews,
  transports,
  users,
} from "./schema";

const now = () => new Date();
const createId = () => crypto.randomUUID();

async function seed() {
  console.log("Starting comprehensive Neon/Postgres seed...");

  await db.delete(bookings);
  await db.delete(messages);
  await db.delete(reviews);
  await db.delete(blogPosts);
  await db.delete(destinations);
  await db.delete(accommodations);
  await db.delete(transports);
  await db.delete(users);

  const userRecords = [
    {
      id: createId(),
      email: "admin@feynmansafaris.com",
      passwordHash: "feynman2026",
      name: "Operations Admin",
      role: "admin",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      email: "moderator@feynmansafaris.com",
      passwordHash: "moderator2026",
      name: "Content Moderator",
      role: "moderator",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      email: "agent@feynmansafaris.com",
      passwordHash: "agent2026",
      name: "Bookings Agent",
      role: "agent",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      email: "sarah.owens@example.com",
      passwordHash: "customer_default_pass",
      name: "Sarah Owens",
      role: "customer",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      email: "david.kimani@example.com",
      passwordHash: "customer_default_pass",
      name: "David Kimani",
      role: "customer",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      email: "emma.reid@example.com",
      passwordHash: "customer_default_pass",
      name: "Emma Reid",
      role: "customer",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      email: "noah.brown@example.com",
      passwordHash: "customer_default_pass",
      name: "Noah Brown",
      role: "customer",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      email: "amina.hassan@example.com",
      passwordHash: "customer_default_pass",
      name: "Amina Hassan",
      role: "customer",
      createdAt: now(),
      updatedAt: now(),
    },
  ];
  await db.insert(users).values(userRecords);

  const accommodationRecords = [
    {
      id: createId(),
      name: "Mara Horizon Camp",
      location: "Maasai Mara",
      description: "Luxury tented camp with river-facing decks and private sundowners.",
      amenities: JSON.stringify(["Private Deck", "Hot Shower", "Fine Dining", "Guided Drives"]),
      image: "/assets/private-safari.jpg",
      website: "https://www.example.com/mara-horizon-camp",
      category: "Luxury Camp",
      rating: 5,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      name: "Kilimanjaro View Lodge",
      location: "Amboseli",
      description: "Elegant safari lodge with Kilimanjaro sunrise views.",
      amenities: JSON.stringify(["Infinity Pool", "Spa", "Family Suites"]),
      image: "/assets/amboseli.jpg",
      website: "https://www.example.com/kilimanjaro-view-lodge",
      category: "Lodge",
      rating: 5,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      name: "Samburu Sky Tents",
      location: "Samburu",
      description: "Remote camp with elevated deck tents and stargazing dinners.",
      amenities: JSON.stringify(["Stargazing Deck", "Bush Breakfast", "Private Guide"]),
      image: "/assets/samburu.jpg",
      website: "https://www.example.com/samburu-sky-tents",
      category: "Boutique Camp",
      rating: 4,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      name: "Tsavo Red Earth Lodge",
      location: "Tsavo",
      description: "Rustic-chic lodge designed for long game-viewing days.",
      amenities: JSON.stringify(["Game-view Deck", "Fire Pit", "Photography Lounge"]),
      image: "/assets/tsavo.jpg",
      website: "https://www.example.com/tsavo-red-earth",
      category: "Lodge",
      rating: 4,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      name: "Diani Reef Villa",
      location: "Diani Beach",
      description: "Oceanfront villa for post-safari recovery and coastal activities.",
      amenities: JSON.stringify(["Ocean View", "Private Chef", "Snorkeling"]),
      image: "/assets/diani.jpg",
      website: "https://www.example.com/diani-reef-villa",
      category: "Beach Villa",
      rating: 5,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      name: "Serengeti Plains House",
      location: "Serengeti",
      description: "Premium lodge overlooking migration corridors.",
      amenities: JSON.stringify(["Migration Deck", "Wine Cellar", "Birding Tours"]),
      image: "/assets/serengeti.jpg",
      website: "https://www.example.com/serengeti-plains-house",
      category: "Luxury Lodge",
      rating: 5,
      createdAt: now(),
      updatedAt: now(),
    },
  ];
  await db.insert(accommodations).values(accommodationRecords);

  const transportRecords = [
    {
      id: createId(),
      name: "FYN-01 Land Cruiser",
      type: "Safari Land Cruiser",
      plate: "KDG 102A",
      location: "Nairobi HQ",
      status: "available",
      description: "Open-roof game vehicle with charging ports and binocular kit.",
      image: "/assets/group-safari.jpg",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      name: "FYN-02 Land Cruiser",
      type: "Safari Land Cruiser",
      plate: "KDJ 784M",
      location: "Mara Station",
      status: "available",
      description: "Long-range off-road unit with photography mounts.",
      image: "/assets/private-safari.jpg",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      name: "Savanna Executive Van",
      type: "Executive Minivan",
      plate: "KCY 349R",
      location: "Airport Transfers",
      status: "available",
      description: "Premium transfer van for airport and city pickups.",
      image: "/assets/luxury-safari.jpg",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      name: "SkyLink Charter",
      type: "Charter Flight",
      plate: "5Y-FYN",
      location: "Wilson Airport",
      status: "maintenance",
      description: "Scheduled charter support for remote airstrips.",
      image: "/assets/bespoke-safari.jpg",
      createdAt: now(),
      updatedAt: now(),
    },
  ];
  await db.insert(transports).values(transportRecords);

  const maraId = createId();
  const amboseliId = createId();
  const samburuId = createId();
  const tsavoId = createId();
  const dianiId = createId();
  const serengetiId = createId();

  const destinationRecords = [
    {
      id: maraId,
      name: "Maasai Mara",
      slug: "maasai-mara",
      description:
        "The iconic reserve for big cat sightings, migration drama, and expansive sunrise drives.",
      itinerary: JSON.stringify([
        { day: "Day 1", title: "Arrival and Sundowner", description: "Arrival transfer, lodge check-in, and evening game drive with sundowner." },
        { day: "Day 2", title: "Big Cat Tracking", description: "Dawn and dusk drives focused on lion, leopard, and cheetah territories." },
        { day: "Day 3", title: "River Crossing Watch", description: "Migration corridor tracking and picnic lunch near the Mara River." },
        { day: "Day 4", title: "Maasai Culture and Farewell", description: "Village visit, conservation talk, and final golden-hour drive." },
      ]),
      highlights: JSON.stringify(["Big Five Encounters", "Mara River Crossings", "Sunset Sundowners"]),
      bestTime: "July to October",
      wildlife: JSON.stringify(["Lion", "Leopard", "Cheetah", "Wildebeest", "Elephant"]),
      image: "/assets/mara.jpg",
      status: "active",
      accommodationIds: JSON.stringify([accommodationRecords[0].id]),
      transportIds: JSON.stringify([transportRecords[0].id, transportRecords[1].id]),
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: amboseliId,
      name: "Amboseli",
      slug: "amboseli",
      description:
        "Elephant-rich plains under Mount Kilimanjaro with dramatic vistas and birdlife hotspots.",
      itinerary: JSON.stringify([
        { day: "Day 1", title: "Kilimanjaro Arrival Route", description: "Road transfer and afternoon wetlands drive." },
        { day: "Day 2", title: "Elephant Corridor Safari", description: "Morning elephant photography circuit and evening marsh drive." },
        { day: "Day 3", title: "Observation Hill and Departure", description: "Guided hill walk and scenic return transfer." },
      ]),
      highlights: JSON.stringify(["Kilimanjaro Views", "Elephant Herds", "Birding Wetlands"]),
      bestTime: "June to October",
      wildlife: JSON.stringify(["Elephant", "Hyena", "Buffalo", "Flamingo"]),
      image: "/assets/amboseli.jpg",
      status: "active",
      accommodationIds: JSON.stringify([accommodationRecords[1].id]),
      transportIds: JSON.stringify([transportRecords[0].id, transportRecords[2].id]),
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: samburuId,
      name: "Samburu",
      slug: "samburu",
      description: "Arid northern beauty and rare species encounters along the Ewaso Nyiro.",
      itinerary: JSON.stringify([
        { day: "Day 1", title: "Northern Arrival", description: "Scenic drive and sunset game circuit." },
        { day: "Day 2", title: "Special Five Expedition", description: "Full-day search for Grevy’s zebra, reticulated giraffe, and more." },
        { day: "Day 3", title: "Riverbank Wildlife Study", description: "Birding, crocodile points, and departure." },
      ]),
      highlights: JSON.stringify(["Special Five", "Arid Landscapes", "Riverbank Wildlife"]),
      bestTime: "Year Round",
      wildlife: JSON.stringify(["Grevy’s Zebra", "Reticulated Giraffe", "Gerenuk"]),
      image: "/assets/samburu.jpg",
      status: "active",
      accommodationIds: JSON.stringify([accommodationRecords[2].id]),
      transportIds: JSON.stringify([transportRecords[1].id]),
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: tsavoId,
      name: "Tsavo",
      slug: "tsavo",
      description: "Immense wilderness, red-dust elephants, and remote safari rhythm.",
      itinerary: JSON.stringify([
        { day: "Day 1", title: "Red Earth Arrival", description: "Check-in and river circuit game drive." },
        { day: "Day 2", title: "Lava Plains Traverse", description: "Full-day game drive through volcanic terrain." },
        { day: "Day 3", title: "Conservation Briefing", description: "Ranger-guided conservation briefing and return." },
      ]),
      highlights: JSON.stringify(["Red Elephants", "Vast Park Network", "Volcanic Landscapes"]),
      bestTime: "June to October",
      wildlife: JSON.stringify(["Elephant", "Lion", "Oryx", "Giraffe"]),
      image: "/assets/tsavo.jpg",
      status: "active",
      accommodationIds: JSON.stringify([accommodationRecords[3].id]),
      transportIds: JSON.stringify([transportRecords[0].id]),
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: dianiId,
      name: "Diani Beach",
      slug: "diani-beach",
      description: "Coastal extension with marine experiences and luxury beach downtime.",
      itinerary: JSON.stringify([
        { day: "Day 1", title: "Beach Transfer and Sunset", description: "Arrival and private beachfront dinner." },
        { day: "Day 2", title: "Marine Day", description: "Snorkeling trip and reef conservation session." },
        { day: "Day 3", title: "Relax and Departure", description: "Leisure morning and transfer to airport." },
      ]),
      highlights: JSON.stringify(["White Sand Beaches", "Snorkeling", "Luxury Coastal Villas"]),
      bestTime: "December to March",
      wildlife: JSON.stringify(["Dolphins", "Sea Turtles", "Coral Reef Species"]),
      image: "/assets/diani.jpg",
      status: "active",
      accommodationIds: JSON.stringify([accommodationRecords[4].id]),
      transportIds: JSON.stringify([transportRecords[2].id]),
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: serengetiId,
      name: "Serengeti",
      slug: "serengeti",
      description: "Endless plains and classic East African wildlife theater.",
      itinerary: JSON.stringify([
        { day: "Day 1", title: "Cross-Border Arrival", description: "Airstrip reception and evening orientation drive." },
        { day: "Day 2", title: "Plains Circuit", description: "Predator tracking and migration movement analysis." },
        { day: "Day 3", title: "Balloon Option and Departure", description: "Optional balloon safari and outbound transfer." },
      ]),
      highlights: JSON.stringify(["Endless Plains", "Predator Tracking", "Migration Herds"]),
      bestTime: "June to October",
      wildlife: JSON.stringify(["Wildebeest", "Lion", "Cheetah", "Hyena"]),
      image: "/assets/serengeti.jpg",
      status: "active",
      accommodationIds: JSON.stringify([accommodationRecords[5].id]),
      transportIds: JSON.stringify([transportRecords[3].id]),
      createdAt: now(),
      updatedAt: now(),
    },
  ];
  await db.insert(destinations).values(destinationRecords);

  const bookingRecords = [
    {
      id: createId(),
      customerName: "Sarah Owens",
      customerEmail: "sarah.owens@example.com",
      safariType: "Private Safari - Maasai Mara",
      destinationId: maraId,
      travelDate: new Date("2026-08-15T00:00:00.000Z"),
      passengers: 2,
      status: "confirmed",
      message: "Interested in migration crossings and photography-focused drives.",
      amount: "$6,800",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      customerName: "David Kimani",
      customerEmail: "david.kimani@example.com",
      safariType: "Luxury Safari - Amboseli & Mara",
      destinationId: amboseliId,
      travelDate: new Date("2026-09-04T00:00:00.000Z"),
      passengers: 4,
      status: "pending",
      message: "Need family-friendly itinerary with premium stays.",
      amount: "$11,250",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      customerName: "Emma Reid",
      customerEmail: "emma.reid@example.com",
      safariType: "Group Joining Tour - Samburu",
      destinationId: samburuId,
      travelDate: new Date("2026-07-08T00:00:00.000Z"),
      passengers: 1,
      status: "confirmed",
      message: "Solo traveler, interested in conservation workshops.",
      amount: "$3,200",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      customerName: "Noah Brown",
      customerEmail: "noah.brown@example.com",
      safariType: "Bespoke Journey - Tsavo + Diani",
      destinationId: tsavoId,
      travelDate: new Date("2026-11-19T00:00:00.000Z"),
      passengers: 2,
      status: "pending",
      message: "Want mixed wildlife and coastal extension for honeymoon.",
      amount: "$8,950",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      customerName: "Amina Hassan",
      customerEmail: "amina.hassan@example.com",
      safariType: "Serengeti Signature Route",
      destinationId: serengetiId,
      travelDate: new Date("2026-10-12T00:00:00.000Z"),
      passengers: 3,
      status: "cancelled",
      message: "Trip rescheduled to next year due to school calendar.",
      amount: "$7,400",
      createdAt: now(),
      updatedAt: now(),
    },
  ];
  await db.insert(bookings).values(bookingRecords);

  const messageRecords = [
    {
      id: createId(),
      name: "Oliver Grant",
      email: "oliver.grant@example.com",
      subject: "Private Mara Planning",
      content:
        "Can you build a 5-day private Mara itinerary focused on cheetah tracking and sunrise drives?",
      isRead: false,
      isStarred: true,
      createdAt: now(),
    },
    {
      id: createId(),
      name: "Nia Patel",
      email: "nia.patel@example.com",
      subject: "Family Friendly Safari",
      content:
        "We have two children (8 and 11). Looking for a balanced safari with shorter game drives.",
      isRead: false,
      isStarred: false,
      createdAt: now(),
    },
    {
      id: createId(),
      name: "Jonas Meyer",
      email: "jonas.meyer@example.com",
      subject: "Accommodation Request",
      content:
        "Do you have luxury stays with strong internet for remote work between drives?",
      isRead: true,
      isStarred: false,
      createdAt: now(),
    },
    {
      id: createId(),
      name: "Leah Njeri",
      email: "leah.njeri@example.com",
      subject: "Transport Clarification",
      content:
        "Is it possible to include a charter segment from Nairobi to Serengeti and return via road?",
      isRead: true,
      isStarred: true,
      createdAt: now(),
    },
  ];
  await db.insert(messages).values(messageRecords);

  const reviewRecords = [
    {
      id: createId(),
      userName: "Sarah Owens",
      userAvatar: "/assets/testimonial-bg.jpg",
      rating: 5,
      comment:
        "Our guide translated every wildlife encounter into a story. Most thoughtful safari experience I've had.",
      destinationName: "Maasai Mara",
      status: "approved",
      createdAt: now(),
    },
    {
      id: createId(),
      userName: "David Kimani",
      userAvatar: "/assets/testimonial-bg.jpg",
      rating: 4,
      comment: "Excellent logistics and truly premium stays. Would have loved one extra day in Amboseli.",
      destinationName: "Amboseli",
      status: "approved",
      createdAt: now(),
    },
    {
      id: createId(),
      userName: "Emma Reid",
      userAvatar: "/assets/testimonial-bg.jpg",
      rating: 5,
      comment: "Perfect for solo travelers. I came home with new friends and deeper context on conservation.",
      destinationName: "Samburu",
      status: "pending",
      createdAt: now(),
    },
    {
      id: createId(),
      userName: "Noah Brown",
      userAvatar: "/assets/testimonial-bg.jpg",
      rating: 3,
      comment: "Good overall, but our first transfer had a delay.",
      destinationName: "Tsavo",
      status: "pending",
      createdAt: now(),
    },
  ];
  await db.insert(reviews).values(reviewRecords);

  const blogRecords = [
    {
      id: createId(),
      title: "Why the Mara Deserves Four Days, Not Two",
      slug: "why-the-mara-deserves-four-days-not-two",
      excerpt: "Most tours rush through. Here is why slowing down changes everything.",
      content:
        "The Mara reveals itself gradually. Day one is orientation. Day two begins pattern recognition. By day three, tracks become narratives. By day four, guests start to read the land on their own.",
      image: "/assets/journal-mara-story.jpg",
      author: "Field Team",
      category: "Destinations",
      status: "published",
      publishedAt: now(),
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      title: "The Secret Language of Acacia Trees",
      slug: "the-secret-language-of-acacia-trees",
      excerpt: "They communicate, defend themselves, and shape the savanna food web.",
      content:
        "Acacias influence herbivore movement and predator rhythm. Their spacing and chemistry are central to the architecture of the plains.",
      image: "/assets/journal-acacia-story.jpg",
      author: "Conservation Desk",
      category: "Ecology",
      status: "published",
      publishedAt: now(),
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      title: "What I Learned Following Elephants for a Week",
      slug: "what-i-learned-following-elephants-for-a-week",
      excerpt: "Patience, family structure, and memory at scale.",
      content:
        "Following one herd for seven days reveals communication depth and inter-generational leadership that short drives never expose.",
      image: "/assets/journal-elephant-story.jpg",
      author: "Guide Collective",
      category: "Wildlife",
      status: "published",
      publishedAt: now(),
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      title: "Designing Bespoke Itineraries Around Seasonal Movement",
      slug: "designing-bespoke-itineraries-around-seasonal-movement",
      excerpt: "How to align comfort, wildlife timing, and pacing.",
      content:
        "We design routes backwards from seasonal probability maps, then refine based on traveler style and mobility preferences.",
      image: "/assets/bespoke-safari.jpg",
      author: "Operations Admin",
      category: "Planning",
      status: "draft",
      publishedAt: null,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: createId(),
      title: "Conservation Partnerships That Actually Move the Needle",
      slug: "conservation-partnerships-that-actually-move-the-needle",
      excerpt: "Where guest travel intersects real conservation outcomes.",
      content:
        "Partnership quality determines impact. We track outcomes tied to anti-poaching logistics, education, and habitat stewardship.",
      image: "/assets/campfire-night.jpg",
      author: "Sustainability Office",
      category: "Conservation",
      status: "draft",
      publishedAt: null,
      createdAt: now(),
      updatedAt: now(),
    },
  ];
  await db.insert(blogPosts).values(blogRecords);

  console.log("Seed complete.");
  console.log(`Users: ${userRecords.length}`);
  console.log(`Destinations: ${destinationRecords.length}`);
  console.log(`Accommodations: ${accommodationRecords.length}`);
  console.log(`Transport: ${transportRecords.length}`);
  console.log(`Bookings: ${bookingRecords.length}`);
  console.log(`Messages: ${messageRecords.length}`);
  console.log(`Reviews: ${reviewRecords.length}`);
  console.log(`Blog posts: ${blogRecords.length}`);
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });

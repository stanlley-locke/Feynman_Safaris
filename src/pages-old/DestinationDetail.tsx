import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Eye, Camera, Footprints, Users } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import maraImage from "@/assets/mara.jpg";
import amboseliImage from "@/assets/amboseli.jpg";
import samburuImage from "@/assets/samburu.jpg";
import tsavoImage from "@/assets/tsavo.jpg";
import dianiImage from "@/assets/diani.jpg";
import serengetiImage from "@/assets/serengeti.jpg";

const destinationData: Record<string, {
  name: string; image: string; tagline: string; overview: string[];
  bestTime: string; size: string; wildlife: string; gettingThere: string; advice: string;
  wildlifeHighlights: { title: string; desc: string }[];
  experiences: { title: string; desc: string; icon: any }[];
  accommodations: { budget: string[]; midRange: string[]; luxury: string[] };
  itineraries: { title: string; desc: string; days: string }[];
  quote: string;
}> = {
  "maasai-mara": {
    name: "Maasai Mara",
    image: maraImage,
    tagline: "The Land That Defines Safari",
    overview: [
      "The Maasai Mara isn't just a park. It's a feeling. It's the moment you see your first lioness walking through the grass. It's the sound of a million hooves during the migration. It's the silence at sunset when the world seems to hold its breath.",
      "This is where safaris become stories.",
    ],
    bestTime: "July–October (Migration), January–February (Calving)",
    size: "1,510 sq km",
    wildlife: "Big Five, cheetahs, hippos, crocodiles, 450+ bird species",
    gettingThere: "5–6 hour drive from Nairobi, or 1-hour flight",
    advice: "Stay minimum 3 nights. 4 is better.",
    wildlifeHighlights: [
      { title: "The Big Cats", desc: "Lion, leopard, cheetah – Mara has Africa's highest density of big cats." },
      { title: "The Great Migration", desc: "1.5 million wildebeest, 200,000 zebras crossing the Mara River." },
      { title: "The Elephants", desc: "Large herds, often with tiny babies, roaming the endless plains." },
      { title: "The Birdlife", desc: "Ostriches, secretary birds, lilac-breasted rollers, and hundreds more." },
    ],
    experiences: [
      { title: "Game Drives", desc: "Morning, afternoon, or full day. Your vehicle, your pace.", icon: Eye },
      { title: "Hot Air Balloon Safari", desc: "Dawn over the savanna. Champagne breakfast in the bush.", icon: Camera },
      { title: "Maasai Village Visit", desc: "Meet the people of the land. Learn their traditions, songs, and stories.", icon: Users },
      { title: "Walking Safari", desc: "Feel the earth beneath your feet. Track animals with Maasai guides.", icon: Footprints },
    ],
    accommodations: {
      budget: ["Mara Explorers Camp – Authentic tented camp, great for first-timers", "Enchoro Wildlife Camp – Budget-friendly with stunning views", "Oldarpoi Mara Camp – Simple comfort, excellent guides"],
      midRange: ["Mara Intrepids Camp – Classic tented luxury on the Talek River", "Basecamp Masai Mara – Eco-friendly, community-owned", "Ilkeliani Camp – Riverside setting, warm hospitality"],
      luxury: ["Angama Mara – Suspended above the Great Rift Valley escarpment", "Mara Plains Camp – Intimate, exclusive, and extraordinary", "Governor's Camp – The original Mara luxury experience"],
    },
    itineraries: [
      { title: "3-Day Mara Express", desc: "Perfect for first-timers with limited time. All the highlights, none of the rush.", days: "3" },
      { title: "4-Day Mara Immersion", desc: "Our recommended minimum. Feel the rhythm of the Mara.", days: "4" },
      { title: "7-Day Kenya Classic", desc: "Mara plus Nakuru and Amboseli. The iconic circuit.", days: "7" },
    ],
    quote: "The universe is in a glass of wine. We'll never know how much it contains.",
  },
  "amboseli": {
    name: "Amboseli",
    image: amboseliImage,
    tagline: "In the Shadow of Kilimanjaro",
    overview: [
      "Amboseli is where Africa's highest peak meets its most iconic wildlife. Imagine elephants with tusks sweeping the ground, framed against the snow-capped summit of Mount Kilimanjaro.",
      "The swamps and springs create an oasis that attracts extraordinary concentrations of wildlife year-round.",
    ],
    bestTime: "June–October, January–February",
    size: "392 sq km",
    wildlife: "Large elephant herds, flamingos, lions, cheetahs, 400+ bird species",
    gettingThere: "4-hour drive from Nairobi, or 45-minute flight",
    advice: "Best for elephant photography. Morning light on Kilimanjaro is magical.",
    wildlifeHighlights: [
      { title: "The Elephants", desc: "Amboseli's elephants are among Africa's most studied and photographed." },
      { title: "Kilimanjaro Views", desc: "The best views of Africa's highest peak from the Kenyan side." },
      { title: "Swamp Wildlife", desc: "Hippos, buffalo, and waterbirds thrive in the permanent swamps." },
      { title: "Birdlife", desc: "Over 400 species including flamingos, pelicans, and raptors." },
    ],
    experiences: [
      { title: "Game Drives", desc: "Witness elephants against the backdrop of Kilimanjaro.", icon: Eye },
      { title: "Photography Sessions", desc: "Golden hour shoots with Africa's most photogenic mountain.", icon: Camera },
      { title: "Maasai Cultural Visit", desc: "Learn about the pastoralist communities who call this land home.", icon: Users },
      { title: "Nature Walks", desc: "Explore the observation hill for panoramic views.", icon: Footprints },
    ],
    accommodations: {
      budget: ["Kibo Safari Camp – Great value with Kilimanjaro views", "Amboseli Sopa Lodge – Comfortable rooms, central location"],
      midRange: ["Ol Tukai Lodge – Inside the park, elephants visit the grounds", "Amboseli Serena Lodge – Elegant design, excellent dining"],
      luxury: ["Tortilis Camp – Private and exclusive with stunning mountain views", "Elewana Tortilis Camp – Award-winning eco-luxury"],
    },
    itineraries: [
      { title: "2-Day Amboseli Express", desc: "A quick escape for Kilimanjaro views and elephant herds.", days: "2" },
      { title: "3-Day Amboseli Experience", desc: "Full immersion in elephant country with cultural visits.", days: "3" },
      { title: "5-Day Amboseli & Tsavo", desc: "Combine two of Kenya's most iconic parks.", days: "5" },
    ],
    quote: "I was born not knowing and have had only a little time to change that here and there.",
  },
  "samburu": {
    name: "Samburu",
    image: samburuImage,
    tagline: "Where the Wild Things Are Different",
    overview: [
      "Samburu is Kenya's hidden gem—an arid, rugged landscape where species found nowhere else in Kenya roam freely. The Special Five: Grevy's zebra, reticulated giraffe, Somali ostrich, gerenuk, and Beisa oryx.",
      "The Ewaso Ng'iro River cuts through the reserve, creating a lifeline that attracts incredible concentrations of wildlife.",
    ],
    bestTime: "June–October",
    size: "165 sq km",
    wildlife: "Special Five, leopards, lions, wild dogs, 450+ bird species",
    gettingThere: "6-hour drive from Nairobi, or 1-hour flight",
    advice: "Combine with Buffalo Springs and Shaba reserves for the full experience.",
    wildlifeHighlights: [
      { title: "The Special Five", desc: "Grevy's zebra, reticulated giraffe, Somali ostrich, gerenuk, and Beisa oryx." },
      { title: "Big Cats", desc: "Excellent leopard sightings and prides of lions along the river." },
      { title: "Elephants", desc: "Large herds crossing the river, including the famous Samburu elephants." },
      { title: "Cultural Heritage", desc: "The Samburu people maintain their vibrant traditions and way of life." },
    ],
    experiences: [
      { title: "Game Drives", desc: "Track the Special Five through dramatic arid landscapes.", icon: Eye },
      { title: "Cultural Visits", desc: "Meet the Samburu warriors and learn their traditions.", icon: Users },
      { title: "River Walks", desc: "Walk along the Ewaso Ng'iro with experienced guides.", icon: Footprints },
      { title: "Night Drives", desc: "Discover nocturnal wildlife in the reserves.", icon: Camera },
    ],
    accommodations: {
      budget: ["Samburu Simba Lodge – Riverside camp with great value"],
      midRange: ["Saruni Samburu – Stunning views, excellent guides", "Elephant Bedroom Camp – Intimate tented camp on the river"],
      luxury: ["Sasaab Lodge – Moroccan-inspired luxury in the wilderness", "Saruni Samburu – Award-winning lodge with infinity pool"],
    },
    itineraries: [
      { title: "3-Day Samburu Safari", desc: "Discover the Special Five and Samburu culture.", days: "3" },
      { title: "5-Day Northern Kenya", desc: "Samburu, Buffalo Springs, and the Matthews Range.", days: "5" },
    ],
    quote: "The pleasure of finding things out.",
  },
  "tsavo": {
    name: "Tsavo",
    image: tsavoImage,
    tagline: "Two Parks, Countless Adventures",
    overview: [
      "Tsavo is Kenya's largest national park, split into East and West. Tsavo East is famous for its red elephants—colored by the iron-rich soil—and vast, open plains. Tsavo West offers volcanic landscapes, Mzima Springs, and lush hills.",
      "Together, they form one of the world's largest wildlife sanctuaries.",
    ],
    bestTime: "June–October",
    size: "20,812 sq km (combined)",
    wildlife: "Red elephants, lions, buffalo, hippos, rhinos, 500+ bird species",
    gettingThere: "5–6 hours from Nairobi by road, or combine with Mombasa coastal trip",
    advice: "Visit both East and West for the full experience. Great value alternative to the Mara.",
    wildlifeHighlights: [
      { title: "Red Elephants", desc: "Elephants dusted in the distinctive red soil of Tsavo." },
      { title: "Mzima Springs", desc: "Crystal-clear underwater viewing of hippos and crocodiles." },
      { title: "The Man-Eaters", desc: "The legendary Tsavo lions, descendants of the famous man-eaters of 1898." },
      { title: "Volcanic Landscapes", desc: "Lava flows, Shetani Caves, and dramatic scenery in Tsavo West." },
    ],
    experiences: [
      { title: "Game Drives", desc: "Explore vast landscapes and spot the iconic red elephants.", icon: Eye },
      { title: "Mzima Springs Visit", desc: "Watch hippos through underwater observation chambers.", icon: Camera },
      { title: "Shetani Lava Flows", desc: "Walk on volcanic formations in Tsavo West.", icon: Footprints },
      { title: "Guided Nature Walks", desc: "Explore with expert rangers beyond the vehicle.", icon: Users },
    ],
    accommodations: {
      budget: ["Voi Safari Lodge – Overlooking a waterhole, great wildlife views"],
      midRange: ["Kilaguni Serena Lodge – Kenya's first lodge, legendary history", "Ngulia Safari Lodge – Famous for bird ringing station"],
      luxury: ["Finch Hattons Luxury Camp – Colonial elegance at Tsavo West", "Salt Lick Safari Lodge – Iconic stilted lodge design"],
    },
    itineraries: [
      { title: "3-Day Tsavo Safari", desc: "Red elephants and Mzima Springs.", days: "3" },
      { title: "5-Day Tsavo & Coast", desc: "Safari to beach—the perfect Kenya combo.", days: "5" },
    ],
    quote: "Nature uses only the longest threads to weave her patterns.",
  },
  "diani-beach": {
    name: "Diani Beach",
    image: dianiImage,
    tagline: "Where Safari Meets the Sea",
    overview: [
      "Diani Beach is Kenya's premier coastal destination—a stretch of pristine white sand kissed by the warm turquoise waters of the Indian Ocean. It's the perfect ending (or beginning) to any safari.",
      "Beyond the beach, discover coral reefs, mangrove forests, and the playful colobus monkeys that swing through the coastal forest canopy.",
    ],
    bestTime: "Year-round (Dec–Mar and Jul–Oct are driest)",
    size: "17 km of beach",
    wildlife: "Marine life, colobus monkeys, whale sharks (seasonal), dolphins",
    gettingThere: "30 km south of Mombasa, flights from Nairobi or safari parks",
    advice: "Perfect for 2–3 days of beach relaxation after a safari.",
    wildlifeHighlights: [
      { title: "Marine Life", desc: "Coral reefs teeming with tropical fish, turtles, and dolphins." },
      { title: "Colobus Monkeys", desc: "The Angolan black-and-white colobus monkeys are a Diani icon." },
      { title: "Whale Sharks", desc: "Seasonal visitors to the Kenyan coast—swim alongside gentle giants." },
      { title: "Birdlife", desc: "Coastal forests host hundreds of species including Fischers Turaco." },
    ],
    experiences: [
      { title: "Snorkeling & Diving", desc: "Explore vibrant coral reefs and marine life.", icon: Eye },
      { title: "Dhow Sailing", desc: "Traditional wooden sailing boats along the coast at sunset.", icon: Camera },
      { title: "Colobus Conservation", desc: "Visit the Colobus Conservation center and learn about their work.", icon: Users },
      { title: "Beach Walks", desc: "Miles of pristine white sand to explore at your pace.", icon: Footprints },
    ],
    accommodations: {
      budget: ["Diani Backpackers – Social atmosphere, steps from the beach"],
      midRange: ["Baobab Beach Resort – All-inclusive comfort on the beachfront", "Swahili Beach Resort – Modern luxury with African flair"],
      luxury: ["The Sands at Nomad – Boutique beachfront elegance", "Alfajiri Villas – Cliff-top villas with infinity pools"],
    },
    itineraries: [
      { title: "3-Day Beach Escape", desc: "Sun, sand, and snorkeling on Kenya's coast.", days: "3" },
      { title: "7-Day Safari & Beach", desc: "Mara safari followed by Diani beach relaxation.", days: "7" },
    ],
    quote: "We are lucky to be alive. We should enjoy it.",
  },
  "serengeti": {
    name: "Serengeti (Tanzania)",
    image: serengetiImage,
    tagline: "The Endless Plains",
    overview: [
      "The Serengeti is one of the world's most famous ecosystems—a vast expanse of golden grasslands that hosts the greatest wildlife spectacle on Earth: the Great Migration.",
      "Over 1.5 million wildebeest, joined by hundreds of thousands of zebras and gazelles, follow an ancient circular route in search of fresh grazing. It's a story of survival that has played out for millennia.",
    ],
    bestTime: "June–October (Migration in Northern Serengeti), December–March (Calving in Southern Serengeti)",
    size: "14,763 sq km",
    wildlife: "1.5M wildebeest, Big Five, cheetahs, wild dogs, 500+ bird species",
    gettingThere: "Fly from Nairobi to Kilimanjaro, then connect to Serengeti airstrips",
    advice: "Plan according to migration patterns. Each season offers a different spectacle.",
    wildlifeHighlights: [
      { title: "The Migration", desc: "The greatest wildlife spectacle on Earth—millions of animals on the move." },
      { title: "Big Cats", desc: "The Serengeti has Africa's largest lion population and incredible cheetah sightings." },
      { title: "River Crossings", desc: "The dramatic Mara River crossings are nature's most intense moments." },
      { title: "The Calving Season", desc: "February–March: 8,000 calves born daily on the southern plains." },
    ],
    experiences: [
      { title: "Migration Tracking", desc: "Follow the herds with expert guides who know their patterns.", icon: Eye },
      { title: "Hot Air Balloon", desc: "Float over the endless plains at dawn. Unforgettable.", icon: Camera },
      { title: "Walking Safaris", desc: "Explore the Serengeti on foot with armed rangers.", icon: Footprints },
      { title: "Cultural Encounters", desc: "Visit Maasai communities on the edge of the Serengeti.", icon: Users },
    ],
    accommodations: {
      budget: ["Serengeti Heritage Camp – Comfortable mobile camp following the migration"],
      midRange: ["Serengeti Serena Lodge – Stunning location in the central Serengeti", "Dunia Camp – Intimate and eco-friendly"],
      luxury: ["Singita Grumeti – Ultra-luxury in a private concession", "Four Seasons Serengeti – Infinity pool overlooking the plains"],
    },
    itineraries: [
      { title: "4-Day Serengeti Safari", desc: "The highlights of the Serengeti including migration viewing.", days: "4" },
      { title: "7-Day Tanzania Classic", desc: "Serengeti, Ngorongoro Crater, and Tarangire.", days: "7" },
      { title: "10-Day Kenya & Tanzania", desc: "The ultimate East African safari combining both countries.", days: "10" },
    ],
    quote: "What I cannot create, I do not understand.",
  },
};

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const dest = slug ? destinationData[slug] : null;

  if (!dest) return <Navigate to="/destinations" replace />;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-foreground/30" />
        </div>
        <div className="relative z-10 section-padding pb-16 max-w-3xl">
          <div className="gold-divider-left mb-6" />
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-cream mb-3">{dest.name}</h1>
          <p className="font-heading text-xl italic text-cream/80">{dest.tagline}</p>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding py-20 lg:py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 lg:gap-16">
          <ScrollReveal className="md:col-span-3">
            <div className="gold-divider-left mb-6" />
            <h2 className="font-heading text-3xl font-semibold text-foreground mb-6">Where Wonder Has No Bounds</h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              {dest.overview.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="md:col-span-2">
            <div className="bg-warm-white p-8 border border-border space-y-4">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Quick Facts</h3>
              {[
                { label: "Best Time", value: dest.bestTime, icon: Calendar },
                { label: "Size", value: dest.size, icon: MapPin },
                { label: "Wildlife", value: dest.wildlife, icon: Eye },
                { label: "Getting There", value: dest.gettingThere, icon: MapPin },
              ].map((fact) => (
                <div key={fact.label} className="flex items-start gap-3">
                  <fact.icon className="w-4 h-4 text-accent mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-body text-xs font-medium text-foreground">{fact.label}</p>
                    <p className="font-body text-xs text-muted-foreground">{fact.value}</p>
                  </div>
                </div>
              ))}
              <div className="pt-3 border-t border-border">
                <p className="font-body text-xs italic text-accent">💡 {dest.advice}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Wildlife */}
      <section className="bg-warm-white section-padding py-20 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="gold-divider mb-6" />
            <h2 className="font-heading text-3xl font-semibold text-foreground">Wildlife Highlights</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dest.wildlifeHighlights.map((w, i) => (
              <ScrollReveal key={w.title} delay={i * 0.1}>
                <div className="bg-card p-6 border border-border h-full">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{w.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="section-padding py-20 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="gold-divider mb-6" />
            <h2 className="font-heading text-3xl font-semibold text-foreground">Experiences in {dest.name}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            {dest.experiences.map((exp, i) => (
              <ScrollReveal key={exp.title} delay={i * 0.1}>
                <div className="flex gap-5 p-6 bg-warm-white border border-border">
                  <exp.icon className="w-8 h-8 text-accent flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{exp.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">{exp.desc}</p>
                    <Link to="/contact" className="feynman-link inline-flex items-center gap-2 font-body text-xs font-medium">
                      Inquire <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section className="bg-warm-white section-padding py-20 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="gold-divider mb-6" />
            <h2 className="font-heading text-3xl font-semibold text-foreground">Where to Stay</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {(["budget", "midRange", "luxury"] as const).map((tier, i) => (
              <ScrollReveal key={tier} delay={i * 0.15}>
                <div className="bg-card p-8 border border-border h-full">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-1 capitalize">
                    {tier === "midRange" ? "Mid-Range" : tier}
                  </h3>
                  <div className="w-8 h-[2px] bg-accent mb-6" />
                  <ul className="space-y-4">
                    {dest.accommodations[tier].map((acc) => (
                      <li key={acc} className="font-body text-sm text-muted-foreground leading-relaxed">{acc}</li>
                    ))}
                  </ul>
                  <Link to="/contact" className="feynman-link mt-6 inline-flex items-center gap-2 font-body text-xs font-medium">
                    Check Availability <ArrowRight size={12} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Itineraries */}
      <section className="section-padding py-20 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="gold-divider mb-6" />
            <h2 className="font-heading text-3xl font-semibold text-foreground">Sample Itineraries</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {dest.itineraries.map((it, i) => (
              <ScrollReveal key={it.title} delay={i * 0.1}>
                <div className="bg-warm-white p-8 border border-border h-full flex flex-col">
                  <span className="font-body text-xs text-accent font-medium tracking-wider uppercase mb-3">{it.days} Days</span>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{it.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">{it.desc}</p>
                  <Link to="/contact" className="feynman-link mt-6 inline-flex items-center gap-2 font-body text-sm font-medium">
                    View Itinerary <ArrowRight size={14} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section-padding py-16 text-center bg-warm-white">
        <p className="quote-text text-lg max-w-2xl mx-auto">
          "{dest.quote}"
        </p>
      </section>
    </Layout>
  );
};

export default DestinationDetail;

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import maraImage from "@/assets/mara.jpg";
import amboseliImage from "@/assets/amboseli.jpg";
import samburuImage from "@/assets/samburu.jpg";
import tsavoImage from "@/assets/tsavo.jpg";
import dianiImage from "@/assets/diani.jpg";
import serengetiImage from "@/assets/serengeti.jpg";
import heroImage from "@/assets/hero-safari.jpg";

const destinations = [
  { name: "Maasai Mara", slug: "maasai-mara", image: maraImage, desc: "The land of the big cats and the great migration. Endless plains, endless wonder.", best: "Jul–Oct (Migration), Jan–Feb (Calving)", wildlife: "Big Five, cheetahs, hippos, 450+ bird species" },
  { name: "Amboseli", slug: "amboseli", image: amboseliImage, desc: "Elephants against Kilimanjaro. Swamps, plains, and Africa's highest peak.", best: "June–October, January–February", wildlife: "Large elephant herds, flamingos, lions" },
  { name: "Samburu", slug: "samburu", image: samburuImage, desc: "The Special Five. Arid beauty. Unique species. A landscape like nowhere else.", best: "June–October", wildlife: "Grevy's zebra, reticulated giraffe, gerenuk" },
  { name: "Tsavo", slug: "tsavo", image: tsavoImage, desc: "Red elephants. Vast spaces. Mzima Springs. Two parks, countless adventures.", best: "June–October", wildlife: "Red elephants, lions, buffalo, hippos" },
  { name: "Diani Beach", slug: "diani-beach", image: dianiImage, desc: "White sand. Turquoise water. Beach relaxation. The perfect safari ending.", best: "Year-round", wildlife: "Marine life, colobus monkeys" },
  { name: "Serengeti (Tanzania)", slug: "serengeti", image: serengetiImage, desc: "The endless plains. The migration. A world wonder waiting for you.", best: "June–October (Migration)", wildlife: "1.5M wildebeest, Big Five, cheetahs" },
];

const Destinations = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Kenyan landscapes" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-foreground/30" />
        </div>
        <div className="relative z-10 section-padding pb-16 max-w-3xl">
          <div className="gold-divider-left mb-6" />
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-cream mb-4">A Land of Endless Discovery</h1>
          <p className="font-body text-cream/80 leading-relaxed">
            From the savanna to the coast, every place tells a story.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="section-padding py-20 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="gold-divider mb-6" />
            <p className="quote-text text-lg">"Nature has a simplicity and therefore a great beauty."</p>
          </ScrollReveal>
          <div className="space-y-16">
            {destinations.map((dest, i) => (
              <ScrollReveal key={dest.name} delay={0.1}>
                <div
                  className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}
                >
                  <div className={`hover-image-zoom overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
                    <img src={dest.image} alt={dest.name} className="w-full h-[350px] object-cover" />
                  </div>
                  <div className={i % 2 === 1 ? "md:order-1" : ""}>
                    <div className="gold-divider-left mb-4" />
                    <h2 className="font-heading text-3xl font-semibold text-foreground mb-4">{dest.name}</h2>
                    <p className="font-body text-muted-foreground leading-relaxed mb-6">{dest.desc}</p>
                    <div className="space-y-2 mb-6">
                      <p className="font-body text-sm"><span className="font-medium text-foreground">Best Time:</span> <span className="text-muted-foreground">{dest.best}</span></p>
                      <p className="font-body text-sm"><span className="font-medium text-foreground">Wildlife:</span> <span className="text-muted-foreground">{dest.wildlife}</span></p>
                    </div>
                    <Link to={`/destinations/${dest.slug}`} className="feynman-link inline-flex items-center gap-2 font-body text-sm font-medium">
                      Explore {dest.name.split(" (")[0]} <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Destinations;

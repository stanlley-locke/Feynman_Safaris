import { Link } from "react-router-dom";
import { ArrowRight, Car, Plane, Star, Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import heroImage from "@/assets/private-safari.jpg";
import privateImage from "@/assets/private-safari.jpg";
import luxuryImage from "@/assets/luxury-safari.jpg";
import groupImage from "@/assets/group-safari.jpg";
import bespokeImage from "@/assets/bespoke-safari.jpg";

const safariTypes = [
  {
    title: "Private Safaris",
    icon: Car,
    desc: "Your own vehicle. Your own guide. Your own pace. Perfect for families, couples, or anyone who wants the freedom to follow curiosity wherever it leads.",
    image: privateImage,
    link: "/contact",
  },
  {
    title: "Luxury Safaris",
    icon: Star,
    desc: "The finest lodges. The most exclusive camps. Private sundowners. Champagne in the bush. Wilderness, wrapped in elegance.",
    image: luxuryImage,
    link: "/contact",
  },
  {
    title: "Group Joining Tours",
    icon: Calendar,
    desc: "Fixed departures. Like-minded travelers. The magic of shared discovery. Perfect for solo adventurers and small groups.",
    image: groupImage,
    link: "/contact",
  },
  {
    title: "Air Safaris",
    icon: Plane,
    desc: "Cover more ground. See more wonders. Fly between destinations, saving time and fatigue. Kenya from above is unforgettable.",
    image: bespokeImage,
    link: "/contact",
  },
];

const Safaris = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Safari vehicle on the Mara plains" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-foreground/30" />
        </div>
        <div className="relative z-10 section-padding pb-16 max-w-3xl">
          <div className="gold-divider-left mb-6" />
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-cream mb-4">Safaris Designed Around You</h1>
          <p className="font-body text-cream/80 leading-relaxed">
            Whether you seek solitude or shared discovery, barefoot luxury or authentic simplicity, we build journeys that reflect not just where you want to go, but how you want to feel.
          </p>
        </div>
      </section>

      {/* Safari Types */}
      <section className="section-padding py-20 lg:py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {safariTypes.map((safari, i) => (
            <ScrollReveal key={safari.title} delay={i * 0.1}>
              <div className="group relative h-[400px] overflow-hidden">
                <img src={safari.image} alt={safari.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <safari.icon className="w-8 h-8 text-gold mb-4" strokeWidth={1.5} />
                  <h3 className="font-heading text-2xl font-semibold text-cream mb-3">{safari.title}</h3>
                  <p className="font-body text-sm text-cream/75 mb-5 leading-relaxed">{safari.desc}</p>
                  <Link to={safari.link} className="inline-flex items-center gap-2 text-gold font-body text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-warm-white section-padding py-20 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="gold-divider mb-6" />
            <h2 className="font-heading text-3xl font-semibold text-foreground">Additional Services</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Airport Transfers", desc: "From touchdown to takeoff, we've got you. Private vehicles, flight monitoring, meet-and-greet." },
              { title: "Accommodation Booking", desc: "Where you stay matters. Curated lodges, camps, and hotels for every budget." },
              { title: "Custom Itineraries", desc: "No templates. No formulas. Tell us your dream. We'll build it." },
            ].map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.1}>
                <div className="bg-card p-8 border border-border h-full">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">{service.desc}</p>
                  <Link to="/contact" className="feynman-link inline-flex items-center gap-2 font-body text-sm font-medium">
                    Inquire <ArrowRight size={14} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section-padding py-16 text-center">
        <p className="quote-text text-lg max-w-2xl mx-auto">
          "The world looks so different after learning science. For example, trees are made of air and sunlight."
        </p>
      </section>
    </Layout>
  );
};

export default Safaris;

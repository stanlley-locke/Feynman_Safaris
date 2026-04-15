import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Wine, Compass, Users } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import landingVideo from "@/assets/landing.mp4";
import heroImage from "@/assets/hero-safari.jpg";
import welcomeImage from "@/assets/welcome-sundowner.jpg";
import privateImage from "@/assets/private-safari.jpg";
import luxuryImage from "@/assets/luxury-safari.jpg";
import groupImage from "@/assets/group-safari.jpg";
import bespokeImage from "@/assets/bespoke-safari.jpg";
import maraImage from "@/assets/mara.jpg";
import amboseliImage from "@/assets/amboseli.jpg";
import samburuImage from "@/assets/samburu.jpg";
import tsavoImage from "@/assets/tsavo.jpg";
import dianiImage from "@/assets/diani.jpg";
import serengetiImage from "@/assets/serengeti.jpg";
import testimonialBg from "@/assets/testimonial-bg.jpg";
import campfireImage from "@/assets/campfire-night.jpg";

const testimonials = [
  {
    text: "I've been on safaris before. But never like this. Our guide didn't just point out animals—he taught us to see them. To understand them. By the end, I felt like I was saying goodbye to friends.",
    name: "SARAH, LONDON",
    trip: "Private Safari, Maasai Mara",
  },
  {
    text: "The attention to detail was extraordinary. They thought of things I didn't even know to ask for. But what I'll remember most is sitting under an acacia tree at sunset, just... being there. Perfect.",
    name: "DAVID, NEW YORK",
    trip: "Luxury Safari, Amboseli & Mara",
  },
  {
    text: "As a solo traveler, I was nervous about a group tour. I left with new friends and a deeper understanding of Kenya than I ever imagined. The Feynman philosophy is real.",
    name: "EMMA, MELBOURNE",
    trip: "Group Joining Tour, 7 Days",
  },
];

const destinations = [
  { name: "Maasai Mara", slug: "maasai-mara", image: maraImage, desc: "The land of the big cats and the great migration." },
  { name: "Amboseli", slug: "amboseli", image: amboseliImage, desc: "Elephants against Kilimanjaro." },
  { name: "Samburu", slug: "samburu", image: samburuImage, desc: "The Special Five. Arid beauty." },
  { name: "Tsavo", slug: "tsavo", image: tsavoImage, desc: "Red elephants. Vast spaces." },
  { name: "Diani Beach", slug: "diani-beach", image: dianiImage, desc: "White sand. Turquoise water." },
  { name: "Serengeti", slug: "serengeti", image: serengetiImage, desc: "The endless plains." },
];

const experiences = [
  { title: "Private Safaris", desc: "Your vehicle. Your guide. Your pace. No compromises. Just discovery.", image: privateImage, link: "/safaris" },
  { title: "Luxury Safaris", desc: "Wilderness wrapped in elegance. Where comfort meets the extraordinary.", image: luxuryImage, link: "/safaris" },
  { title: "Group Joining Tours", desc: "Share the wonder with kindred spirits. Fixed departures, flexible souls.", image: groupImage, link: "/safaris" },
  { title: "Bespoke Journeys", desc: "Tell us your dream. We'll build it. No limits. No templates. Just you.", image: bespokeImage, link: "/contact" },
];

const Index = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialFading, setTestimonialFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialFading(true);
      setTimeout(() => {
        setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
        setTestimonialFading(false);
      }, 500);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src={landingVideo} type="video/mp4" />
            <img src={heroImage} alt="Golden hour safari in the Maasai Mara" className="w-full h-full object-cover" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/60" />
        </div>
        <div className="relative z-10 text-center text-cream section-padding">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-4 animate-fade-up">
            FEYNMAN
          </h1>
          <p className="font-body text-lg md:text-xl tracking-[0.4em] uppercase mb-10 opacity-90 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Adventure. Connect. Entertain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/our-story" className="px-8 py-3 border border-cream/60 text-cream font-body text-sm tracking-wider hover:bg-cream/10 transition-all duration-300">
              Watch the Film
            </Link>
            <Link to="/contact" className="px-8 py-3 bg-accent text-accent-foreground font-body text-sm tracking-wider hover:bg-gold-light transition-all duration-300">
              Begin Your Journey
            </Link>
          </div>
        </div>
        <p className="absolute bottom-8 right-8 quote-text text-xs text-cream/60 hidden md:block max-w-xs text-right">
          "The beauty of a flower is deeper when you understand it." — RPF
        </p>
      </section>

      {/* Welcome */}
      <section className="section-padding py-20 lg:py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <div className="hover-image-zoom rounded-sm overflow-hidden">
              <img src={welcomeImage} alt="Guests enjoying sundowner drinks" className="w-full h-[400px] lg:h-[500px] object-cover" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="gold-divider-left mb-6" />
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold mb-6 text-foreground">
              Welcome to Feynman.
            </h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>Most safari companies show you Africa. We want you to <em>understand</em> it.</p>
              <p>
                Our name comes from Richard Feynman—a Nobel Prize-winning physicist who believed that wonder was the driving force of all discovery. He could explain the most complex ideas with such clarity and joy that you forgot you were learning.
              </p>
              <p>
                At Feynman Safaris, we apply that same philosophy to every journey. We obsess over your experience so you can obsess over the wonder around you.
              </p>
            </div>
            <Link to="/our-story" className="feynman-link mt-8 inline-flex items-center gap-2 font-body text-sm font-medium tracking-wide">
              Read Our Story <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-warm-white section-padding py-20 lg:py-28">
        <ScrollReveal className="max-w-6xl mx-auto text-center mb-16">
          <div className="gold-divider mb-6" />
          <p className="font-heading text-xl lg:text-2xl italic text-foreground">
            "We don't just take you places. We take you there <em>differently.</em>"
          </p>
        </ScrollReveal>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 lg:gap-16">
          {[
            { icon: Wine, title: "Entertain", text: "Safaris should delight, not just educate. We surprise. We indulge. We create moments that feel like they belong in a film. A sundowner where you least expect it. A story around the campfire. A picnic in the middle of nowhere." },
            { icon: Compass, title: "Adventure", text: "Curiosity is our compass. We don't follow the same roads as everyone else. We ask questions. We follow tracks. We help you discover not just wildlife, but the why behind it all." },
            { icon: Users, title: "Connect", text: "To the land. To the wildlife. To the people. To yourself. A Feynman safari leaves you changed—because you've truly connected with something deeper than a photograph." },
          ].map((pillar, i) => (
            <ScrollReveal key={pillar.title} delay={i * 0.15}>
              <div className="text-center">
                <pillar.icon className="w-10 h-10 text-accent mx-auto mb-5" strokeWidth={1.5} />
                <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">{pillar.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{pillar.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Signature Experiences */}
      <section className="section-padding py-20 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="gold-divider mb-6" />
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold mb-3 text-foreground">Curated for the Curious</h2>
            <p className="font-body text-muted-foreground">Four ways to experience Kenya. One philosophy behind them all.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.title} delay={i * 0.1}>
                <Link
                  to={exp.link}
                  className="group relative h-[350px] lg:h-[400px] overflow-hidden block"
                >
                  <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="font-heading text-2xl font-semibold text-cream mb-2">{exp.title}</h3>
                    <p className="font-body text-sm text-cream/80 mb-4">{exp.desc}</p>
                    <span className="inline-flex items-center gap-2 text-gold font-body text-sm font-medium group-hover:gap-3 transition-all duration-300">
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="bg-warm-white section-padding py-20 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="gold-divider mb-6" />
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold mb-3 text-foreground">Places That Stay With You</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, i) => (
              <ScrollReveal key={dest.name} delay={i * 0.08}>
                <Link
                  to={`/destinations/${dest.slug}`}
                  className="group relative h-[280px] overflow-hidden block"
                >
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="w-8 h-[2px] bg-gold mb-3 transition-all duration-300 group-hover:w-12" />
                    <h3 className="font-heading text-xl font-semibold text-cream mb-1">{dest.name}</h3>
                    <p className="font-body text-xs text-cream/70">{dest.desc}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journal */}
      <section className="section-padding py-20 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="gold-divider mb-6" />
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold mb-3 text-foreground">Stories to Fuel Your Curiosity</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Why the Mara Deserves Four Days, Not Two", excerpt: "Most tours rush through. Here's why slowing down changes everything." },
              { title: "The Secret Language of Acacia Trees", excerpt: "They communicate. They defend themselves. They're smarter than you think." },
              { title: "What I Learned Following Elephants for a Week", excerpt: "Patience, family, and the wisdom of the herd." },
            ].map((post, i) => (
              <ScrollReveal key={post.title} delay={i * 0.1}>
                <Link to="/journal" className="group block">
                  <div className="h-[200px] bg-secondary mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-accent/10 to-terracotta/10 flex items-center justify-center">
                      <span className="font-heading text-4xl text-accent/30">✦</span>
                    </div>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">{post.excerpt}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/journal" className="feynman-link inline-flex items-center gap-2 font-body text-sm font-medium tracking-wide">
              Read All Stories <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={testimonialBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="relative z-10 section-padding max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-cream mb-12">
            Not Just Clients. Fellow Travelers.
          </h2>
          <div className={`transition-opacity duration-500 ${testimonialFading ? "opacity-0" : "opacity-100"}`}>
            <span className="text-gold text-6xl font-heading leading-none">"</span>
            <p className="font-heading text-lg lg:text-xl italic text-cream/90 leading-relaxed mb-8 -mt-4">
              {testimonials[testimonialIndex].text}
            </p>
            <p className="font-body text-sm text-gold tracking-wider font-medium">
              — {testimonials[testimonialIndex].name}
            </p>
            <p className="font-body text-xs text-cream/50 mt-1">
              {testimonials[testimonialIndex].trip}
            </p>
          </div>
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setTestimonialFading(true); setTimeout(() => { setTestimonialIndex(i); setTestimonialFading(false); }, 300); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === testimonialIndex ? "bg-gold w-6" : "bg-cream/30"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Invitation */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={campfireImage} alt="Safari campfire under the stars" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 section-padding max-w-3xl mx-auto text-center">
          <div className="gold-divider mb-8" />
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-cream mb-6">
            Ready for Something Deeper?
          </h2>
          <p className="font-body text-cream/80 mb-10 leading-relaxed">
            A Feynman safari isn't just a trip. It's a transformation. Let's start designing yours.
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-4 bg-accent text-accent-foreground font-body text-sm tracking-wider hover:bg-gold-light transition-all duration-300"
          >
            Plan My Safari
          </Link>
          <p className="quote-text text-sm text-cream/40 mt-8">
            "The same equations have the most beautiful solutions." — RPF
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

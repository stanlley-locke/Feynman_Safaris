"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Map } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";

const heroImage = "/assets/destinations-hero.jpg";

// Minimal static fallback for basic structure
const staticFallbacks = [
  { name: "Maasai Mara", slug: "maasai-mara", image: "/assets/mara.jpg", description: "The land of the big cats and the great migration. Endless plains, endless wonder.", bestTime: "Jul–Oct (Migration)", wildlife: "Big Five" },
  { name: "Amboseli", slug: "amboseli", image: "/assets/amboseli.jpg", description: "Elephants against Kilimanjaro. Swamps, plains, and Africa's highest peak.", bestTime: "June–October", wildlife: "Elephant herds" },
];

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("/api/destinations");
        const data = await res.json();
        if (data && data.length > 0) {
          setDestinations(data);
        } else {
          setDestinations(staticFallbacks);
        }
      } catch (err) {
        setDestinations(staticFallbacks);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

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
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-cream mb-4 uppercase tracking-tighter">A Land of Endless Discovery</h1>
          <p className="font-body text-cream/80 leading-relaxed max-w-xl">
            From the savanna to the coast, every place tells a story. Our curated collection of destinations represents the true heart of the wild.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="section-padding py-20 lg:py-32 bg-background">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-24">
            <div className="gold-divider mb-6" />
            <p className="quote-text text-xl italic text-foreground/90">"Nature has a simplicity and therefore a great beauty."</p>
          </ScrollReveal>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="h-10 w-10 text-gold animate-spin" />
              <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">Consulting the Maps...</p>
            </div>
          ) : (
            <div className="space-y-32">
              {destinations.map((dest, i) => (
                <ScrollReveal key={dest.id || dest.slug} delay={0.1}>
                  <div className={`grid md:grid-cols-2 gap-12 lg:gap-24 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
                    <div className={`relative group overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={dest.image || "/assets/placeholder.jpg"} 
                          alt={dest.name} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                        />
                      </div>
                      <div className="absolute inset-0 border border-gold/20 pointer-events-none translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
                    </div>
                    
                    <div className={i % 2 === 1 ? "md:order-1 text-left" : "text-left"}>
                      <div className="gold-divider-left mb-6" />
                      <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6 uppercase tracking-tight">{dest.name}</h2>
                      <p className="font-body text-muted-foreground leading-relaxed mb-8 text-lg">
                        {dest.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-8 mb-10 border-y border-foreground/5 py-8">
                        <div className="space-y-1">
                          <p className="font-heading text-[10px] uppercase tracking-widest text-gold font-bold">Best Experience</p>
                          <p className="font-body text-sm text-foreground/80">{dest.bestTime || "Year Round"}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-heading text-[10px] uppercase tracking-widest text-gold font-bold">Key Wildlife</p>
                          <p className="font-body text-sm text-foreground/80">{dest.wildlife || "Various Species"}</p>
                        </div>
                      </div>

                      <Link href={`/destinations/${dest.slug}`} className="feynman-link inline-flex items-center gap-3 font-body text-sm font-bold uppercase tracking-widest group">
                        Explore {dest.name.split(" ")[0]} 
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-2 text-gold" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

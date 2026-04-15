"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Hotel, Star, MapPin, Compass, Loader2, Globe, Shield, Coffee, Wifi, Waves } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AccommodationsPage() {
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/accommodations");
        const data = await res.json();
        setAccommodations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load accommodations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = ["All", ...Array.from(new Set(accommodations.map(a => a.category || "Luxury")))];
  const filtered = filter === "All" 
    ? accommodations 
    : accommodations.filter(a => a.category === filter);

  const getSafeExternalUrl = (website?: string | null) => {
    if (!website) return null;
    const trimmed = website.trim();
    if (!trimmed || trimmed === "https://" || trimmed === "http://") return null;
    const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    try {
      const parsed = new URL(candidate);
      return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.toString() : null;
    } catch {
      return null;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden text-center bg-neutral-900 border-b border-gold/10">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2650&auto=format&fit=crop" 
            alt="Luxury Stays" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950" />
        </div>
        
        <div className="relative z-10 px-4">
          <ScrollReveal>
            <span className="text-gold tracking-[0.3em] uppercase text-[10px] mb-4 block font-bold italic">Unrivaled Hospitality</span>
            <h1 className="text-5xl md:text-8xl font-heading font-black text-white mb-6 uppercase tracking-tighter leading-none">
              Sanctuary <span className="text-gold italic">Stays</span>
            </h1>
            <div className="h-1 w-24 bg-gold mx-auto" />
          </ScrollReveal>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-background py-12 border-b border-gold/5 sticky top-20 z-30 backdrop-blur-md bg-background/80">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "text-[10px] uppercase font-bold tracking-[0.4em] transition-all duration-300 relative group",
                filter === cat ? "text-gold" : "text-neutral-500 hover:text-gold"
              )}
            >
              {cat}
              <span className={cn(
                "absolute -bottom-2 left-0 h-[1px] bg-gold transition-all duration-500",
                filter === cat ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </button>
          ))}
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
               <Loader2 className="h-10 w-10 text-gold animate-spin" />
               <p className="font-body text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold italic">Consulting the registry...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-gold/10 bg-neutral-900/10">
               <Hotel className="h-12 w-12 text-neutral-800 mx-auto mb-6" />
               <p className="font-body text-neutral-500 italic max-w-md mx-auto">Our sanctuaries are currently at full capacity or being prepared for your arrival.</p>
            </div>
          ) : (
            <div className="space-y-32">
              {filtered.map((acc, i) => {
                const websiteUrl = getSafeExternalUrl(acc.website);
                return (
                <ScrollReveal key={acc.id} delay={0.1}>
                  <div className={`grid md:grid-cols-2 gap-12 lg:gap-24 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
                    <div className={`relative group overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
                       <div className="aspect-[16/10] overflow-hidden border border-gold/10">
                          <img 
                            src={acc.image || "https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop"} 
                            alt={acc.name} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                       </div>
                       <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-all duration-700" />
                       <div className="absolute top-6 left-6">
                          <Badge className="bg-gold text-charcoal rounded-none px-4 py-1 text-[9px] uppercase font-black tracking-widest border-none italic">
                             {acc.category || "Luxury"}
                          </Badge>
                       </div>
                    </div>

                    <div className={i % 2 === 1 ? "md:order-1 text-left" : "text-left"}>
                       <div className="gold-divider-left mb-6" />
                       <div className="flex items-center gap-4 mb-4">
                          <h2 className="font-heading text-4xl lg:text-5xl font-black text-foreground uppercase tracking-tighter">{acc.name}</h2>
                          <div className="flex items-center gap-0.5 text-gold">
                             {Array.from({ length: acc.rating || 5 }).map((_, i) => (
                               <Star key={i} className="h-4 w-4 fill-gold" />
                             ))}
                          </div>
                       </div>
                       
                       <p className="font-body text-neutral-400 text-lg leading-relaxed mb-8 lowercase tracking-wide first-letter:uppercase">
                          {acc.description || "An immersive experience in the heart of the wild, where luxury meets the untamed beauty of the Kenyan landscape."}
                       </p>

                       <div className="flex items-center gap-6 mb-10 text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500 border-l border-gold/20 pl-6">
                          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> {acc.location}</span>
                          <span className="flex items-center gap-2"><Globe className="h-4 w-4 text-gold" /> Partner Property</span>
                       </div>

                       <div className="flex flex-wrap gap-4 mb-12">
                          {["Private Deck", "Gourmet Dining", "Expert Guides"].map((ame) => (
                            <span key={ame} className="bg-neutral-900 border border-neutral-800 px-4 py-2 text-[9px] uppercase tracking-widest font-bold text-neutral-300 italic">
                               {ame}
                            </span>
                          ))}
                       </div>

                       {websiteUrl ? (
                         <Button asChild className="bg-foreground text-background hover:bg-gold hover:text-charcoal rounded-none px-10 py-8 font-bold uppercase tracking-[0.3em] transition-all duration-500">
                           <a href={websiteUrl} target="_blank" rel="noopener noreferrer">Explore Property</a>
                         </Button>
                       ) : (
                         <Button className="bg-foreground text-background hover:bg-gold hover:text-charcoal rounded-none px-10 py-8 font-bold uppercase tracking-[0.3em] transition-all duration-500">
                           Inquire Availability
                         </Button>
                       )}
                    </div>
                  </div>
                </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Trust Quote */}
      <section className="section-padding py-24 text-center border-t border-gold/5 bg-background">
        <ScrollReveal>
           <p className="quote-text text-xl italic text-foreground/30 max-w-2xl mx-auto mb-12">
             "Luxury is the quality of being extremely comfortable or elegant, especially when that comfort is found in the heart of the wild."
           </p>
           <div className="inline-block p-4 border border-gold/20">
              <Link href="/contact" className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold hover:text-foreground transition-colors">Book Your Sanctuary</Link>
           </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

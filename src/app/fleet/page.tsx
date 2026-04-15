"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Truck, Wind, MapPin, Zap, ShieldCheck, Loader2, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function FleetPage() {
  const [fleet, setFleet] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const res = await fetch("/api/transport");
        const data = await res.json();
        setFleet(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load fleet:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFleet();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden text-center bg-neutral-900 border-b border-gold/10">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2670&auto=format&fit=crop" 
            alt="Safari Fleet" 
            className="w-full h-full object-cover opacity-40 scale-105 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950" />
        </div>
        
        <div className="relative z-10 px-4">
          <ScrollReveal>
             <span className="text-gold tracking-[0.3em] uppercase text-[10px] mb-4 block font-bold italic">The Wilderness Transit</span>
             <h1 className="text-5xl md:text-8xl font-heading font-black text-white mb-6 uppercase tracking-tighter leading-none">
               Safari <span className="text-gold italic">Fleet</span>
             </h1>
             <div className="h-1 w-24 bg-gold mx-auto" />
          </ScrollReveal>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-4 bg-background border-b border-gold/5">
         <div className="max-w-4xl mx-auto text-center space-y-8">
            <ScrollReveal>
               <h2 className="font-heading text-xs uppercase tracking-[0.5em] text-gold font-bold mb-4">Precision Engineering</h2>
               <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground uppercase tracking-tight">Our Mission Control for the Wild</h3>
               <p className="font-body text-neutral-400 text-lg leading-relaxed lowercase tracking-wide first-letter:uppercase">
                 Our fleet is more than just transport; it's your mobile sanctuary in the untamed wilderness. Modified to Feynman's scientific standards, every vehicle and aircraft ensures safety, comfort, and an unobstructed view of the infinite.
               </p>
            </ScrollReveal>
         </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
               <Loader2 className="h-10 w-10 text-gold animate-spin" />
               <p className="font-body text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold italic">Checking hanger status...</p>
            </div>
          ) : fleet.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-gold/10 bg-neutral-900/10">
               <Truck className="h-12 w-12 text-neutral-800 mx-auto mb-6" />
               <p className="font-body text-neutral-500 italic max-w-md mx-auto">The fleet is currently out on custom expeditions. New units are being calibrated.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {fleet.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 0.1}>
                  <div className="group bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-gold/30 transition-all duration-500 flex flex-col h-full shadow-2xl shadow-black/50">
                    <div className="h-56 bg-neutral-950 relative overflow-hidden">
                       {item.image ? (
                         <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt={item.name} />
                       ) : (
                         <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <Zap size={80} strokeWidth={0.5} />
                         </div>
                       )}
                       <div className="absolute top-4 left-4">
                          <Badge className="bg-gold text-charcoal rounded-none text-[8px] uppercase font-black tracking-widest px-3 h-6 border-none italic">
                             {item.type}
                          </Badge>
                       </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow space-y-6">
                       <div className="space-y-2">
                          <h4 className="font-heading text-2xl font-bold text-neutral-100 uppercase tracking-tight">{item.name}</h4>
                          <div className="flex items-center gap-2 text-[10px] text-gold uppercase tracking-[0.3em] font-bold italic">
                             {item.type.includes("Air") ? <Wind className="h-3 w-3" /> : <Truck className="h-3 w-3" />}
                             Certified Transit
                          </div>
                       </div>

                       <p className="font-body text-neutral-500 text-sm leading-relaxed lowercase tracking-wide first-letter:uppercase flex-grow">
                          {item.description || "Fully equipped for extended stays in remote territories. Custom modifications for photography and maximum comfort."}
                       </p>

                       <div className="grid grid-cols-2 gap-4 py-6 border-y border-neutral-800">
                          <div className="space-y-1">
                             <p className="text-[9px] text-neutral-600 uppercase font-bold tracking-widest">Base Hub</p>
                             <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-bold uppercase truncate">
                                <MapPin className="h-3 w-3 text-gold/60" /> {item.location || "Nairobi"}
                             </div>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[9px] text-neutral-600 uppercase font-bold tracking-widest">Trust Level</p>
                             <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase">
                                <ShieldCheck className="h-3 w-3" /> Serviced
                             </div>
                          </div>
                       </div>

                       <Button className="w-full bg-foreground text-background hover:bg-gold hover:text-charcoal rounded-none h-12 font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 border border-gold/10">
                          Secure Expedition
                       </Button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Technical Logistics Section */}
      <section className="bg-neutral-950 py-24 border-t border-gold/10">
         <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
            {[
              { icon: Zap, title: "Modified 4x4s", desc: "Every cruiser is customized with pop-up roofs and charging ports." },
              { icon: ShieldCheck, title: "Zero Failure", desc: "Rigorous scientific maintenance schedules for all fleet units." },
              { icon: Compass, title: "GPS Tracking", desc: "Real-time mission control monitoring for all expeditions." }
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                 <div className="space-y-4">
                    <feature.icon className="h-8 w-8 text-gold" />
                    <h5 className="font-heading text-lg font-bold text-white uppercase tracking-tight">{feature.title}</h5>
                    <p className="text-neutral-500 text-sm font-body leading-relaxed">{feature.desc}</p>
                 </div>
              </ScrollReveal>
            ))}
         </div>
      </section>
    </Layout>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

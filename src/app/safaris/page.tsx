"use client";

import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Gem, Users } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";

const safariTypes = [
  {
    title: "Private Safaris",
    icon: Compass,
    description: "Your journey, your pace. A fully personalized experience with a private vehicle and a dedicated Feynman guide.",
    image: "/assets/private-safari.jpg",
    features: ["Exclusive vehicle", "Customized itinerary", "Expert private guide"]
  },
  {
    title: "Luxury Safaris",
    icon: Gem,
    description: "The pinnacle of comfort in the wild. Stay in the continent's most prestigious lodges and camps.",
    image: "/assets/luxury-safari.jpg",
    features: ["5-star accommodations", "Bespoke service", "Bush dining & sundowners"]
  },
  {
    title: "Group Joining Tours",
    icon: Users,
    description: "Connect with like-minded adventurers. Scheduled departures offering social exploration and exceptional value.",
    image: "/assets/group-safari.jpg",
    features: ["Shared costs", "Social experience", "Pre-set dates"]
  },
  {
    title: "Bespoke Experiences",
    icon: ShieldCheck,
    description: "Weddings, honeymoons, or scientific expeditions. We design what you imagine.",
    image: "/assets/bespoke-safari.jpg",
    features: ["Thematic planning", "Specialized logistics", "Memorable milestones"]
  }
];

export default function SafarisPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/amboseli.jpg" alt="Safari adventure" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/60" />
        </div>
        <div className="relative z-10 text-center section-padding max-w-4xl">
          <ScrollReveal>
             <div className="gold-divider mb-6" />
             <h1 className="font-heading text-4xl lg:text-6xl font-bold text-cream mb-6">Choose Your Journey</h1>
             <p className="font-body text-white text-lg leading-relaxed max-w-2xl mx-auto">
               From the absolute solitude of a private expedition to the shared joy of a group patrol, discover the safari style that speaks to you.
             </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Safari Grid */}
      <section className="section-padding py-20 lg:py-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16">
          {safariTypes.map((safari, i) => (
            <ScrollReveal key={safari.title} delay={i * 0.1}>
              <div className="group border border-neutral-200 bg-warm-white hover:border-gold/30 transition-all duration-500 overflow-hidden">
                 <div className="h-[300px] overflow-hidden relative">
                   <img 
                    src={safari.image} 
                    alt={safari.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                   />
                   <div className="absolute top-6 left-6 h-12 w-12 bg-white flex items-center justify-center shadow-lg">
                      <safari.icon className="h-6 w-6 text-gold" />
                   </div>
                 </div>
                 <div className="p-8 lg:p-10 space-y-6">
                    <h3 className="font-heading text-2xl lg:text-3xl font-bold">{safari.title}</h3>
                    <p className="font-body text-muted-foreground leading-relaxed">{safari.description}</p>
                    <ul className="space-y-3">
                       {safari.features.map(feature => (
                         <li key={feature} className="flex items-center gap-3 font-body text-sm text-neutral-600">
                           <div className="h-1.5 w-1.5 bg-gold" /> {feature}
                         </li>
                       ))}
                    </ul>
                    <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                       <Link href="/contact" className="feynman-link flex items-center gap-2 font-body text-sm font-bold uppercase tracking-widest">
                         Inquire <ArrowRight size={16} />
                       </Link>
                       <span className="text-[10px] text-neutral-400 font-body uppercase tracking-wider">Expertly Curated</span>
                    </div>
                 </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-charcoal text-cream py-20 lg:py-28 section-padding text-center overflow-hidden">
         <ScrollReveal>
           <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-8">Not sure which one to pick?</h2>
           <p className="font-body opacity-70 mb-10 max-w-xl mx-auto">
             Speak with our safari architects. We build expeditions around your dreams, not catalogs.
           </p>
           <Button className="bg-gold text-charcoal hover:bg-gold-light rounded-none px-12 py-7 font-body font-bold text-sm tracking-widest uppercase">
             Consult our experts
           </Button>
         </ScrollReveal>
      </section>
    </Layout>
  );
}

"use client";

import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { TreePine, Heart, Users, Compass } from "lucide-react";

export default function SustainabilityPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/tsavo.jpg" alt="Sustainability" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/50 to-foreground/70" />
        </div>
        <div className="relative z-10 text-center section-padding max-w-3xl">
          <ScrollReveal>
            <p className="font-body text-sm uppercase tracking-[0.35em] text-gold mb-4 font-bold">Our Commitment</p>
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-cream mb-4">Protecting the Tapestry</h1>
            <p className="font-body text-white text-lg italic max-w-2xl mx-auto">
              "Nature uses only the longest threads to weave her patterns, so that each small piece of her fabric reveals the organization of the entire tapestry."
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pt-8 pb-20 lg:pt-12 lg:pb-32 bg-warm-white">
        <div className="section-padding" />
      </section>

      <section className="section-padding py-20 lg:py-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="space-y-6 font-body text-muted-foreground leading-relaxed text-lg text-left">
              <h2 className="font-heading text-3xl font-semibold text-foreground mb-4">Responsible Wonder</h2>
              <p>
                We believe that you can't truly understand a landscape unless you are committed to protecting it. Richard Feynman's deep appreciation for the complexity of nature is the foundation of our sustainability policy.
              </p>
              <p>
                At Feynman Safaris, we operate with a "leave no trace" philosophy, but we go further. We actively contribute to reforestation, anti-poaching, and community education programs in every region we operate.
              </p>
              <p>
                Every booking made with us directly supports local conservation efforts. Understanding the "cells, the chemistry, and the light" of the African Savannah means knowing how fragile it is, and taking responsibility for its future.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: TreePine, title: "Conservation", desc: "Protecting habitats and supporting anti-poaching initiatives." },
                { icon: Users, title: "Community", desc: "Partnering with local schools and women's cooperatives." },
                { icon: Heart, title: "Ethics", desc: "Strict adherence to animal welfare and fair labor practices." },
                { icon: Compass, title: "Education", desc: "Teaching our guests and communities about ecology." }
              ].map((item, i) => (
                <div key={item.title} className="p-8 bg-warm-white border border-accent/10 shadow-sm hover:shadow-md transition-all">
                  <item.icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="font-body text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-foreground text-cream py-20 lg:py-32 section-padding text-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold mb-8">
              "Reality must take precedence over public relations... Nature cannot be fooled."
            </h2>
            <p className="font-body opacity-80 leading-relaxed mb-12">
              We don't "greenwash." We provide transparent reports on where our conservation funds go. We believe in real impact, not marketing slogans.
            </p>
            <div className="gold-divider mx-auto" />
          </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
}

"use client";

import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Lightbulb, BookOpen, Smile, Zap } from "lucide-react";

export default function PhilosophyPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/richard_feynman_1.jpeg" alt="Richard Feynman" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/50 to-foreground/70" />
        </div>
        <div className="relative z-10 text-center section-padding max-w-3xl">
          <ScrollReveal>
            <p className="font-body text-sm uppercase tracking-[0.35em] text-gold mb-4 font-bold">Our Philosophy</p>
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-cream mb-4">The Feynman Method</h1>
            <p className="font-body text-white text-lg italic">
              "If you can't explain it to a six-year-old, you don't understand it yourself."
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
              <h2 className="font-heading text-3xl font-semibold text-foreground mb-4">Discovery as Play</h2>
              <p>
                Richard Feynman didn't just study physics; he played with it. He spent his life investigating everything from how a water sprinkler works to why the first leaf on a tree turns yellow.
              </p>
              <p>
                At Feynman Safaris, we believe the best way to experience the wild is with that same sense of "passionate curiosity." We don't just show you a lion; we want you to understand the ecology, the tension, and the history behind that specific pride.
              </p>
              <p>
                When you understand the <em>why</em> behind what you're seeing, the beauty of the moment isn't just visual—it's intellectual and emotional. It becomes part of you.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Lightbulb, title: "Clarification", desc: "No jargon. No lectures. Just clear, joyful understanding." },
                { icon: BookOpen, title: "Storytelling", desc: "Every animal, tree, and landscape has a story. We tell it." },
                { icon: Smile, title: "Joy", desc: "Learning should be fun. If we aren't laughing, we aren't doing it right." },
                { icon: Zap, title: "Connection", desc: "Seeing the links between all things in the ecosystem." }
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

      <section className="bg-charcoal text-cream py-20 lg:py-32 section-padding text-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold mb-8">
              "The first principle is that you must not fool yourself—and you are the easiest person to fool."
            </h2>
            <p className="font-body opacity-80 leading-relaxed mb-12">
              We apply this meticulously to our operations. No false promises. No marketing fluff. We tell you the truth about the seasons, the sightings, and the experience. We'd rather manage your expectations and then exceed them.
            </p>
            <div className="gold-divider mx-auto" />
          </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
}

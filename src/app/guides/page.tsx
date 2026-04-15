"use client";

import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Users, BookOpen, Smile, Compass } from "lucide-react";

const guides = [
  {
    name: "Dr. Richard L.",
    role: "Lead Storyteller",
    specialty: "Animal Behavior & Evolution",
    desc: "He doesn't just point to a lion; he tells the story of the last ten generations of that pride. A true master of the Feynman Method.",
    char: "Laughter. Depth. Precision."
  },
  {
    name: "Sarah M.",
    role: "Ecosystem Navigator",
    specialty: "Botany & Micro-ecology",
    desc: "She'll show you why the smallest leaf in the Savannah is as important as the biggest elephant. You'll never look at a blade of grass the same way.",
    char: "Curiosity. Wonder. Clarity."
  },
  {
    name: "Isaac O.",
    role: "Cultural Connector",
    specialty: "History & Traditions",
    desc: "A storyteller by birth, Isaac connects the ancient traditions of the land with the modern challenges of conservation.",
    char: "Presence. Heritage. Soul."
  }
];

export default function GuidesPage() {
  return (
    <Layout>
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-warm-white bg-gradient-to-b from-warm-white to-background">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="gold-divider mb-8" />
              <h1 className="font-heading text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Meet the Storyteller Guides
              </h1>
              <p className="font-body text-xl text-muted-foreground leading-relaxed italic max-w-2xl mx-auto">
                "You can know the name of a bird in all the languages of the world... but let's look at the bird and see what it's doing—that's what counts."
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding py-20 lg:py-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {guides.map((guide, i) => (
            <ScrollReveal key={guide.name} delay={i * 0.15}>
              <div className="p-10 bg-warm-white border border-accent/10 hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Users className="w-16 h-16" />
                </div>
                <div className="gold-divider-left mb-6 w-8 group-hover:w-12 transition-all duration-500" />
                <h3 className="font-heading text-2xl font-semibold mb-1 text-foreground">{guide.name}</h3>
                <p className="font-body text-xs text-accent uppercase tracking-widest font-medium mb-4">{guide.role}</p>
                <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed mb-6">
                  <p><strong>Specialty:</strong> {guide.specialty}</p>
                  <p>{guide.desc}</p>
                </div>
                <p className="quote-text text-sm italic text-foreground opacity-60">
                  "{guide.char}"
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section-padding bg-charcoal text-cream py-20 lg:py-32 text-center">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold mb-8">Not Just Drivers. Mentors.</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Compass, title: "Adventure", text: "They go where the curious go, not just where the roads are." },
                { icon: BookOpen, title: "Storytelling", text: "Trained in the Feynman Method of clear, joyful explanation." },
                { icon: Smile, title: "Connection", text: "By the end of day one, they're family. By day three, they're friends." }
              ].map((pill, i) => (
                <div key={pill.title} className="space-y-4">
                  <pill.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold">{pill.title}</h3>
                  <p className="font-body text-xs opacity-70 leading-relaxed">{pill.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="gold-divider mx-auto" />
        </ScrollReveal>
      </section>
    </Layout>
  );
}

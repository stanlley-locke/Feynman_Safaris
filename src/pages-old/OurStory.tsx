import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Smile, Heart, TreePine } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import heroImage from "@/assets/campfire-night.jpg";
import feynman1 from "@/assets/richard_feynman_1.jpeg";
import feynman2 from "@/assets/richard_feynman_2.jpeg";

const principles = [
  { icon: BookOpen, title: "Deep Understanding", text: "We don't just teach facts. We teach connections. Why the acacia grows thorns at giraffe height. Why the lion rests 20 hours a day. Why the wildebeest migration follows the rains." },
  { icon: Smile, title: "Joyful Discovery", text: "Learning should feel like play. Our guides are storytellers, not lecturers. You'll laugh as much as you learn." },
  { icon: Heart, title: "Meticulous Care", text: "Every detail considered. Every moment anticipated. We obsess so you don't have to. You'll feel it from the first inquiry to the final farewell." },
  { icon: TreePine, title: "Genuine Connection", text: "To the land. To the wildlife. To the people. To yourself. You'll leave different than you arrived." },
];

const OurStory = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Safari campfire under the stars" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-foreground/30" />
        </div>
        <div className="relative z-10 section-padding pb-16 max-w-3xl">
          <div className="gold-divider-left mb-6" />
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-cream mb-4">Why Feynman?</h1>
          <p className="font-body text-cream/80 leading-relaxed">
            The story behind the name, the philosophy, and the people.
          </p>
        </div>
      </section>

      {/* The Story */}
      <section className="section-padding py-20 lg:py-28">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="gold-divider mb-8" />
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-center text-foreground mb-10">
              Curiosity Is Our Compass
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="space-y-12 font-body text-muted-foreground leading-relaxed">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <p>
                    Richard Feynman was a Nobel Prize-winning physicist who could have spent his life in an ivory tower. Instead, he spent it playing the bongo drums, exploring safe-cracking, and wondering why the first leaf on a maple tree turns yellow.
                  </p>
                  <p>
                    He believed that understanding something deeply didn't make it less beautiful—it made it <em>more</em> beautiful.
                  </p>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-2 bg-accent/20 rounded-none blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img 
                    src={feynman1} 
                    alt="Richard Feynman in his adventurous element" 
                    className="relative rounded-none shadow-xl hover:scale-[1.02] transition-transform duration-500 w-full h-auto" 
                  />
                </div>
              </div>

              <blockquote className="border-l-2 border-accent pl-6 py-2 my-8 max-w-3xl mx-auto">
                <p className="quote-text text-lg">
                  "I have a friend who's an artist and sometimes he'll hand me a painting and I'll say, 'That's a beautiful flower.' And he says, 'You scientists take things apart, you make it boring.' But he doesn't see that the flower is more beautiful to me because I understand the cells, the chemistry, the light interacting with the petals. There's a deeper beauty."
                </p>
              </blockquote>

              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="relative group order-2 md:order-1">
                  <div className="absolute -inset-2 bg-accent/20 rounded-none blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img 
                    src={feynman2} 
                    alt="The physicist's contagious curiosity" 
                    className="relative rounded-none shadow-xl hover:scale-[1.02] transition-transform duration-500 w-full h-auto" 
                  />
                </div>
                <div className="space-y-6 order-1 md:order-2">
                  <p>
                    At Feynman Safaris, we believe the same is true of Africa. Anyone can show you a lion. But we want you to <em>understand</em> the ecosystem that supports it. Anyone can drive you to a lodge. But we want you to feel the story of the land.
                  </p>
                  <p>
                    We built this company for travelers who feel the same way. For the ones who ask "why?" and "how?" and "what if?"
                  </p>
                  <p className="font-medium text-foreground">
                    We obsess over your experience so you can obsess over the wonder around you.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-warm-white section-padding py-20 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="gold-divider mb-6" />
            <h2 className="font-heading text-3xl font-semibold text-foreground">The Feynman Principles</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-10">
            {principles.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <div className="flex gap-5">
                  <p.icon className="w-10 h-10 text-accent flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{p.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="gold-divider mb-8" />
            <h2 className="font-heading text-3xl font-semibold text-foreground mb-8">Meet the Founder</h2>
            <div className="w-32 h-32 rounded-none bg-secondary mx-auto mb-8 flex items-center justify-center">
              <span className="font-heading text-3xl text-accent/40">F</span>
            </div>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed text-left">
              <p>
                I started this company because I believe safaris can be more than they are. I spent years learning from the ground up—driving, guiding, listening, watching.
              </p>
              <p>
                I've been to the Mara more times than I can count, and every time I go, I learn something new. That's the feeling I want to share.
              </p>
              <p>
                When you travel with Feynman, you're not just a client. You're a fellow curious traveler. And yes—if you ask, I might just come along.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Sustainability */}
      <section className="bg-warm-white section-padding py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="gold-divider mb-8" />
            <h2 className="font-heading text-3xl font-semibold text-foreground mb-6">
              Giving Back to the Land That Gives Us Everything
            </h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed text-left">
              <p><strong className="text-foreground">Conservation:</strong> A portion of every booking supports anti-poaching efforts in the Mara.</p>
              <p><strong className="text-foreground">Community:</strong> We partner with local schools and women's cooperatives.</p>
              <p><strong className="text-foreground">Responsible Tourism:</strong> We follow strict guidelines to minimize our impact.</p>
            </div>
            <Link to="/contact" className="feynman-link mt-8 inline-flex items-center gap-2 font-body text-sm font-medium">
              Learn More About Our Impact <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote */}
      <section className="section-padding py-16 text-center">
        <p className="quote-text text-lg max-w-2xl mx-auto">
          "The same equations have the most beautiful solutions."
        </p>
      </section>
    </Layout>
  );
};

export default OurStory;

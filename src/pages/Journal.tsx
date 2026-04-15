import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const posts = [
  { title: "Why the Mara Deserves Four Days, Not Two", excerpt: "Most tours rush through. Here's why slowing down changes everything.", category: "Travel Tips", date: "Feb 2026" },
  { title: "The Secret Language of Acacia Trees", excerpt: "They communicate. They defend themselves. They're smarter than you think.", category: "Wildlife", date: "Jan 2026" },
  { title: "What I Learned Following Elephants for a Week", excerpt: "Patience, family, and the wisdom of the herd.", category: "Guest Stories", date: "Dec 2025" },
  { title: "Choosing Between Budget and Luxury Safari", excerpt: "Both are extraordinary. Here's how to decide.", category: "Travel Tips", date: "Nov 2025" },
  { title: "The Migration: A Timing Guide", excerpt: "When to go, where to be, and what to expect.", category: "Wildlife", date: "Oct 2025" },
  { title: "Why We Named Ourselves After a Physicist", excerpt: "The story behind Feynman Safaris.", category: "Culture", date: "Sep 2025" },
];

const Journal = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <div className="gold-divider mb-6" />
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Stories to Fuel Your Curiosity</h1>
          <p className="font-body text-muted-foreground">Notes from the field, dispatches from the wild.</p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="section-padding pb-20 lg:pb-28">
        <div className="max-w-6xl mx-auto">
          {/* Featured */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {posts.slice(0, 3).map((post) => (
              <article key={post.title} className="group cursor-pointer">
                <div className="h-[220px] bg-secondary mb-5 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-accent/10 to-terracotta/10 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                    <span className="font-heading text-5xl text-accent/20">✦</span>
                  </div>
                </div>
                <span className="font-body text-xs text-accent font-medium tracking-wider uppercase">{post.category}</span>
                <h3 className="font-heading text-xl font-semibold text-foreground mt-2 mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                <span className="font-body text-xs text-muted-foreground">{post.date}</span>
              </article>
            ))}
          </div>

          {/* All Posts */}
          <div className="border-t border-border pt-12">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-8">All Stories</h2>
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.title} className="group cursor-pointer flex gap-6 items-start pb-8 border-b border-border/50">
                  <div className="flex-1">
                    <span className="font-body text-xs text-accent font-medium tracking-wider uppercase">{post.category}</span>
                    <h3 className="font-heading text-lg font-semibold text-foreground mt-1 mb-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">{post.excerpt}</p>
                  </div>
                  <span className="font-body text-xs text-muted-foreground whitespace-nowrap mt-6">{post.date}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section-padding py-16 text-center bg-warm-white">
        <p className="quote-text text-lg max-w-2xl mx-auto">
          "I learned very early the difference between knowing the name of something and knowing something."
        </p>
      </section>
    </Layout>
  );
};

export default Journal;

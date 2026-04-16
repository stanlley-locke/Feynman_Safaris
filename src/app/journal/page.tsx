"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Calendar, User, ArrowRight, Loader2, Tag } from "lucide-react";
import bespokeImage from "@/assets/bespoke-safari.jpg";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  status: string;
  image: string;
  publishedAt: string | null;
  createdAt: string;
}

export default function JournalPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        // Only show published posts on the public site
        if (Array.isArray(data)) {
          setPosts(data.filter(post => post.status === "published"));
        }
      } catch (err) {
        console.error("Failed to fetch dispatches:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Layout>
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="/assets/journal-hero.jpg" 
            alt="The Field Journal" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <ScrollReveal>
            <div className="gold-divider mx-auto mb-8 w-24 h-px bg-gold" />
            <h1 className="font-heading text-5xl lg:text-8xl font-bold text-cream uppercase tracking-tighter leading-none mb-6">
              The Field <br className="md:hidden" /> Journal
            </h1>
            <p className="font-body text-white max-w-2xl mx-auto text-lg lowercase tracking-wide italic">
              Stories from the field. Insights on wildlife, conservation, culture, and the soul of Kenya.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog List */}
      <section className="section-padding py-20 lg:py-32 bg-background border-t border-gold/5">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="h-10 w-10 text-gold animate-spin" />
              <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">Reading Dispatches...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
               <div className="gold-divider mx-auto mb-6 opacity-30" />
               <p className="font-body text-neutral-500 italic max-w-md">The journal is currently silent. Our rangers are out in the field capturing new stories. Please check back soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.1}>
                  <Link href={`/journal/${post.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-neutral-900 border border-neutral-800">
                      {post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gold/20 italic text-xs uppercase tracking-widest font-bold">
                          No Visual Documented
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-gold text-black text-[10px] uppercase font-bold tracking-widest px-3 py-1 italic">
                        {post.category}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-gold text-[10px] uppercase font-bold tracking-widest mb-3">
                      <div className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</div>
                      <div className="flex items-center gap-1.5"><User size={12} /> {post.author}</div>
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-4 group-hover:text-gold transition-colors underline-offset-8 group-hover:underline">{post.title}</h2>
                    <p className="font-body text-muted-foreground text-sm line-clamp-3 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 font-body text-[10px] uppercase font-bold tracking-[0.2em] group-hover:gap-4 transition-all">
                      Read Dispatch <ArrowRight size={14} className="text-gold" />
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

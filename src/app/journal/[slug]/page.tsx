"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Calendar, User, ArrowLeft, Loader2, Tag, Share2, Compass } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog?slug=${params.slug}`);
        const data = await res.json();
        
        if (data && !data.error) {
          // If the API returns an array, find the exact match
          if (Array.isArray(data)) {
            const found = data.find(p => p.slug === params.slug);
            setPost(found || null);
          } else {
            setPost(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch dispatch:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchPost();
    }
  }, [params.slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-background">
          <Loader2 className="h-10 w-10 text-gold animate-spin" />
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">Decoding Dispatch...</p>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-background">
          <div className="gold-divider mx-auto mb-8 w-24 h-px bg-gold" />
          <h1 className="font-heading text-4xl font-bold text-cream uppercase mb-4">Dispatch Lost</h1>
          <p className="font-body text-muted-foreground max-w-md mb-8 lowercase italic">
            This story seems to have drifted into the savanna mist. Our trackers are searching.
          </p>
          <Link href="/journal">
            <Button variant="outline" className="rounded-none border-gold text-gold hover:bg-gold hover:text-charcoal uppercase tracking-widest text-[10px] font-bold h-12 px-8">
              Return to Journal
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
          <img 
            src={post.image || "https://images.unsplash.com/photo-1516428990200-e14e8c516b74?q=80&w=2670"} 
            alt={post.title} 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 pb-16 lg:pb-24">
          <ScrollReveal>
             <Link href="/journal" className="inline-flex items-center gap-2 text-gold/70 hover:text-gold text-[10px] uppercase font-bold tracking-widest mb-8 transition-colors">
                <ArrowLeft size={14} /> Back to Field Journal
             </Link>
             <div className="flex items-center gap-4 text-gold text-[10px] uppercase font-bold tracking-[0.2em] mb-6">
                <span className="bg-gold text-black px-3 py-1 italic">{post.category}</span>
                <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
             </div>
             <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-cream uppercase tracking-tighter leading-[0.95]">
                {post.title}
             </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding py-20 lg:py-32 bg-background relative border-t border-gold/5">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12 py-6 border-b border-gold/10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-none bg-neutral-900 border border-gold/20 flex items-center justify-center text-gold font-heading text-xl font-bold">
                    {post.author[0]}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gold mb-0.5">Dispatched By</p>
                    <p className="font-heading text-white">{post.author}</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={handleShare} className="text-neutral-500 hover:text-gold">
                    <Share2 size={18} />
                  </Button>
               </div>
            </div>

            <div className="prose prose-invert prose-gold max-w-none font-body text-neutral-300 leading-relaxed text-lg first-letter:text-5xl first-letter:font-heading first-letter:text-gold first-letter:mr-3 first-letter:float-left">
              {post.content.split('\n').map((para, i) => (
                <p key={i} className="mb-6">{para}</p>
              ))}
            </div>

            <div className="mt-20 pt-10 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div>
                  <h4 className="font-heading text-xl font-bold text-white mb-2 uppercase">End of Dispatch</h4>
                  <p className="font-body text-sm text-neutral-500 italic lowercase tracking-wider">Witnessed in the wild, recorded for the soul.</p>
               </div>
               <div className="flex gap-4">
                  <Link href="/journal">
                    <Button variant="outline" className="rounded-none border-neutral-800 text-neutral-400 hover:text-gold hover:border-gold text-[10px] uppercase font-bold tracking-widest h-11 px-8 transition-all">
                      More Stories
                    </Button>
                  </Link>
                  <Link href="/safaris">
                    <Button className="rounded-none bg-gold text-charcoal hover:bg-gold-light text-[10px] uppercase font-bold tracking-widest h-11 px-8 transition-all">
                      Experience Africa
                    </Button>
                  </Link>
               </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  Compass, 
  Share2, 
  MapPin, 
  Loader2, 
  Hotel, 
  Star, 
  CheckCircle2,
  X,
  Send,
  Globe
} from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { toast } from "sonner";

const destinationCoordinates: Record<string, { lat: number; lng: number; display: string }> = {
  "maasai-mara": { lat: -1.2921, lng: 36.8219, display: "Lat: 1.2921° S, Long: 36.8219° E" },
  "amboseli": { lat: -2.6437, lng: 37.2531, display: "Lat: 2.6437° S, Long: 37.2531° E" },
  "samburu": { lat: 0.5374, lng: 37.2634, display: "Lat: 0.5374° N, Long: 37.2634° E" },
  "tsavo": { lat: -3.0, lng: 38.5, display: "Lat: 3.0° S, Long: 38.5° E" },
  "diani-beach": { lat: -4.3, lng: 39.6, display: "Lat: 4.3° S, Long: 39.6° E" },
  "serengeti": { lat: -2.3333, lng: 34.8333, display: "Lat: 2.3333° S, Long: 34.8333° E" },
};

export default function DestinationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [destination, setDestination] = useState<any>(null);
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [sendingInquiry, setSendingInquiry] = useState(false);

  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    travelDate: "",
    itineraryFocus: "",
    message: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/destinations/${slug}`);
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const found = await res.json();
        
        setDestination(found);

        // Fetch associated accommodations
        if (found.accommodationIds && Array.isArray(found.accommodationIds) && found.accommodationIds.length > 0) {
          const accRes = await fetch("/api/accommodations");
          const accData = await accRes.json();
          const filtered = accData.filter((a: any) => found.accommodationIds.includes(a.id));
          setAccommodations(filtered);
        }
      } catch (err) {
        console.error("Failed to load details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingInquiry(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inquiryForm.name,
          email: inquiryForm.email,
          content: [
            `Destination inquiry for ${destination?.name}`,
            inquiryForm.travelDate ? `Preferred travel date: ${inquiryForm.travelDate}` : "",
            inquiryForm.itineraryFocus ? `Itinerary focus: ${inquiryForm.itineraryFocus}` : "",
            "",
            inquiryForm.message,
          ]
            .filter(Boolean)
            .join("\n"),
          subject: `Inquiry: ${destination?.name}`,
        })
      });
      if (res.ok) {
        toast.success("Message dispatched. Our trackers will be in touch.");
        setInquiryOpen(false);
        setInquiryForm({ name: "", email: "", travelDate: "", itineraryFocus: "", message: "" });
      }
    } catch (err) {
      toast.error("Failed to deliver message.");
    } finally {
      setSendingInquiry(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Discover ${destination?.name} with Feynman Safaris`,
          text: destination?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Discovery link copied to clipboard");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="h-screen flex flex-col items-center justify-center space-y-6 bg-background">
          <Loader2 className="h-12 w-12 text-gold animate-spin" />
          <p className="font-heading text-[10px] uppercase tracking-[0.5em] text-gold animate-pulse">Establishing Connection...</p>
        </div>
      </Layout>
    );
  }

  if (!destination) {
    return (
      <Layout>
        <div className="h-screen flex flex-col items-center justify-center space-y-8 bg-background px-6 text-center">
          <div className="gold-divider mx-auto w-24 h-px bg-gold mb-4" />
          <h1 className="font-heading text-4xl lg:text-6xl font-bold uppercase tracking-tighter text-white">Nature is elusive.</h1>
          <p className="font-body text-neutral-500 max-w-md lowercase italic text-lg">This destination could not be found in our records. It may have drifted into the savanna mist.</p>
          <Link href="/destinations">
            <Button variant="outline" className="rounded-none border-gold text-gold hover:bg-gold hover:text-charcoal uppercase tracking-[0.3em] text-[10px] h-14 px-10 transition-all font-bold">
              Back to Map
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const itinerary = Array.isArray(destination.itinerary) ? destination.itinerary : [];
  const highlights = Array.isArray(destination.highlights) ? destination.highlights : [];

  const coords = destinationCoordinates[slug] || { lat: 0, lng: 0, display: "Coordinates not available" };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[75vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={destination.image || "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2671&auto=format&fit=crop"} 
            alt={destination.name} 
            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
        </div>
        <div className="relative z-20 section-padding pb-16 lg:pb-24 w-full max-w-7xl mx-auto">
          <ScrollReveal>
            <Link href="/destinations" className="text-gold/60 hover:text-gold text-[10px] font-bold inline-flex items-center gap-3 mb-10 transition-colors uppercase tracking-[0.4em] drop-shadow-lg" style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
              <ArrowLeft className="h-4 w-4" /> Back to Explorations
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-[10px] font-black uppercase tracking-[0.5em] italic drop-shadow-lg" style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>Private Dispatch</span>
            </div>
            <h1 className="font-heading text-6xl lg:text-9xl font-bold text-cream mb-8 uppercase tracking-tighter leading-[0.85] drop-shadow-2xl" style={{ textShadow: '0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)' }}>{destination.name}</h1>
            <div className="flex flex-wrap gap-8 text-cream/90 font-body text-xs font-bold uppercase tracking-[0.3em] drop-shadow-lg" style={{ textShadow: '0 0 10px rgba(0,0,0,0.7)' }}>
               <span className="flex items-center gap-3 border-r border-gold/20 pr-8"><MapPin className="h-4 w-4 text-gold" /> {destination.bestTime || "Year Round"}</span>
               <span className="flex items-center gap-3 border-r border-gold/20 pr-8"><Calendar className="h-4 w-4 text-gold" /> {itinerary.length > 0 ? `${itinerary.length} Days` : "Custom"}</span>
               <span className="flex items-center gap-3"><Compass className="h-4 w-4 text-gold" /> Signature Route</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding py-24 lg:py-40 bg-background relative border-t border-gold/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 lg:gap-32">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-32">
            {/* Overview */}
            <ScrollReveal>
               <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-gold">
                 <div className="flex items-center gap-4 mb-10">
                    <span className="text-gold font-heading text-lg font-bold">01</span>
                    <h2 className="font-heading text-xs uppercase tracking-[0.4em] font-bold text-black">The Essence</h2>
                 </div>
                 <h3 className="font-heading text-5xl font-bold mb-12 uppercase tracking-tight text-black">Overview</h3>
                 <div className="prose prose-gold max-w-none">
                   <p className="font-body text-neutral-700 leading-relaxed text-2xl lowercase tracking-wider first-letter:uppercase first-letter:text-6xl first-letter:font-heading first-letter:text-gold first-letter:mr-4 first-letter:float-left">
                    {destination.description}
                   </p>
                 </div>
               </div>
            </ScrollReveal>

            {/* Itinerary */}
            {itinerary.length > 0 && (
              <ScrollReveal>
                 <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-gold">
                   <div className="flex items-center gap-4 mb-10">
                      <span className="text-gold font-heading text-lg font-bold">02</span>
                      <h2 className="font-heading text-xs uppercase tracking-[0.4em] font-bold text-black">The Sequence</h2>
                   </div>
                   <h3 className="font-heading text-5xl font-bold mb-16 uppercase tracking-tight text-black">Itinerary</h3>
                   <div className="space-y-0">
                     {itinerary.map((item: any, idx: number) => (
                       <div key={idx} className="flex gap-12 border-l border-neutral-300 pl-16 pb-20 last:pb-0 relative group">
                         <div className="absolute -left-[18px] top-0 w-9 h-9 bg-gold border border-gold text-white rounded-none flex items-center justify-center font-bold text-xs ring-8 ring-white transition-all group-hover:bg-gold-light">
                           {idx + 1}
                         </div>
                         <div className="space-y-6">
                            <h4 className="font-heading text-3xl font-bold uppercase tracking-tight text-neutral-900 group-hover:text-gold transition-colors">{item.day || `Day ${idx + 1}`}: {item.title}</h4>
                            <p className="font-body text-neutral-600 leading-relaxed text-lg lowercase tracking-wide italic">
                              {item.content || item.description || "The day begins with the sound of the wild, followed by a bespoke exploration tailored to the seasonal movements of the great herds."}
                            </p>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
              </ScrollReveal>
            )}

            {/* Map Overview */}
            <ScrollReveal>
               <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-gold">
                 <div className="flex items-center gap-4 mb-10">
                    <span className="text-gold font-heading text-lg font-bold">03</span>
                    <h2 className="font-heading text-xs uppercase tracking-[0.4em] font-bold text-black">The Coordinates</h2>
                 </div>
                 <h3 className="font-heading text-5xl font-bold mb-12 uppercase tracking-tight text-black">Map Overview</h3>
                 <div className="relative aspect-video bg-neutral-100 border border-neutral-300 overflow-hidden flex items-center justify-center group">
                    <iframe 
                      src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=10&output=embed`}
                      className="absolute inset-0 w-full h-full border-0" 
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${destination.name} Map`}
                    />
                    <div className="relative z-10 text-center space-y-4 bg-white/90 p-6 rounded-lg backdrop-blur-sm">
                       <div className="w-16 h-16 border border-gold rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                          <MapPin className="text-gold h-8 w-8" />
                       </div>
                       <p className="text-black text-[10px] uppercase font-bold tracking-[0.5em]">{destination.name} Coordinates</p>
                       <p className="text-neutral-600 font-mono text-xs">{coords.display}</p>
                    </div>
                 </div>
               </div>
            </ScrollReveal>

            {/* Stays */}
            {accommodations.length > 0 && (
              <ScrollReveal>
                 <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-gold">
                   <div className="flex items-center gap-4 mb-10">
                      <span className="text-gold font-heading text-lg font-bold">04</span>
                      <h2 className="font-heading text-xs uppercase tracking-[0.4em] font-bold text-black">The Havens</h2>
                   </div>
                   <h3 className="font-heading text-5xl font-bold mb-16 uppercase tracking-tight text-black">Featured Stays</h3>
                   <div className="grid md:grid-cols-2 gap-12">
                     {accommodations.map((acc: any) => (
                       <div key={acc.id} className="group bg-white border border-neutral-200 p-1 relative hover:border-gold/50 transition-all duration-700 overflow-hidden shadow-md">
                          <div className="aspect-[16/10] overflow-hidden relative">
                             <img src={acc.image || "https://images.unsplash.com/photo-1493246507139-91e8bef99c17?auto=format&fit=crop&q=80&w=1740"} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={acc.name} />
                             <div className="absolute top-6 left-6 z-20">
                                <Badge className="bg-gold text-charcoal rounded-none text-[9px] uppercase font-black tracking-[0.3em] px-4 h-7 border-none">{acc.category || "Luxury"}</Badge>
                             </div>
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                                <Link href={`/accommodations`} className="text-white text-[10px] font-bold uppercase tracking-[0.5em] border border-white/40 px-6 py-3 hover:bg-white hover:text-black transition-all">View Sanctuary</Link>
                             </div>
                          </div>
                          <div className="p-8">
                             <div className="flex justify-between items-center mb-4">
                               <h4 className="font-heading text-2xl font-bold uppercase tracking-tight text-black">{acc.name}</h4>
                               <div className="flex items-center text-gold">
                                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-3 w-3 ${i < (acc.rating || 5) ? 'fill-gold' : 'text-neutral-400'}`} />)}
                               </div>
                             </div>
                             <p className="text-[10px] text-neutral-600 uppercase font-bold tracking-[0.2em] mb-0 flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-gold/60" /> {acc.location}
                             </p>
                          </div>
                       </div>
                     ))}
                   </div>
                 </div>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
             <div className="sticky top-40 bg-neutral-950 border border-gold/10 p-12 space-y-12 shadow-2xl relative overflow-hidden group/sidebar">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/sidebar:opacity-20 transition-opacity">
                   <Compass size={120} className="text-gold" />
                </div>
                
                <div className="text-center pb-12 border-b border-gold/10 relative z-10">
                   <p className="text-[10px] uppercase tracking-[0.5em] text-neutral-600 mb-6 font-bold">Legacy Designation</p>
                   <p className="font-heading text-5xl font-black text-white tracking-tighter uppercase mb-2">Private</p>
                   <p className="text-[10px] text-gold font-bold uppercase tracking-[0.5em]">Bespoke Inquiry</p>
                </div>
                
                <div className="space-y-8 relative z-10">
                   <h3 className="font-heading text-sm font-bold text-center uppercase tracking-[0.3em] text-cream">Begin Your Journey</h3>
                   <p className="font-body text-xs text-center text-neutral-500 leading-relaxed italic lowercase tracking-wider">
                     Personalized safaris designed with scientific precision and delivered with human warmth.
                   </p>
                   
                   <Dialog open={inquiryOpen} onOpenChange={setInquiryOpen}>
                     <DialogTrigger asChild>
                       <Button className="w-full bg-cream text-charcoal hover:bg-gold hover:text-charcoal rounded-none py-8 font-heading font-black tracking-[0.3em] uppercase transition-all duration-700 shadow-xl relative group">
                         <span className="relative z-10">Start Planning</span>
                         <div className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                       </Button>
                     </DialogTrigger>
                     <DialogContent className="bg-neutral-900 border-neutral-800 text-neutral-100 rounded-none sm:max-w-[500px]">
                       <DialogHeader>
                         <DialogTitle className="font-heading text-2xl font-bold text-gold uppercase tracking-[0.2em]">Inquire Dispatch</DialogTitle>
                         <DialogDescription className="text-neutral-500 font-body text-[10px] uppercase font-bold tracking-widest text-left mt-2">
                           Initiate your bespoke exploration of {destination.name}.
                         </DialogDescription>
                       </DialogHeader>
                        <form onSubmit={handleInquiry} className="space-y-6 pt-6">
                         <div className="space-y-2">
                            <Label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Full Name</Label>
                            <Input 
                              required 
                              value={inquiryForm.name}
                              onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                              className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 h-12" 
                            />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Satellite Email</Label>
                            <Input 
                              type="email" 
                              required 
                              value={inquiryForm.email}
                              onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                              className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 h-12" 
                            />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Preferred Travel Date</Label>
                            <Input
                              type="date"
                              value={inquiryForm.travelDate}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, travelDate: e.target.value })}
                              className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 h-12"
                            />
                         </div>
                         {itinerary.length > 0 && (
                           <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Itinerary Focus</Label>
                             <select
                               value={inquiryForm.itineraryFocus}
                               onChange={(e) => setInquiryForm({ ...inquiryForm, itineraryFocus: e.target.value })}
                               className="w-full bg-neutral-950 border border-neutral-800 rounded-none focus:border-gold/50 h-12 px-3 text-sm"
                             >
                               <option value="">Select preferred day or focus</option>
                               {itinerary.map((item: any, idx: number) => (
                                 <option key={idx} value={`${item.day || `Day ${idx + 1}`}: ${item.title || "Safari Plan"}`}>
                                   {item.day || `Day ${idx + 1}`}: {item.title || "Safari Plan"}
                                 </option>
                               ))}
                             </select>
                           </div>
                         )}
                         <div className="space-y-2">
                            <Label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Expedition Objectives</Label>
                            <Textarea 
                              required 
                              value={inquiryForm.message}
                              onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
                              placeholder="Tell us about your dream safari..."
                              className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 min-h-[120px]" 
                            />
                         </div>
                         <Button type="submit" disabled={sendingInquiry} className="w-full bg-gold text-charcoal hover:bg-gold-light rounded-none h-14 font-bold uppercase tracking-widest">
                           {sendingInquiry ? <Loader2 className="animate-spin h-5 w-5" /> : <Send className="h-5 w-5 mr-2" />}
                           Send Dispatch
                         </Button>
                       </form>
                     </DialogContent>
                   </Dialog>
                </div>

                <div className="space-y-5 pt-12 border-t border-gold/10 relative z-10">
                   {highlights.length > 0 ? (
                     highlights.map((h: any, i: number) => (
                       <div key={i} className="flex items-center gap-4 text-[9px] uppercase font-bold text-neutral-400 tracking-[0.2em] group/h">
                          <CheckCircle2 className="h-4 w-4 text-gold group-hover/h:scale-110 transition-transform" /> {h}
                       </div>
                     ))
                   ) : (
                     ["Bespoke Itinerary", "Private Transport", "Luxury Stays", "Expert Tracker"].map((h, i) => (
                       <div key={i} className="flex items-center gap-4 text-[9px] uppercase font-bold text-neutral-400 tracking-[0.2em]">
                          <CheckCircle2 className="h-4 w-4 text-gold/40" /> {h}
                       </div>
                     ))
                   )}
                </div>

                <div className="pt-12 flex items-center justify-around relative z-10">
                   <button onClick={handleShare} className="flex flex-col items-center gap-4 group/btn">
                      <div className="h-12 w-12 rounded-full border border-neutral-800 flex items-center justify-center group-hover/btn:border-gold group-hover/btn:bg-gold/5 transition-all">
                        <Share2 className="h-5 w-5 text-neutral-500 group-hover:text-gold transition-colors" />
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-600 font-bold group-hover:text-gold transition-colors">Share Dispatch</span>
                   </button>
                   <button onClick={() => setInquiryOpen(true)} className="flex flex-col items-center gap-4 group/btn">
                      <div className="h-12 w-12 rounded-full border border-neutral-800 flex items-center justify-center group-hover/btn:border-gold group-hover/btn:bg-gold/5 transition-all">
                        <Compass className="h-5 w-5 text-neutral-500 group-hover:text-gold transition-colors" />
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-600 font-bold group-hover:text-gold transition-colors">Coordinates</span>
                   </button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Bottom Dispatch */}
      <section className="section-padding py-32 lg:py-48 text-center border-t border-gold/5 bg-neutral-950">
        <ScrollReveal>
           <p className="quote-text text-2xl italic text-neutral-600 max-w-3xl mx-auto mb-16 leading-relaxed">
             "The first principle is that you must not fool yourself—and you are the easiest person to fool." — RPF
           </p>
           <div className="inline-block p-1 bg-gold/10 hover:bg-gold/20 transition-colors">
              <Link href="/journal" className="block px-12 py-5 border border-gold/40 text-[10px] font-bold uppercase tracking-[0.5em] text-gold hover:text-white transition-colors">Read Field Journal</Link>
           </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
}

"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Map, 
  Search, 
  Filter, 
  MoreVertical, 
  Star, 
  MapPin, 
  Trash2, 
  Loader2, 
  ImageIcon, 
  ChevronRight,
  Globe,
  Truck,
  Hotel,
  Edit,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [transports, setTransports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    bestTime: "",
    status: "active",
    accommodationIds: [] as string[],
    transportIds: [] as string[],
    highlights: "", // Serialized as JSON for API but comma-separated for UI
    itinerary: ""   // Serialized as JSON for API but new-line separated for UI
  });

  const fetchData = async () => {
    try {
      const [destRes, accRes, transRes] = await Promise.all([
        fetch("/api/destinations"),
        fetch("/api/accommodations"),
        fetch("/api/transport")
      ]);
      
      const [destData, accData, transData] = await Promise.all([
        destRes.json(),
        accRes.json(),
        transRes.json()
      ]);
      
      setDestinations(destData);
      setAccommodations(accData);
      setTransports(transData);
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ 
      name: "", slug: "", description: "", image: "", 
      bestTime: "", status: "active", 
      accommodationIds: [], transportIds: [],
      highlights: "", itinerary: ""
    });
    setOpen(true);
  };

  const handleOpenEdit = (dest: any) => {
    setEditingId(dest.id);
    setFormData({
      name: dest.name,
      slug: dest.slug,
      description: dest.description,
      image: dest.image,
      bestTime: dest.bestTime,
      status: dest.status,
      accommodationIds: dest.accommodationIds || [],
      transportIds: dest.transportIds || [],
      highlights: (dest.highlights || []).join(", "),
      itinerary: (dest.itinerary || [])
        .map((step: any) => `${step.day || ""}|${step.title || ""}|${step.description || step.content || ""}`)
        .join("\n")
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Process highlights and itinerary
      const highlightsArray = formData.highlights.split(",").map(h => h.trim()).filter(Boolean);
      const itineraryArray = formData.itinerary.split("\n").filter(Boolean).map((line, idx) => {
        const parts = line.split("|").map((part) => part.trim());
        return {
          day: parts[0] || `Day ${idx + 1}`,
          title: parts[1] || `Safari Plan ${idx + 1}`,
          description: parts[2] || "Details coming soon..."
        };
      });

      const payload = {
        ...formData,
        highlights: highlightsArray,
        itinerary: itineraryArray,
        id: editingId
      };

      const res = await fetch("/api/destinations", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingId ? "Destination updated" : "Destination created");
        setOpen(false);
        fetchData();
      } else {
        toast.error("Process failed");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will remove this location from the map.")) return;
    try {
      const res = await fetch(`/api/destinations?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Destination decommissioned");
        fetchData();
      }
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const toggleSelection = (id: string, type: "accommodation" | "transport") => {
    const field = type === "accommodation" ? "accommodationIds" : "transportIds";
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(id) 
        ? prev[field].filter(i => i !== id) 
        : [...prev[field], id]
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-100 uppercase tracking-widest">Destinations</h2>
          <p className="text-neutral-400 font-body text-sm lowercase tracking-wider">Plan and publish the world's most exclusive safari experiences.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <Button 
            onClick={handleOpenAdd}
            className="bg-gold text-charcoal hover:bg-gold-light rounded-none font-body font-bold uppercase tracking-widest text-xs px-6 transition-all active:scale-95"
          >
            <Plus className="h-4 w-4 mr-2" /> New Destination
          </Button>
          <DialogContent className="bg-neutral-900 border-neutral-800 text-neutral-100 sm:max-w-3xl rounded-none custom-scrollbar overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl font-bold text-gold uppercase tracking-widest">
                {editingId ? "Modify Destination" : "Create Destination"}
              </DialogTitle>
              <DialogDescription className="text-neutral-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">
                Configure explorer hubs with seasonal details and partner networks.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 font-body pb-6 h-full">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest">Destination Name</Label>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Maasai Mara National Reserve" 
                    className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 h-11" required 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest">URL Slug</Label>
                  <Input 
                    value={formData.slug} 
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    placeholder="maasai-mara" 
                    className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 h-11" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest">Narrative Description</Label>
                <Textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Summarize the wonder of this place..." 
                  className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 min-h-[80px]" required 
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest">Peak Season (Best Time)</Label>
                  <Input 
                    value={formData.bestTime} 
                    onChange={(e) => setFormData({...formData, bestTime: e.target.value})}
                    placeholder="e.g. July to September" 
                    className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 h-11" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest">Aesthetic Hero Image URL</Label>
                  <Input 
                    value={formData.image} 
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="Paste link here..." 
                    className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 h-11" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest">Highlights (Comma Separated)</Label>
                  <Input 
                    value={formData.highlights} 
                    onChange={(e) => setFormData({...formData, highlights: e.target.value})}
                    placeholder="Big Five, River Crossings, Balloon Safari..." 
                    className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 h-11" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest">Itinerary (Day|Title|Description per line)</Label>
                  <Textarea 
                    value={formData.itinerary} 
                    onChange={(e) => setFormData({...formData, itinerary: e.target.value})}
                    placeholder="Day 1|Arrival and Sundowner|Pickup, transfer, and evening game drive" 
                    className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 min-h-[100px]" 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest">Associate Accommodations</Label>
                <div className="flex flex-wrap gap-2">
                   {accommodations.map(acc => (
                     <Badge 
                      key={acc.id}
                      onClick={() => toggleSelection(acc.id, "accommodation")}
                      className={`cursor-pointer hover:scale-105 transition-all text-[9px] uppercase tracking-tighter px-3 h-6 rounded-none font-bold ${
                        formData.accommodationIds.includes(acc.id) 
                          ? "bg-gold text-charcoal" 
                          : "bg-neutral-800 text-neutral-400 border-neutral-700"
                      }`}
                     >
                       {acc.name}
                     </Badge>
                   ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest">Transport Fleet Availability</Label>
                <div className="flex flex-wrap gap-2">
                   {transports.map(tr => (
                     <Badge 
                      key={tr.id}
                      onClick={() => toggleSelection(tr.id, "transport")}
                      className={`cursor-pointer hover:scale-105 transition-all text-[9px] uppercase tracking-tighter px-3 h-6 rounded-none font-bold ${
                        formData.transportIds.includes(tr.id) 
                          ? "bg-blue-500 text-white" 
                          : "bg-neutral-800 text-neutral-400 border-neutral-700"
                      }`}
                     >
                       {tr.name}
                     </Badge>
                   ))}
                </div>
              </div>

              <DialogFooter className="pt-6">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gold text-charcoal hover:bg-gold-light rounded-none font-bold uppercase tracking-widest h-12"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Map className="h-4 w-4 mr-2" />}
                  {editingId ? "Update Dispatch" : "Publish Destination"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid Filter Panels */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-neutral-900/50 p-4 border border-neutral-800 mt-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <Input 
            placeholder="Search our catalog of wonders..." 
            className="pl-10 bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 h-10 text-xs lowercase tracking-wider"
          />
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="h-8 w-8 text-gold animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.length === 0 ? (
            <div className="md:col-span-3 h-64 border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center space-y-4 bg-neutral-900/20">
               <Map size={48} className="text-neutral-700" />
               <p className="text-neutral-500 font-body text-sm lowercase tracking-wider text-center">Your world map is currently empty.<br/>Add a destination to start planning.</p>
            </div>
          ) : (
            destinations.map((dest) => (
              <div key={dest.id} className="group flex flex-col bg-neutral-900 border border-neutral-800 hover:border-gold/30 transition-all duration-500 relative overflow-hidden">
                <div className="h-56 bg-neutral-950 relative overflow-hidden">
                   {dest.image ? (
                     <img src={dest.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={dest.name} />
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <Map size={120} />
                     </div>
                   )}
                   <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
                   <div className="absolute bottom-4 left-4">
                      <h4 className="font-heading text-lg font-bold text-white uppercase tracking-tight">{dest.name}</h4>
                      <p className="text-[9px] text-gold font-bold uppercase tracking-widest">{dest.bestTime || "Year Round"}</p>
                   </div>
                   <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        onClick={() => handleOpenEdit(dest)}
                        className="h-8 w-8 rounded-none bg-black/60 backdrop-blur-md border border-white/10 text-white hover:text-gold"
                      >
                         <Edit size={14} />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        onClick={() => handleDelete(dest.id)}
                        className="h-8 w-8 rounded-none bg-red-950/60 backdrop-blur-md border border-red-500/20"
                      >
                         <Trash2 size={14} />
                      </Button>
                   </div>
                </div>
                
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                   <p className="font-body text-sm text-neutral-400 line-clamp-2 leading-relaxed lowercase tracking-wider">
                     {dest.description}
                   </p>
                   
                   <div className="flex gap-4 pt-4 border-t border-neutral-800 mt-4 items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-neutral-500">
                           <Hotel className="h-3 w-3" /> {(dest.accommodationIds as any[])?.length || 0}
                         </div>
                         <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-neutral-500">
                           <Truck className="h-3 w-3" /> {(dest.transportIds as any[])?.length || 0}
                         </div>
                      </div>
                      
                      <Link href={`/destinations/${dest.slug}`} target="_blank">
                        <Button variant="outline" className="h-8 rounded-none border-neutral-800 text-[9px] px-3 font-bold uppercase tracking-widest hover:border-gold hover:text-gold transition-all group/btn">
                           Private View <ExternalLink className="h-3 w-3 ml-1.5 opacity-40 group-hover/btn:opacity-100" />
                        </Button>
                      </Link>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

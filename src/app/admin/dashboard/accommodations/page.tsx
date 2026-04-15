"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Hotel, 
  Star, 
  MapPin, 
  Trash2, 
  Loader2, 
  Globe, 
  ImageIcon,
  Search,
  Filter
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
import { toast } from "sonner";

export default function AdminAccommodationsPage() {
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "",
    rating: "5",
    image: "",
    website: "",
    description: ""
  });

  const fetchAccommodations = async () => {
    try {
      const res = await fetch("/api/accommodations");
      const data = await res.json();
      setAccommodations(data);
    } catch (err) {
      toast.error("Failed to load accommodations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const res = await fetch("/api/accommodations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Accommodation added successfully");
        setFormData({ name: "", location: "", category: "", rating: "5", image: "", website: "", description: "" });
        fetchAccommodations();
      } else {
        toast.error("Failed to add accommodation");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      const res = await fetch(`/api/accommodations?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Deleted successfully");
        fetchAccommodations();
      }
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleEdit = async (acc: any) => {
    const nextName = prompt("Accommodation name", acc.name || "") ?? acc.name;
    const nextLocation = prompt("Location", acc.location || "") ?? acc.location;
    const nextWebsite = prompt("Website", acc.website || "") ?? acc.website;
    if (!nextName || !nextLocation) return;

    try {
      const res = await fetch("/api/accommodations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: acc.id,
          name: nextName,
          location: nextLocation,
          website: nextWebsite,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Accommodation updated");
      fetchAccommodations();
    } catch {
      toast.error("Failed to update accommodation");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-100">Accommodations</h2>
          <p className="text-neutral-400 font-body text-sm lowercase tracking-wider">Manage lodging partners and luxury camps.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gold text-charcoal hover:bg-gold-light rounded-none font-body font-bold uppercase tracking-widest text-xs px-6">
              <Plus className="h-4 w-4 mr-2" /> Add Accommodation
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border-neutral-800 text-neutral-100 sm:max-w-xl rounded-none">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl font-bold text-gold">Register Accommodation</DialogTitle>
              <DialogDescription className="text-neutral-500 text-xs">
                Add a new partner stay, lodge, or tented camp to the network.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-6 pt-4 font-body">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">Hotel Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Emayian Luxury Camp" 
                    className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 h-11" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">Location</Label>
                  <Input 
                    id="location" 
                    value={formData.location} 
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g. Maasai Mara" 
                    className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 h-11" 
                    required 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">Category</Label>
                  <Input 
                    id="category" 
                    value={formData.category} 
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="e.g. Luxury Camp" 
                    className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 h-11" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating" className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">Rating (1-5)</Label>
                  <Input 
                    id="rating" 
                    type="number" 
                    min="1" 
                    max="5"
                    value={formData.rating} 
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                    className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 h-11" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image" className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">Image URL</Label>
                <div className="flex gap-2">
                  <Input 
                    id="image" 
                    value={formData.image} 
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="Paste direct image link here..." 
                    className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 h-11" 
                  />
                  <div className="h-11 w-11 bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0">
                     {formData.image ? <img src={formData.image} className="h-full w-full object-cover" /> : <ImageIcon className="h-4 w-4 text-neutral-600" />}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">Website URL</Label>
                <Input 
                  id="website" 
                  value={formData.website} 
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  placeholder="https://..." 
                  className="bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 h-11" 
                />
              </div>
              <DialogFooter className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isAdding}
                  className="w-full bg-gold text-charcoal hover:bg-gold-light rounded-none font-bold uppercase tracking-widest h-12"
                >
                  {isAdding ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                  Save Accommodation
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-neutral-900/50 p-4 border border-neutral-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <Input 
            placeholder="Search accommodations..." 
            className="pl-10 bg-neutral-950 border-neutral-800 rounded-none focus:border-gold/50 transition-colors h-10"
          />
        </div>
        <Button variant="outline" className="rounded-none border-neutral-800 h-10 px-6 font-body text-xs uppercase tracking-widest flex items-center gap-2">
          <Filter className="h-3 w-3 text-gold" /> Filter
        </Button>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="h-12 w-12 text-gold animate-spin" />
          <p className="text-neutral-500 font-body text-[10px] uppercase tracking-widest">Synchronizing Database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {accommodations.length === 0 ? (
            <div className="lg:col-span-3 h-64 border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center space-y-4 bg-neutral-900/20">
               <Hotel size={48} className="text-neutral-700" />
               <p className="text-neutral-500 font-body text-sm lowercase tracking-wider">No accommodations found in database.</p>
               <Button variant="link" className="text-gold uppercase text-[10px] tracking-widest" onClick={() => document.querySelector('button[aria-haspopup="dialog"]')?.dispatchEvent(new MouseEvent('click'))}>Add Your First Partner</Button>
            </div>
          ) : (
            accommodations.map((acc) => (
              <div key={acc.id} className="group bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-gold/30 transition-all duration-300">
                <div className="h-48 bg-neutral-950 relative">
                  {acc.image ? (
                    <img src={acc.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={acc.name} />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-800">
                      <Hotel size={64} strokeWidth={0.5} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-none text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                      Partner Active
                    </Badge>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] text-gold uppercase tracking-[0.2em] mb-1 font-bold">{acc.category || "Lodging"}</p>
                      <h4 className="font-heading text-xl font-bold text-neutral-100 uppercase tracking-tight">{acc.name}</h4>
                    </div>
                    <div className="flex items-center gap-0.5 text-gold">
                      {Array.from({ length: acc.rating || 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-gold" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-neutral-400 font-body text-sm lowercase tracking-wider">
                    <MapPin className="h-3.5 w-3.5 text-neutral-500" /> {acc.location}
                  </div>

                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       {acc.website && (
                         <a href={acc.website} target="_blank" className="h-9 w-9 bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-gold transition-colors">
                            <Globe className="h-4 w-4" />
                         </a>
                       )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(acc.id)}
                        className="h-9 w-9 text-neutral-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(acc)} className="h-9 border-neutral-800 text-[10px] px-4 rounded-none hover:border-gold hover:text-gold uppercase tracking-widest font-bold">
                        Edit
                      </Button>
                    </div>
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

"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Truck, 
  Search, 
  Filter, 
  Trash2, 
  Loader2, 
  ImageIcon, 
  MapPin, 
  Wrench,
  ShieldCheck,
  Zap
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

export default function AdminTransportPage() {
  const [transports, setTransports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "Safari Land Cruiser",
    plate: "",
    location: "",
    status: "available",
    image: "",
    description: ""
  });

  const fetchTransports = async () => {
    try {
      const res = await fetch("/api/transport");
      const data = await res.json();
      setTransports(data);
    } catch (err) {
      toast.error("Failed to load transport fleet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  const resetForm = () => {
    setFormData({ name: "", type: "Safari Land Cruiser", plate: "", location: "", status: "available", image: "", description: "" });
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    resetForm();
    setOpen(true);
  };

  const handleOpenEdit = (transport: any) => {
    setEditingId(transport.id);
    setFormData({
      name: transport.name || "",
      type: transport.type || "Safari Land Cruiser",
      plate: transport.plate || "",
      location: transport.location || "",
      status: transport.status || "available",
      image: transport.image || "",
      description: transport.description || ""
    });
    setOpen(true);
  };

  const handleImageUpload = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const res = await fetch("/api/transport", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: editingId }),
      });
      if (res.ok) {
        toast.success(editingId ? "Vehicle updated" : "Vehicle added to fleet");
        resetForm();
        setEditingId(null);
        setOpen(false);
        fetchTransports();
      } else {
        toast.error(editingId ? "Failed to update transport" : "Failed to add transport");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/transport?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Deleted");
        fetchTransports();
      }
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const updateTransportStatus = async (transport: any) => {
    const nextStatus = transport.status === "available" ? "maintenance" : "available";
    try {
      const res = await fetch("/api/transport", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: transport.id, status: nextStatus }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(`Status updated to ${nextStatus}`);
      fetchTransports();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const editTransport = (transport: any) => {
    handleOpenEdit(transport);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-100">Transport Fleet</h2>
          <p className="text-neutral-400 font-body text-sm lowercase tracking-wider">Manage safari vehicles and partner transfers.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenAdd} className="bg-gold text-charcoal hover:bg-gold-light rounded-none font-body font-bold uppercase tracking-widest text-xs px-6">
              <Plus className="h-4 w-4 mr-2" /> Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border-neutral-800 text-neutral-100 sm:max-w-xl rounded-none">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl font-bold text-gold">{editingId ? "Update Vehicle" : "Enlist Fleet Vehicle"}</DialogTitle>
              <DialogDescription className="text-neutral-500 text-xs">
                Add a new land rover, cruiser, or aircraft to the transport logistics.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 pt-4 font-body">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">Vehicle Name</Label>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. FEY-01 Cruiser" 
                    className="bg-neutral-950 border-neutral-800 rounded-none h-11" required 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">Plate Number</Label>
                  <Input 
                    value={formData.plate} 
                    onChange={(e) => setFormData({...formData, plate: e.target.value})}
                    placeholder="e.g. KCD 123X" 
                    className="bg-neutral-950 border-neutral-800 rounded-none h-11" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">Type</Label>
                  <select 
                    value={formData.type} 
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-neutral-950 border-neutral-800 rounded-none h-11 px-4 text-sm focus:border-gold outline-none"
                  >
                    <option value="Safari Land Cruiser">Safari Land Cruiser</option>
                    <option value="Executive Minivan">Executive Minivan</option>
                    <option value="Charter Flight">Charter Flight</option>
                    <option value="Luxury Transfer">Luxury Transfer</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">Current Hub</Label>
                  <Input 
                    value={formData.location} 
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g. Nairobi Central" 
                    className="bg-neutral-950 border-neutral-800 rounded-none h-11" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">Vehicle Photo URL</Label>
                  <Input 
                    value={formData.image} 
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="Paste direct link..." 
                    className="bg-neutral-950 border-neutral-800 rounded-none h-11" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">Upload from device</Label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files?.[0] ?? null)}
                    className="w-full text-xs text-neutral-300 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border file:border-neutral-700 file:bg-neutral-950 file:text-neutral-100"
                  />
                  <div className="h-24 overflow-hidden rounded-sm border border-neutral-800 bg-neutral-950">
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-neutral-500 text-[10px] uppercase tracking-widest">No photo selected</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">Vehicle Notes</Label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Add a short fleet note..."
                  className="w-full min-h-[80px] resize-none rounded-none border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 focus:border-gold outline-none"
                />
              </div>

              <DialogFooter className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isAdding}
                  className="w-full bg-gold text-charcoal hover:bg-gold-light rounded-none font-bold uppercase tracking-widest h-12"
                >
                  {isAdding ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Truck className="h-4 w-4 mr-2" />}
                  {editingId ? "Update Vehicle" : "Register Vehicle"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="h-8 w-8 text-gold animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-body">
          {transports.length === 0 ? (
            <div className="lg:col-span-3 h-64 border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center space-y-4 bg-neutral-900/10">
               <Truck size={48} className="text-neutral-700" />
               <p className="text-neutral-500 font-body text-xs uppercase tracking-widest">Your fleet is empty.</p>
            </div>
          ) : (
            transports.map((tr) => (
              <div key={tr.id} className="group bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-gold/30 transition-all duration-300">
                <div className="h-44 bg-neutral-950 relative">
                   {tr.image ? (
                     <img src={tr.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={tr.name} />
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <Zap size={64} />
                     </div>
                   )}
                   <div className="absolute top-4 right-4">
                      <Badge className={cn(
                        "rounded-none text-[8px] uppercase font-bold tracking-widest px-3 h-5 border-none",
                        tr.status === "available" ? "bg-emerald-500 text-white" : "bg-neutral-800 text-neutral-500"
                      )}>
                        {tr.status}
                      </Badge>
                   </div>
                </div>
                
                <div className="p-6 space-y-6">
                   <div>
                      <h4 className="font-heading text-xl font-bold text-neutral-100 uppercase tracking-tight mb-1">{tr.name}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-gold uppercase tracking-[0.2em] font-bold">
                         <Zap className="h-3 w-3" /> {tr.type}
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
                      <div className="space-y-1">
                         <p className="text-[10px] text-neutral-600 uppercase font-bold tracking-widest">Plate</p>
                         <p className="text-xs text-neutral-300 font-bold uppercase">{tr.plate || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] text-neutral-600 uppercase font-bold tracking-widest">Location</p>
                         <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-medium">
                            <MapPin className="h-3 w-3 text-neutral-500" /> {tr.location || "Branch Hub"}
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center justify-between gap-4 pt-2">
                       <div className="flex items-center gap-1 text-emerald-400">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span className="text-[10px] uppercase font-bold tracking-widest">Serviced</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(tr.id)}
                            className="h-8 w-8 text-neutral-600 hover:text-red-400"
                          >
                             <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" onClick={() => handleOpenEdit(tr)} className="rounded-none border-neutral-800 h-8 text-[9px] px-3 uppercase tracking-widest font-bold hover:border-gold hover:text-gold">
                            Edit
                          </Button>
                          <Button variant="outline" onClick={() => updateTransportStatus(tr)} className="rounded-none border-neutral-800 h-8 text-[9px] px-3 uppercase tracking-widest font-bold hover:border-gold hover:text-gold">
                            <Wrench className="h-3 w-3 mr-2" /> Log Status
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

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

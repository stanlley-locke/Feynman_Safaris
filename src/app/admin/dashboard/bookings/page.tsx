"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Download,
  Trash2,
  User,
  MapPin,
  RefreshCcw,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  safariType: string;
  travelDate: string;
  status: string;
  amount: string;
  createdAt: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCreateBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      customerName: formData.get("customerName"),
      customerEmail: formData.get("customerEmail"),
      safariType: formData.get("safariType"),
      travelDate: formData.get("travelDate"),
      passengers: formData.get("passengers"),
      amount: formData.get("amount"),
      status: "confirmed"
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        toast({ title: "Success", description: "New booking captured successfully." });
        setIsDialogOpen(false);
        fetchBookings();
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to save booking.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.safariType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadCsv = async () => {
    try {
      const res = await fetch("/api/bookings/export");
      if (!res.ok) throw new Error("Failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "bookings.csv";
      link.click();
      window.URL.revokeObjectURL(url);
      toast({ title: "Exported", description: "Bookings CSV downloaded." });
    } catch {
      toast({ title: "Error", description: "Failed to export bookings.", variant: "destructive" });
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Failed");
      setBookings((prev) => prev.map((booking) => (booking.id === id ? { ...booking, status } : booking)));
    } catch {
      toast({ title: "Error", description: "Failed to update booking status.", variant: "destructive" });
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Delete this booking?")) return;
    try {
      const res = await fetch(`/api/bookings?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
      toast({ title: "Deleted", description: "Booking removed." });
    } catch {
      toast({ title: "Error", description: "Failed to delete booking.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight">Bookings</h2>
          <p className="text-neutral-400 font-body">Manage safari reservations and customer travel plans.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={downloadCsv}
            className="border-neutral-800 rounded-none text-neutral-400 hover:text-gold bg-neutral-900/50"
          >
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
          <Button 
            variant="outline" 
            onClick={fetchBookings} 
            className="border-neutral-800 rounded-none text-neutral-400 hover:text-gold bg-neutral-900/50"
          >
            <RefreshCcw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} /> Refresh
          </Button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gold text-black hover:bg-gold-light rounded-none font-body font-medium">
                <Plus className="h-4 w-4 mr-2" /> New Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-950 border-neutral-800 text-neutral-100 rounded-none sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl text-gold">Create New Booking</DialogTitle>
                <DialogDescription className="text-neutral-500 font-body">
                  Enter traveler details to secure a new safari reservation.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateBooking} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName" className="text-xs uppercase tracking-widest text-neutral-400">Customer Name</Label>
                    <Input id="customerName" name="customerName" required className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" placeholder="e.g. John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerEmail" className="text-xs uppercase tracking-widest text-neutral-400">Email Address</Label>
                    <Input id="customerEmail" name="customerEmail" type="email" required className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="safariType" className="text-xs uppercase tracking-widest text-neutral-400">Safari Destination/Type</Label>
                  <Input id="safariType" name="safariType" required className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" placeholder="e.g. Maasai Mara Migration" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="travelDate" className="text-xs uppercase tracking-widest text-neutral-400">Travel Date</Label>
                    <Input id="travelDate" name="travelDate" type="date" required className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50 text-neutral-400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passengers" className="text-xs uppercase tracking-widest text-neutral-400">Passengers</Label>
                    <Input id="passengers" name="passengers" type="number" min="1" required className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" placeholder="2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-xs uppercase tracking-widest text-neutral-400">Amount ($)</Label>
                  <Input id="amount" name="amount" required className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" placeholder="$2,500" />
                </div>
                <DialogFooter className="pt-6">
                  <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-none text-neutral-500 hover:text-white">Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-gold text-black hover:bg-gold-light rounded-none px-8 font-bold uppercase tracking-widest text-xs">
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                    Confirm Booking
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Bookings", value: bookings.length.toString(), icon: Calendar, color: "text-blue-400" },
          { label: "Pending Requests", value: bookings.filter(b => b.status === "pending").length.toString(), icon: Clock, color: "text-amber-400" },
          { label: "Confirmed Monthly", value: bookings.filter(b => b.status === "confirmed").length.toString(), icon: CheckCircle2, color: "text-emerald-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-neutral-900/50 border border-neutral-800 p-6 flex items-center gap-4">
            <div className={`p-3 bg-neutral-900 border border-neutral-800 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-body uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold font-heading mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-neutral-900/30 p-4 border border-neutral-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <Input 
            placeholder="Search booking ID, customer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-neutral-900 border-neutral-800 rounded-none focus:border-gold/50 transition-colors"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="border border-neutral-800 overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <RefreshCcw className="h-10 w-10 animate-spin text-gold/20" />
            <p className="text-neutral-500 animate-pulse">Synchronizing with field reports...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-neutral-500 italic">
            No bookings found matching your search.
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-neutral-900">
              <TableRow className="border-neutral-800 hover:bg-neutral-900/50">
                <TableHead className="text-neutral-400 font-body uppercase tracking-wider text-[10px]">ID</TableHead>
                <TableHead className="text-neutral-400 font-body uppercase tracking-wider text-[10px]">Customer</TableHead>
                <TableHead className="text-neutral-400 font-body uppercase tracking-wider text-[10px]">Safari Type</TableHead>
                <TableHead className="text-neutral-400 font-body uppercase tracking-wider text-[10px]">Travel Date</TableHead>
                <TableHead className="text-neutral-400 font-body uppercase tracking-wider text-[10px]">Status</TableHead>
                <TableHead className="text-neutral-400 font-body uppercase tracking-wider text-[10px] text-right">Amount</TableHead>
                <TableHead className="w-[180px] text-right text-neutral-400 font-body uppercase tracking-wider text-[10px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id} className="border-neutral-800 hover:bg-neutral-800/30 transition-colors group cursor-pointer text-xs">
                  <TableCell className="font-medium text-neutral-300 font-body">{booking.id.slice(0, 8)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-none bg-neutral-800 flex items-center justify-center border border-neutral-700">
                        <User className="h-3 w-3 text-neutral-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-body font-medium">{booking.customerName}</span>
                        <span className="text-[10px] text-neutral-500">{booking.customerEmail}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2 text-neutral-400 font-body">
                        <MapPin className="h-3 w-3 text-gold/60" /> {booking.safariType}
                     </div>
                  </TableCell>
                  <TableCell className="text-neutral-400 font-body">{new Date(booking.travelDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "rounded-none h-6 px-3 border",
                      booking.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                      booking.status === "pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                      "bg-red-500/10 text-red-400 border-red-500/20"
                    )}>{booking.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-heading font-bold text-neutral-200">{booking.amount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateBookingStatus(booking.id, booking.status === "confirmed" ? "pending" : "confirmed")}
                        className="h-8 rounded-none border-neutral-800 text-[9px] uppercase tracking-widest"
                      >
                        {booking.status === "confirmed" ? "Mark Pending" : "Mark Confirmed"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteBooking(booking.id)}
                        className="h-8 w-8 text-neutral-500 hover:text-red-500 rounded-none"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

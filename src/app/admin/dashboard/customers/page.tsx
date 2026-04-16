"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Mail, 
  Trash2, 
  Edit, 
  MoreVertical,
  RefreshCcw,
  Loader2,
  CheckCircle2,
  Download
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

interface Customer {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  role: string;
  createdAt: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/customers");
      const data = await res.json();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      whatsapp: formData.get("whatsapp"),
      role: "customer",
      passwordHash: "customer_default_pass" // Placeholder for now
    };

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        toast({ title: "Success", description: "Customer account established." });
        setIsDialogOpen(false);
        fetchCustomers();
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to add customer.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadCsv = async () => {
    try {
      const res = await fetch("/api/customers/export");
      if (!res.ok) throw new Error("Failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "customers.csv";
      link.click();
      window.URL.revokeObjectURL(url);
      toast({ title: "Exported", description: "Customers CSV downloaded." });
    } catch {
      toast({ title: "Error", description: "Failed to export customers.", variant: "destructive" });
    }
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditDialogOpen(true);
  };

  const handleUpdateCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCustomer) return;
    
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      id: selectedCustomer.id,
      name: formData.get("name"),
      email: formData.get("email"),
      whatsapp: formData.get("whatsapp"),
    };

    try {
      const res = await fetch("/api/customers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setCustomers((prev) =>
        prev.map((item) =>
          item.id === selectedCustomer.id ? { ...item, ...data } : item
        )
      );
      toast({ title: "Updated", description: "Customer updated successfully." });
      setIsEditDialogOpen(false);
      setSelectedCustomer(null);
    } catch {
      toast({ title: "Error", description: "Failed to update customer.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    if (!confirm("Delete this customer?")) return;
    try {
      const res = await fetch(`/api/customers?id=${customerId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setCustomers((prev) => prev.filter((item) => item.id !== customerId));
      toast({ title: "Deleted", description: "Customer removed." });
    } catch {
      toast({ title: "Error", description: "Failed to delete customer.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-neutral-400 font-body">Manage traveler profiles and their engagement history.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={downloadCsv} className="border-neutral-800 rounded-none text-neutral-400 hover:text-gold">
             <Download className="h-4 w-4 mr-2" /> Export CSV
           </Button>
           <Button variant="outline" onClick={fetchCustomers} className="border-neutral-800 rounded-none text-neutral-400 hover:text-gold">
             <RefreshCcw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} /> Refresh
           </Button>
           
           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
             <DialogTrigger asChild>
               <Button className="bg-gold text-black hover:bg-gold-light rounded-none font-body font-medium">
                 <Plus className="h-4 w-4 mr-2" /> Add Customer
               </Button>
             </DialogTrigger>
             <DialogContent className="bg-neutral-950 border-neutral-800 text-neutral-100 rounded-none">
               <DialogHeader>
                 <DialogTitle className="font-heading text-xl text-gold">Register New Traveler</DialogTitle>
                 <DialogDescription className="text-neutral-500 font-body">
                   Create a new customer profile for manual booking management.
                 </DialogDescription>
               </DialogHeader>
               <form onSubmit={handleAddCustomer} className="space-y-4 py-4">
                 <div className="space-y-2">
                   <Label htmlFor="name" className="text-xs uppercase tracking-widest text-neutral-400">Full Name</Label>
                   <Input id="name" name="name" required className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" placeholder="e.g. Alice Johnson" />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="email" className="text-xs uppercase tracking-widest text-neutral-400">Email Address</Label>
                   <Input id="email" name="email" type="email" required className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" placeholder="alice@example.com" />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="whatsapp" className="text-xs uppercase tracking-widest text-neutral-400">WhatsApp (optional)</Label>
                   <Input id="whatsapp" name="whatsapp" className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" placeholder="+254 700 000 000" />
                 </div>
                 <DialogFooter className="pt-6">
                   <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-none text-neutral-500 hover:text-white">Cancel</Button>
                   <Button type="submit" disabled={isSubmitting} className="bg-gold text-black hover:bg-gold-light rounded-none px-8 font-bold uppercase tracking-widest text-xs">
                     {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                     Establish Profile
                   </Button>
                 </DialogFooter>
               </form>
             </DialogContent>
           </Dialog>

           <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
             <DialogContent className="bg-neutral-950 border-neutral-800 text-neutral-100 rounded-none">
               <DialogHeader>
                 <DialogTitle className="font-heading text-xl text-gold">Edit Customer</DialogTitle>
                 <DialogDescription className="text-neutral-500 font-body">
                   Update customer profile information.
                 </DialogDescription>
               </DialogHeader>
               <form onSubmit={handleUpdateCustomer} className="space-y-4 py-4">
                 <div className="space-y-2">
                   <Label htmlFor="edit-name" className="text-xs uppercase tracking-widest text-neutral-400">Full Name</Label>
                   <Input id="edit-name" name="name" required defaultValue={selectedCustomer?.name} className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="edit-email" className="text-xs uppercase tracking-widest text-neutral-400">Email Address</Label>
                   <Input id="edit-email" name="email" type="email" required defaultValue={selectedCustomer?.email} className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="edit-whatsapp" className="text-xs uppercase tracking-widest text-neutral-400">WhatsApp (optional)</Label>
                   <Input id="edit-whatsapp" name="whatsapp" defaultValue={selectedCustomer?.whatsapp} className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" placeholder="+254 700 000 000" />
                 </div>
                 <DialogFooter className="pt-6">
                   <Button type="button" variant="ghost" onClick={() => setIsEditDialogOpen(false)} className="rounded-none text-neutral-500 hover:text-white">Cancel</Button>
                   <Button type="submit" disabled={isSubmitting} className="bg-gold text-black hover:bg-gold-light rounded-none px-8 font-bold uppercase tracking-widest text-xs">
                     {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                     Update Profile
                   </Button>
                 </DialogFooter>
               </form>
             </DialogContent>
           </Dialog>
        </div>
      </div>

      <div className="flex bg-neutral-900 border border-neutral-800 p-4">
         <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input 
              placeholder="Search by name, email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-neutral-900/50 border-neutral-800 rounded-none focus:border-gold/50 transition-colors h-10 w-full"
            />
         </div>
      </div>

      {/* Customers List */}
      <div className="border border-neutral-800 overflow-hidden min-h-[300px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <RefreshCcw className="h-10 w-10 animate-spin text-gold/20" />
            <p className="text-neutral-500 animate-pulse font-body text-xs uppercase tracking-widest">Accessing passenger manifests...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-neutral-500 italic font-body">
            No customers found.
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-neutral-900">
              <TableRow className="border-neutral-800 hover:bg-neutral-900/50">
                <TableHead className="text-neutral-400 font-body uppercase tracking-wider text-[10px]">Customer</TableHead>
                <TableHead className="text-neutral-400 font-body uppercase tracking-wider text-[10px]">Email</TableHead>
                <TableHead className="text-neutral-400 font-body uppercase tracking-wider text-[10px]">WhatsApp</TableHead>
                <TableHead className="text-neutral-400 font-body uppercase tracking-wider text-[10px]">Joined</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="border-neutral-800 hover:bg-neutral-800/30 transition-colors group cursor-pointer text-xs">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 bg-neutral-800 border border-neutral-700 flex items-center justify-center text-gold font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-body font-medium text-neutral-200">{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                       <span className="text-neutral-400 flex items-center gap-1"><Mail className="h-2.5 w-2.5" /> {customer.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-neutral-400 text-xs font-body lowercase tracking-wider">
                      {customer.whatsapp ? customer.whatsapp : "—"}
                    </div>
                  </TableCell>
                  <TableCell className="text-neutral-500 font-body">
                     {new Date(customer.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button variant="ghost" size="icon" onClick={() => handleEditCustomer(customer)} className="h-8 w-8 text-neutral-500 hover:text-gold rounded-none">
                         <Edit className="h-3.5 w-3.5" />
                       </Button>
                       <Button variant="ghost" size="icon" onClick={() => handleDeleteCustomer(customer.id)} className="h-8 w-8 text-neutral-500 hover:text-red-500 rounded-none">
                         <Trash2 className="h-3.5 w-3.5" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-white rounded-none">
                         <MoreVertical className="h-3.5 w-3.5" />
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

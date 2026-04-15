"use client";

import { useState, useEffect } from "react";
import { 
  UserCircle, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Shield, 
  Mail, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  RefreshCcw,
  Calendar,
  Loader2,
  Lock
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

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInviteUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      passwordHash: "temp_access_token" // Placeholder
    };

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        toast({ title: "Invite Sent", description: "System operative added to registry." });
        setIsDialogOpen(false);
        fetchUsers();
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to invite user.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to revoke access for this operative?")) return;
    try {
      await fetch(`/api/users?id=${id}`, { method: "DELETE" });
      setUsers(u => u.filter(item => item.id !== id));
      toast({ title: "Access Revoked", description: "User removed from system registry." });
    } catch (error) {}
  };

  const handleEditUser = async (user: User) => {
    const nextName = prompt("Update name", user.name || "") ?? user.name;
    const nextEmail = prompt("Update email", user.email || "") ?? user.email;
    const nextRole = prompt("Update role (admin/moderator/agent/customer)", user.role || "") ?? user.role;
    if (!nextName || !nextEmail || !nextRole) return;

    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, name: nextName, email: nextEmail, role: nextRole }),
      });
      if (!res.ok) throw new Error("Failed");
      setUsers((prev) =>
        prev.map((item) =>
          item.id === user.id ? { ...item, name: nextName, email: nextEmail, role: nextRole } : item
        )
      );
      toast({ title: "Updated", description: "User details updated." });
    } catch {
      toast({ title: "Error", description: "Failed to update user.", variant: "destructive" });
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight">System Users</h2>
          <p className="text-neutral-400 font-body">Manage administrative access and permissions.</p>
        </div>
        <div className="flex gap-2">
           <Button 
            variant="outline" 
            onClick={fetchUsers} 
            className="border-neutral-800 rounded-none text-neutral-400 hover:text-gold bg-neutral-900/50"
          >
             <RefreshCcw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} /> Refresh
           </Button>
           
           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
             <DialogTrigger asChild>
               <Button className="bg-gold text-black hover:bg-gold-light rounded-none font-body font-medium">
                 <Plus className="h-4 w-4 mr-2" /> Invite User
               </Button>
             </DialogTrigger>
             <DialogContent className="bg-neutral-950 border-neutral-800 text-neutral-100 rounded-none sm:max-w-[450px]">
               <DialogHeader>
                 <DialogTitle className="font-heading text-2xl font-bold text-gold uppercase tracking-[0.2em]">Invite Explorer</DialogTitle>
                 <DialogDescription className="text-neutral-500 text-[10px] uppercase font-bold tracking-widest text-left">
                   Grant dashboard access to new team members or partners.
                 </DialogDescription>
               </DialogHeader>
               <form onSubmit={handleInviteUser} className="space-y-4 py-4">
                 <div className="space-y-2">
                   <Label htmlFor="name" className="text-xs uppercase tracking-widest text-neutral-400">Operative Name</Label>
                   <Input id="name" name="name" required className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" placeholder="e.g. Sarah Jenkins" />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="email" className="text-xs uppercase tracking-widest text-neutral-400">System Email</Label>
                   <Input id="email" name="email" type="email" required className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" placeholder="sarah@safari-admin.com" />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="role" className="text-xs uppercase tracking-widest text-neutral-400">Clearance Level</Label>
                   <select id="role" name="role" className="w-full bg-neutral-900 border border-neutral-800 rounded-none text-sm p-2 focus:border-gold/50 outline-none">
                      <option value="admin">Administrator (Full Access)</option>
                      <option value="moderator">Moderator (Inquiries & Blog)</option>
                      <option value="agent">Booking Agent (Reservation Only)</option>
                   </select>
                 </div>
                 <DialogFooter className="pt-6">
                   <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-none text-neutral-500 hover:text-white">Cancel</Button>
                   <Button type="submit" disabled={isSubmitting} className="bg-gold text-black hover:bg-gold-light rounded-none px-8 font-bold uppercase tracking-widest text-xs">
                     {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Shield className="h-4 w-4 mr-2" />}
                     Grant Access
                   </Button>
                 </DialogFooter>
               </form>
             </DialogContent>
           </Dialog>
        </div>
      </div>

      {/* Search */}
      <div className="flex bg-neutral-900 border border-neutral-800 p-4">
         <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-neutral-900/50 border-neutral-800 rounded-none focus:border-gold/50 transition-colors h-10 w-full"
            />
         </div>
      </div>

      {/* Users Table */}
      <div className="border border-neutral-800 overflow-hidden min-h-[300px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <RefreshCcw className="h-10 w-10 animate-spin text-gold/20" />
            <p className="text-neutral-500 animate-pulse font-body text-xs uppercase tracking-widest">Verifying security clearances...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-neutral-500 italic font-body">
            No users found.
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-neutral-900">
              <TableRow className="border-neutral-800 hover:bg-neutral-900/50">
                <TableHead className="text-neutral-400 font-body uppercase tracking-wider text-[10px]">User</TableHead>
                <TableHead className="text-neutral-400 font-body uppercase tracking-wider text-[10px]">Role</TableHead>
                <TableHead className="text-neutral-400 font-body uppercase tracking-wider text-[10px]">Joined</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-neutral-800 hover:bg-neutral-800/30 transition-colors group cursor-pointer text-xs">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 bg-neutral-800 border border-neutral-700 flex items-center justify-center text-gold font-bold">
                        {user.name?.charAt(0) || user.email.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-body font-medium text-neutral-200">{user.name || "Unnamed User"}</span>
                        <span className="text-[10px] text-neutral-500 flex items-center gap-1"><Mail className="h-2.5 w-2.5" /> {user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <Shield className={cn("h-3 w-3", user.role === "admin" ? "text-gold" : "text-neutral-500")} />
                       <Badge variant="outline" className={cn(
                          "rounded-none text-[9px] uppercase tracking-widest px-2 py-0.5 border",
                          user.role === "admin" ? "border-gold/30 text-gold bg-gold/5" : "border-neutral-800 text-neutral-500"
                       )}>
                          {user.role}
                       </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2 text-neutral-500 font-body">
                        <Calendar className="h-3 w-3" /> {new Date(user.createdAt).toLocaleDateString()}
                     </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)} className="h-8 w-8 text-neutral-500 hover:text-gold rounded-none">
                         <Edit className="h-3.5 w-3.5" />
                       </Button>
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         onClick={(e) => { e.stopPropagation(); deleteUser(user.id); }}
                         className="h-8 w-8 text-neutral-500 hover:text-red-500 rounded-none"
                       >
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

"use client";

import { useState, useEffect } from "react";
import { 
  Star, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MoreVertical,
  MapPin,
  RefreshCcw,
  MessageSquare,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  destinationName: string;
  status: string;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/reviews?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setReviews(r => r.map(item => item.id === id ? { ...item, status } : item));
    } catch (error) {}
  };

  const filteredReviews = reviews.filter(r => 
    r.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.destinationName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight">Reviews</h2>
          <p className="text-neutral-400 font-body">Monitor and moderate traveler experiences.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={fetchReviews} className="border-neutral-800 rounded-none text-neutral-400 hover:text-gold">
             <RefreshCcw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} /> Refresh
           </Button>
        </div>
      </div>

      {/* Grid Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Total Reviews", value: reviews.length.toString(), icon: MessageSquare, color: "text-blue-400" },
           { label: "Pending Approval", value: reviews.filter(r => r.status === "pending").length.toString(), icon: Clock, color: "text-amber-400" },
           { label: "Average Rating", value: (reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1), icon: Star, color: "text-gold" },
         ].map((stat, i) => (
           <div key={i} className="bg-neutral-900/50 border border-neutral-800 p-6 flex items-center gap-4">
             <div className={`p-3 bg-neutral-900 border border-neutral-800 ${stat.color}`}>
               <stat.icon className="h-6 w-6" />
             </div>
             <div>
               <p className="text-[10px] text-neutral-500 font-body uppercase tracking-[0.2em]">{stat.label}</p>
               <p className="text-2xl font-bold font-heading mt-1">{stat.value}</p>
             </div>
           </div>
         ))}
      </div>

      <div className="flex bg-neutral-900 border border-neutral-800 p-4">
         <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input 
              placeholder="Search reviewer, location or comment..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-neutral-900/50 border-neutral-800 rounded-none focus:border-gold/50 transition-colors h-10 w-full"
            />
         </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4 min-h-[300px]">
         {isLoading ? (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
              <RefreshCcw className="h-10 w-10 animate-spin text-gold/20" />
              <p className="text-neutral-500 animate-pulse font-body text-xs uppercase tracking-widest">Scanning traveler logbooks...</p>
            </div>
         ) : filteredReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-neutral-500 italic font-body">
              No reviews found.
            </div>
         ) : (
           filteredReviews.map((review) => (
             <div key={review.id} className="bg-neutral-900/30 border border-neutral-800 p-6 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                   <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-neutral-800 border border-neutral-700 flex items-center justify-center text-gold font-bold italic">
                               {review.userName.charAt(0)}
                            </div>
                            <div>
                               <h4 className="font-heading font-bold text-neutral-200">{review.userName}</h4>
                               <div className="flex items-center gap-2 text-[10px] text-neutral-500 uppercase tracking-widest font-body">
                                  <MapPin className="h-3 w-3" /> {review.destinationName || "General Experience"}
                               </div>
                            </div>
                         </div>
                         <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                               <Star key={i} className={cn("h-3 w-3", i < review.rating ? "text-gold fill-gold" : "text-neutral-700")} />
                            ))}
                         </div>
                      </div>
                      <p className="text-sm text-neutral-400 font-body leading-relaxed italic">
                         "{review.comment}"
                      </p>
                      <p className="text-[10px] text-neutral-600 uppercase tracking-widest">
                         Submitted on {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                   </div>

                   <div className="lg:w-48 lg:border-l lg:border-neutral-800 lg:pl-6 flex lg:flex-col justify-between lg:justify-center gap-4">
                      <div className="space-y-1">
                         <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Status</p>
                         <Badge className={cn(
                            "rounded-none text-[10px] uppercase tracking-wider px-2 py-0.5 border",
                            review.status === "approved" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                            review.status === "pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                            "bg-red-500/10 text-red-400 border-red-500/20"
                         )}>
                            {review.status}
                         </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                         {review.status === "pending" && (
                            <>
                              <Button 
                                size="icon" 
                                variant="outline" 
                                onClick={() => updateStatus(review.id, "approved")}
                                className="h-8 w-8 border-emerald-900/50 text-emerald-500 bg-emerald-950/20 hover:bg-emerald-500 hover:text-black transition-all rounded-none"
                                title="Approve Review"
                              >
                                 <CheckCircle2 className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="icon" 
                                variant="outline" 
                                onClick={() => updateStatus(review.id, "rejected")}
                                className="h-8 w-8 border-red-900/50 text-red-500 bg-red-950/20 hover:bg-red-500 hover:text-black transition-all rounded-none"
                                title="Reject Review"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                         )}
                         {review.status === "rejected" && (
                            <Button 
                              size="icon" 
                              variant="outline" 
                              onClick={() => updateStatus(review.id, "approved")}
                              className="h-8 w-8 border-emerald-900/50 text-emerald-500 bg-emerald-950/20 hover:bg-emerald-500 hover:text-black transition-all rounded-none"
                              title="Approve Review"
                            >
                               <RotateCcw className="h-4 w-4" />
                            </Button>
                         )}
                         <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                             <Button size="icon" variant="ghost" className="h-8 w-8 text-neutral-500 hover:text-gold rounded-none">
                               <MoreVertical className="h-4 w-4" />
                             </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end" className="bg-neutral-900 border-neutral-800">
                             {review.status !== "approved" && (
                               <DropdownMenuItem 
                                 onClick={() => updateStatus(review.id, "approved")}
                                 className="text-emerald-400 hover:text-emerald-300 hover:bg-neutral-800"
                               >
                                 <CheckCircle2 className="h-4 w-4 mr-2" />
                                 Approve
                               </DropdownMenuItem>
                             )}
                             {review.status !== "rejected" && (
                               <DropdownMenuItem 
                                 onClick={() => updateStatus(review.id, "rejected")}
                                 className="text-red-400 hover:text-red-300 hover:bg-neutral-800"
                               >
                                 <XCircle className="h-4 w-4 mr-2" />
                                 Reject
                               </DropdownMenuItem>
                             )}
                             {review.status !== "pending" && (
                               <DropdownMenuItem 
                                 onClick={() => updateStatus(review.id, "pending")}
                                 className="text-amber-400 hover:text-amber-300 hover:bg-neutral-800"
                               >
                                 <Clock className="h-4 w-4 mr-2" />
                                 Mark as Pending
                               </DropdownMenuItem>
                             )}
                           </DropdownMenuContent>
                         </DropdownMenu>
                      </div>
                   </div>
                </div>
             </div>
           ))
         )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { 
  FileText, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  MoreVertical,
  Calendar,
  User,
  Tag,
  RefreshCcw,
  CheckCircle2,
  Clock,
  Loader2,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

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

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: formData.get("image"),
      status: formData.get("status") || "draft"
    };

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        toast({ title: "Success", description: "Dispatch published to the field journal." });
        setIsDialogOpen(false);
        fetchPosts();
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to save post.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this dispatch?")) return;
    try {
      await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
      setPosts(p => p.filter(item => item.id !== id));
      toast({ title: "Deleted", description: "Post removed from records." });
    } catch (error) {}
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditDialogOpen(true);
  };

  const handleViewPost = (post: BlogPost) => {
    window.open(`/journal/${post.slug}`, '_blank');
  };

  const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingPost) return;
    
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: formData.get("image"),
      status: formData.get("status")
    };

    try {
      const res = await fetch(`/api/blog?id=${editingPost.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        toast({ title: "Success", description: "Field report updated successfully." });
        setIsEditDialogOpen(false);
        setEditingPost(null);
        fetchPosts();
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update post.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPosts = posts.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight">Blog Posts</h2>
          <p className="text-neutral-400 font-body">Manage field reports and safari stories.</p>
        </div>
        <div className="flex gap-2">
           <Button 
            variant="outline" 
            onClick={fetchPosts} 
            className="border-neutral-800 rounded-none text-neutral-400 hover:text-gold bg-neutral-900/50"
          >
             <RefreshCcw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} /> Refresh
           </Button>
           
           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
             <DialogTrigger asChild>
               <Button className="bg-gold text-black hover:bg-gold-light rounded-none font-body font-medium">
                 <Plus className="h-4 w-4 mr-2" /> New Post
               </Button>
             </DialogTrigger>
             <DialogContent className="bg-neutral-950 border-neutral-800 text-neutral-100 rounded-none sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
               <DialogHeader>
                 <DialogTitle className="font-heading text-xl text-gold">Compose Field Report</DialogTitle>
                 <DialogDescription className="text-neutral-500 font-body">
                   Share a new story from the savanna with your audience.
                 </DialogDescription>
               </DialogHeader>
               <form onSubmit={handleCreatePost} className="space-y-4 py-4">
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="title" className="text-xs uppercase tracking-widest text-neutral-400">Post Title</Label>
                     <Input id="title" name="title" required className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" placeholder="The Great Migration 2026" />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="category" className="text-xs uppercase tracking-widest text-neutral-400">Category</Label>
                     <Input id="category" name="category" required className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" placeholder="Wildlife, Culture, etc." />
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="author" className="text-xs uppercase tracking-widest text-neutral-400">Author Name</Label>
                     <Input id="author" name="author" required className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" placeholder="Richard Feynman" />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="status" className="text-xs uppercase tracking-widest text-neutral-400">Visibility</Label>
                     <select id="status" name="status" className="w-full bg-neutral-900 border border-neutral-800 rounded-none text-sm p-2 focus:border-gold/50 outline-none">
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                     </select>
                   </div>
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="image" className="text-xs uppercase tracking-widest text-neutral-400">Cover Image URL</Label>
                   <Input id="image" name="image" className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" placeholder="https://images.unsplash.com/..." />
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="excerpt" className="text-xs uppercase tracking-widest text-neutral-400">Excerpt (Short Summary)</Label>
                   <Textarea id="excerpt" name="excerpt" required className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50 min-h-[80px]" placeholder="Briefly describe the post..." />
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="content" className="text-xs uppercase tracking-widest text-neutral-400">Full Content</Label>
                   <Textarea id="content" name="content" required className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50 min-h-[200px]" placeholder="Write your full story here..." />
                 </div>

                 <DialogFooter className="pt-6">
                   <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-none text-neutral-500 hover:text-white">Cancel</Button>
                   <Button type="submit" disabled={isSubmitting} className="bg-gold text-black hover:bg-gold-light rounded-none px-8 font-bold uppercase tracking-widest text-xs">
                     {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                     Commit Dispatch
                   </Button>
                 </DialogFooter>
               </form>
             </DialogContent>
           </Dialog>

           {/* Edit Dialog */}
           <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
             <DialogContent className="bg-neutral-950 border-neutral-800 text-neutral-100 rounded-none sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
               <DialogHeader>
                 <DialogTitle className="font-heading text-xl text-gold">Edit Field Report</DialogTitle>
                 <DialogDescription className="text-neutral-500 font-body">
                   Update this safari story for your audience.
                 </DialogDescription>
               </DialogHeader>
               {editingPost && (
                 <form onSubmit={handleUpdatePost} className="space-y-4 py-4">
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <Label htmlFor="edit-title" className="text-xs uppercase tracking-widest text-neutral-400">Post Title</Label>
                       <Input 
                         id="edit-title" 
                         name="title" 
                         required 
                         defaultValue={editingPost.title}
                         className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" 
                       />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="edit-category" className="text-xs uppercase tracking-widest text-neutral-400">Category</Label>
                       <Input 
                         id="edit-category" 
                         name="category" 
                         required 
                         defaultValue={editingPost.category}
                         className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" 
                       />
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <Label htmlFor="edit-author" className="text-xs uppercase tracking-widest text-neutral-400">Author Name</Label>
                       <Input 
                         id="edit-author" 
                         name="author" 
                         required 
                         defaultValue={editingPost.author}
                         className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" 
                       />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="edit-status" className="text-xs uppercase tracking-widest text-neutral-400">Visibility</Label>
                       <select 
                         id="edit-status" 
                         name="status" 
                         defaultValue={editingPost.status}
                         className="w-full bg-neutral-900 border border-neutral-800 rounded-none text-sm p-2 focus:border-gold/50 outline-none"
                       >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                       </select>
                     </div>
                   </div>

                   <div className="space-y-2">
                     <Label htmlFor="edit-image" className="text-xs uppercase tracking-widest text-neutral-400">Cover Image URL</Label>
                     <Input 
                       id="edit-image" 
                       name="image" 
                       defaultValue={editingPost.image}
                       className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50" 
                     />
                   </div>

                   <div className="space-y-2">
                     <Label htmlFor="edit-excerpt" className="text-xs uppercase tracking-widest text-neutral-400">Excerpt (Short Summary)</Label>
                     <Textarea 
                       id="edit-excerpt" 
                       name="excerpt" 
                       required 
                       defaultValue={editingPost.excerpt}
                       className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50 min-h-[80px]" 
                     />
                   </div>

                   <div className="space-y-2">
                     <Label htmlFor="edit-content" className="text-xs uppercase tracking-widest text-neutral-400">Full Content</Label>
                     <Textarea 
                       id="edit-content" 
                       name="content" 
                       required 
                       defaultValue={editingPost.content}
                       className="bg-neutral-900 border-neutral-800 rounded-none text-sm focus:border-gold/50 min-h-[200px]" 
                     />
                   </div>

                   <DialogFooter className="pt-6">
                     <Button type="button" variant="ghost" onClick={() => setIsEditDialogOpen(false)} className="rounded-none text-neutral-500 hover:text-white">Cancel</Button>
                     <Button type="submit" disabled={isSubmitting} className="bg-gold text-black hover:bg-gold-light rounded-none px-8 font-bold uppercase tracking-widest text-xs">
                       {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                       Update Dispatch
                     </Button>
                   </DialogFooter>
                 </form>
               )}
             </DialogContent>
           </Dialog>
        </div>
      </div>

      <div className="flex bg-neutral-900 border border-neutral-800 p-4">
         <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input 
              placeholder="Search posts by title, author, or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-neutral-900/50 border-neutral-800 rounded-none focus:border-gold/50 transition-colors h-10 w-full"
            />
         </div>
      </div>

      {/* Posts List */}
      <div className="grid grid-cols-1 gap-4 min-h-[300px]">
         {isLoading ? (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
              <RefreshCcw className="h-10 w-10 animate-spin text-gold/20" />
              <p className="text-neutral-500 animate-pulse font-body text-xs uppercase tracking-widest">Archiving field reports...</p>
            </div>
         ) : filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-neutral-500 italic font-body border border-dashed border-neutral-800">
              No field reports found.
            </div>
         ) : (
           filteredPosts.map((post) => (
             <div key={post.id} className="group bg-neutral-900/30 border border-neutral-800 p-6 hover:bg-neutral-900/50 hover:border-gold/30 transition-all duration-300 relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-6">
                   <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2">
                         <Badge className={cn(
                            "rounded-none text-[9px] uppercase tracking-wider px-2 py-0.5 border",
                            post.status === "published" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-neutral-800 text-neutral-500 border-neutral-700"
                         )}>
                            {post.status}
                         </Badge>
                         <span className="text-neutral-600">/</span>
                         <span className="flex items-center gap-1.5 text-[10px] text-neutral-500 uppercase tracking-widest font-body">
                            <Tag className="h-2.5 w-2.5" /> {post.category}
                         </span>
                      </div>
                      
                      <h3 className="font-heading text-xl font-bold text-neutral-100 group-hover:text-gold transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm text-neutral-400 font-body line-clamp-2 italic">
                        {post.excerpt || "No excerpt provided for this report."}
                      </p>

                      <div className="flex flex-wrap items-center gap-6 pt-2">
                         <div className="flex items-center gap-2 text-[10px] text-neutral-500 uppercase tracking-widest font-body">
                            <User className="h-3 w-3" /> {post.author}
                         </div>
                         <div className="flex items-center gap-2 text-[10px] text-neutral-500 uppercase tracking-widest font-body">
                            <Calendar className="h-3 w-3" /> {new Date(post.createdAt).toLocaleDateString()}
                         </div>
                      </div>
                   </div>

                   <div className="md:w-48 flex items-center md:justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleViewPost(post)}
                        className="h-9 w-9 text-neutral-500 hover:text-blue-400 rounded-none border border-transparent hover:border-neutral-700"
                        title="View Post"
                      >
                         <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEditPost(post)}
                        className="h-9 w-9 text-neutral-500 hover:text-gold rounded-none border border-transparent hover:border-neutral-700"
                        title="Edit Post"
                      >
                         <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                         variant="ghost" 
                         size="icon" 
                         onClick={() => deletePost(post.id)}
                         className="h-9 w-9 text-neutral-500 hover:text-red-500 rounded-none border border-transparent hover:border-neutral-700"
                         title="Delete Post"
                      >
                         <Trash2 className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-neutral-500 hover:text-white rounded-none">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-neutral-900 border-neutral-800">
                          <DropdownMenuItem 
                            onClick={() => handleViewPost(post)}
                            className="text-blue-400 hover:text-blue-300 hover:bg-neutral-800"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleEditPost(post)}
                            className="text-gold hover:text-gold-light hover:bg-neutral-800"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => deletePost(post.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-neutral-800"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                   </div>
                </div>
                {post.status === "published" && <div className="absolute right-0 top-0 w-1 h-full bg-gold/20" />}
             </div>
           ))
         )}
      </div>
    </div>
  );
}

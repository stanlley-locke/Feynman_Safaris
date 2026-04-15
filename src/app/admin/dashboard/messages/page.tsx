"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Trash2, 
  Star, 
  Archive, 
  RefreshCcw,
  Mail,
  MailOpen,
  User,
  Clock,
  MoreVertical,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  content: string;
  isRead: boolean;
  isStarred: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
       console.error("Failed to fetch messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleStar = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/messages?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isStarred: !current }),
      });
      setMessages(m => m.map(item => item.id === id ? { ...item, isStarred: !current } : item));
    } catch (error) {}
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/messages?id=${id}`, {
         method: "PATCH",
         body: JSON.stringify({ isRead: true }),
      });
      setMessages(m => m.map(item => item.id === id ? { ...item, isRead: true } : item));
    } catch (error) {}
  };

  const filteredMessages = messages.filter(m => 
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight">Messages</h2>
          <p className="text-neutral-400 font-body">Inquiries and communications from your visitors.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={fetchMessages} className="border-neutral-800 rounded-none text-neutral-400 hover:text-gold">
             <RefreshCcw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} /> Refresh
           </Button>
        </div>
      </div>

      <div className="flex-1 flex border border-neutral-800 bg-neutral-900/10 overflow-hidden">
        {/* Messages List Area */}
        <div className="w-full md:w-[400px] border-r border-neutral-800 flex flex-col">
           <div className="p-4 border-b border-neutral-800 bg-neutral-950/50">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                 <Input 
                   placeholder="Search inbox..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="pl-9 bg-neutral-950 border-neutral-800 rounded-none h-9 text-xs" 
                 />
              </div>
           </div>

           <div className="flex-1 overflow-y-auto custom-scrollbar">
              {isLoading ? (
                 <div className="p-10 flex flex-col items-center gap-2">
                    <RefreshCcw className="h-6 w-6 animate-spin text-gold/30" />
                 </div>
              ) : filteredMessages.length === 0 ? (
                 <div className="p-10 text-center text-neutral-500 italic text-xs font-body">
                   No messages found.
                 </div>
              ) : (
                filteredMessages.map((msg) => (
                   <div 
                     key={msg.id}
                     onClick={() => { setSelectedMessage(msg); markAsRead(msg.id); }}
                     className={cn(
                       "p-4 border-b border-neutral-800/50 cursor-pointer transition-colors group relative",
                       selectedMessage?.id === msg.id ? "bg-neutral-800/80" : "hover:bg-neutral-900/50",
                       !msg.isRead && "bg-gold/[0.03]"
                     )}
                   >
                      <div className="flex justify-between items-start mb-1">
                         <span className={cn("text-xs font-medium truncate max-w-[180px]", !msg.isRead ? "text-gold" : "text-neutral-300")}>
                           {msg.name}
                         </span>
                         <span className="text-[10px] text-neutral-500 uppercase tracking-tighter">
                           {new Date(msg.createdAt).toLocaleDateString()}
                         </span>
                      </div>
                      <h4 className={cn("text-[11px] truncate mb-1", !msg.isRead ? "font-bold text-white italic" : "text-neutral-400")}>
                        {msg.subject}
                      </h4>
                      <p className="text-[10px] text-neutral-500 line-clamp-1 italic">{msg.content}</p>
                      
                      <div className="absolute right-4 bottom-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Star 
                           onClick={(e) => { e.stopPropagation(); toggleStar(msg.id, msg.isStarred); }}
                           className={cn("h-3 w-3 cursor-pointer", msg.isStarred ? "text-gold fill-gold" : "text-neutral-600")} 
                         />
                      </div>
                      {!msg.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold" />}
                   </div>
                ))
              )}
           </div>
        </div>

        {/* Message Content Area */}
        <div className="hidden md:flex flex-1 flex-col bg-neutral-950/30">
           {selectedMessage ? (
              <div className="flex flex-col h-full">
                 <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-gold">
                          {selectedMessage.name.charAt(0)}
                       </div>
                       <div>
                          <h3 className="font-heading font-bold text-lg">{selectedMessage.name}</h3>
                          <p className="text-xs text-neutral-500 font-body">{selectedMessage.email}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <Button variant="ghost" size="icon" className="h-9 w-9 text-neutral-500 hover:text-gold rounded-none">
                          <Archive className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-9 w-9 text-neutral-500 hover:text-red-500 rounded-none">
                          <Trash2 className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-9 w-9 text-neutral-500 hover:text-white rounded-none">
                          <MoreVertical className="h-4 w-4" />
                       </Button>
                    </div>
                 </div>
                 
                 <div className="flex-1 overflow-y-auto p-8 font-body">
                    <div className="mb-8">
                       <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-bold font-heading italic text-white underline decoration-gold/50 underline-offset-8">
                            {selectedMessage.subject}
                          </h2>
                          <div className="flex items-center gap-2 text-[10px] text-neutral-500 uppercase tracking-widest">
                             <Clock className="h-3 w-3" /> {new Date(selectedMessage.createdAt).toLocaleString()}
                          </div>
                       </div>
                       <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">
                          {selectedMessage.content}
                       </p>
                    </div>

                    <div className="mt-12 p-6 bg-neutral-900/50 border border-neutral-800">
                       <p className="text-xs text-neutral-500 mb-4 uppercase tracking-[0.2em] font-bold">Quick Respond</p>
                       <textarea 
                        className="w-full bg-neutral-950 border border-neutral-800 p-4 text-sm text-neutral-300 focus:outline-none focus:border-gold/50 min-h-[120px] rounded-none mb-4"
                        placeholder="Type your response to field report..."
                       />
                       <div className="flex justify-end">
                          <Button className="bg-gold text-black rounded-none hover:bg-gold-light group">
                             Send Response <Send className="h-3.5 w-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                       </div>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-neutral-600 gap-4 opacity-30">
                 <MailOpen className="h-16 w-16" />
                 <p className="font-body text-sm uppercase tracking-widest italic">Select a dispatch to read</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}

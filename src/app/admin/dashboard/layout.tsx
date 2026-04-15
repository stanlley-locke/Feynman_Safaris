"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Map, 
  CalendarCheck, 
  Users, 
  Hotel, 
  Truck, 
  MessageSquare, 
  Star, 
  FileText, 
  UserCircle,
  Menu,
  X,
  LogOut,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Destinations", href: "/admin/dashboard/destinations", icon: Map },
  { name: "Bookings", href: "/admin/dashboard/bookings", icon: CalendarCheck },
  { name: "Customers", href: "/admin/dashboard/customers", icon: Users },
  { name: "Accommodations", href: "/admin/dashboard/accommodations", icon: Hotel },
  { name: "Transport", href: "/admin/dashboard/transport", icon: Truck },
  { name: "Messages", href: "/admin/dashboard/messages", icon: MessageSquare },
  { name: "Reviews", href: "/admin/dashboard/reviews", icon: Star },
  { name: "Blog Posts", href: "/admin/dashboard/blog", icon: FileText },
  { name: "Users", href: "/admin/dashboard/users", icon: UserCircle },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Basic session check (for demo purposes)
  useEffect(() => {
    const hasSession = document.cookie.includes("admin_session=true");
    if (!hasSession && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  const handleLogout = () => {
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  };

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-100 overflow-hidden font-body">
      {/* Sidebar Mobile Overlay - Now works for any size if we want to force closure, but primarily for mobile */}
      {(!isSidebarOpen) && (
         <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={() => setIsSidebarOpen(true)}
         />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-neutral-900 border-r border-neutral-800 transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 overflow-hidden",
          isSidebarOpen ? "w-64 translate-x-0 shadow-2xl" : "w-16 -translate-x-full lg:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className={cn(
          "flex h-24 items-center border-b border-neutral-800 px-4 transition-all duration-300",
          isSidebarOpen ? "justify-between" : "justify-center"
        )}>
          <Link href="/admin/dashboard" className={cn("flex items-center gap-3", !isSidebarOpen && "hidden")}>
             <img src="/assets/image.png" alt="Feynman" className="h-9 w-9 object-contain flex-shrink-0" />
             <span className="font-heading font-bold tracking-[0.2em] transition-all duration-300 overflow-hidden opacity-100 w-auto text-gold">
                FEYNMAN
             </span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-neutral-400 hover:text-gold transition-colors shrink-0"
          >
            {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 space-y-2 overflow-y-auto py-8 custom-scrollbar px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  "w-full flex items-center justify-start gap-4 rounded-none transition-all duration-200 group relative",
                  isActive ? "bg-neutral-800 text-gold font-bold" : "text-neutral-500 hover:text-neutral-100 hover:bg-neutral-800/50",
                  !isSidebarOpen ? "justify-center px-0 h-12" : "px-4 h-11"
                )}
                onClick={() => router.push(item.href)}
              >
                <Icon className={cn("h-4 w-4 shrink-0 transition-transform group-hover:scale-110", isActive && "text-gold ring-4 ring-gold/10")} />
                <span className={cn(
                  "transition-all duration-300 whitespace-nowrap text-xs uppercase tracking-widest",
                  isSidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
                )}>
                  {item.name}
                </span>
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold" />}
              </Button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-800 space-y-4">
           {/* Expand button that shows ONLY when minimized on desktop */}
           {!isSidebarOpen && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsSidebarOpen(true)}
                className="w-full hidden lg:flex rounded-none border-neutral-800 text-gold hover:bg-neutral-800 h-9"
              >
                 <ChevronRight size={14} className="animate-pulse" />
              </Button>
           )}
           
           <Button 
            variant="ghost" 
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center justify-start gap-3 rounded-none text-neutral-500 hover:text-red-400 hover:bg-red-950/20 transition-all",
              !isSidebarOpen ? "justify-center px-0 h-12" : "px-3 h-10"
            )}
           >
             <LogOut className="h-4 w-4" />
             <span className={cn(
                "transition-all duration-300 text-[10px] uppercase tracking-widest font-bold",
                isSidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
             )}>Logout</span>
           </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Toggle Button for Collapsed State (All Breakpoints) */}
        {!isSidebarOpen && (
           <Button 
            size="icon" 
            variant="outline"
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-6 top-6 z-40 h-10 w-10 border-gold/30 bg-neutral-900/80 backdrop-blur-sm text-gold shadow-2xl hover:scale-105 active:scale-95 transition-all rounded-none"
           >
             <Menu className="h-5 w-5" />
           </Button>
        )}

        {/* Header */}
        <header className="h-20 flex items-center justify-between border-b border-neutral-800 px-8 bg-neutral-900/50 backdrop-blur-md">
          <div className="flex items-center gap-6">
             {/* Small Logo for mobile if sidebar is closed */}
             {!isSidebarOpen && (
                <div className="h-10 w-10 border border-neutral-800 p-1.5 flex items-center justify-center bg-neutral-950 ml-12 lg:ml-0">
                   <img src="/assets/image.png" alt="F" className="h-full w-full object-contain" />
                </div>
             )}
            <h1 className="font-heading text-xl font-bold capitalize tracking-tight">
              {pathname.split("/").pop()?.replace("-", " ") || "Overview"}
            </h1>
            <ChevronRight className="h-4 w-4 text-neutral-700 hidden sm:block" />
            <span className="text-[10px] text-neutral-500 font-body uppercase tracking-[0.2em] hidden sm:block">Control Center</span>
          </div>
          <div className="flex items-center gap-4">
             <Link 
              href="/" 
              target="_blank"
              className="text-[10px] text-neutral-400 hover:text-gold uppercase tracking-widest flex items-center gap-2 transition-colors border border-neutral-800 h-9 px-4"
            >
              Live Site <ExternalLink className="h-3 w-3" />
            </Link>
            <div className="h-9 w-9 rounded-none bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-xs text-gold shadow-inner">
              AD
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
           <div className="max-w-7xl mx-auto space-y-8 pb-12">
              {children}
           </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Map, 
  CalendarCheck, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  RefreshCcw,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data.stats);
      setRecentBookings(data.recentBookings);
    } catch (err) {
      console.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    { name: "Active Safaris", value: stats?.activeSafaris || 0, icon: Map, color: "text-blue-500", trend: "Live destinations" },
    { name: "Pending Bookings", value: stats?.pendingBookings || 0, icon: CalendarCheck, color: "text-amber-500", trend: "Requires attention" },
    { name: "Total Customers", value: stats?.totalCustomers || 0, icon: Users, color: "text-emerald-500", trend: "Registered explorers" },
    { name: "Inquiries", value: stats?.unreadInquiries || 0, icon: TrendingUp, color: "text-indigo-500", trend: "Latest messages" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-neutral-400 font-body">Welcome back to the Feynman Safaris Management Core.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={fetchStats}
          className="rounded-none border-neutral-800 text-neutral-500 hover:text-gold"
        >
          <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading && !stats ? (
          Array(4).fill(0).map((_, i) => (
             <div key={i} className="h-24 bg-neutral-900/50 animate-pulse border border-neutral-800" />
          ))
        ) : (
          statCards.map((stat) => (
            <Card key={stat.name} className="rounded-none border-neutral-800 bg-neutral-900/50 text-neutral-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-body font-medium uppercase tracking-widest text-neutral-400">
                  {stat.name}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-heading font-bold">{stat.value}</div>
                <p className="text-[10px] text-neutral-500 font-body mt-1 uppercase tracking-wider">
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Bookings */}
        <Card className="col-span-4 rounded-none border-neutral-800 bg-neutral-900/50 text-neutral-100">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-10"><Loader2 className="animate-spin text-gold" /></div>
              ) : recentBookings.length === 0 ? (
                <p className="text-center py-10 text-neutral-500 italic text-sm font-body">No bookings captured yet.</p>
              ) : (
                recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between border-b border-neutral-800/50 pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{booking.customerName}</p>
                      <p className="text-xs text-neutral-500">{booking.safariType} • {new Date(booking.travelDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 border ${
                        booking.status === "confirmed" ? "border-emerald-500/50 text-emerald-400" : "border-amber-500/50 text-amber-400"
                      }`}>
                        {booking.status}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono opacity-50">{booking.id.slice(0, 8)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Link href="/admin/dashboard/bookings">
              <Button variant="ghost" className="w-full mt-6 text-xs text-neutral-500 hover:text-white rounded-none border border-neutral-800">
                View All Bookings
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* System Status / Quick Actions */}
        <Card className="col-span-3 rounded-none border-neutral-800 bg-neutral-900/50 text-neutral-100">
          <CardHeader>
            <CardTitle className="font-heading text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 text-emerald-400">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium">Database Online</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-400">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Last Sync: Live Connection</span>
            </div>
            <div className="pt-6 border-t border-neutral-800">
              <h4 className="text-xs uppercase tracking-widest text-gold mb-4 font-body">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/admin/dashboard/messages" className="w-full">
                  <Button variant="outline" className="w-full rounded-none text-[10px] h-14 flex flex-col border-neutral-800 hover:bg-neutral-800">
                    <AlertCircle className="h-4 w-4 mb-1 text-amber-500" />
                    Review Inquiries
                  </Button>
                </Link>
                <Link href="/admin/dashboard/destinations" className="w-full">
                  <Button variant="outline" className="w-full rounded-none text-[10px] h-14 flex flex-col border-neutral-800 hover:bg-neutral-800">
                    <Map className="h-4 w-4 mb-1 text-blue-500" />
                    Add Destination
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

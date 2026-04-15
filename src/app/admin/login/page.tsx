"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, Compass, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // This is a temporary mock login. In Ph-2 we'll integrate with NextAuth or a proper Session.
    // For now, it demonstrates the UI and the "login endpoint" flow.
    try {
      if (email === "admin@feynmansafaris.com" && password === "feynman2026") {
        toast.success("Welcome back, Commander.");
        // Simulate session storage or cookie
        document.cookie = "admin_session=true; path=/";
        router.push("/admin/dashboard");
      } else {
        toast.error("Invalid credentials. Remember: 'You must not fool yourself.'");
      }
    } catch (error) {
      toast.error("An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-foreground flex items-center justify-center p-6 bg-[url('/assets/hero-safari.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-foreground/90 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-5xl animate-fade-up">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          <div className="hidden lg:flex flex-col justify-between border border-cream/10 bg-black/25 backdrop-blur-md p-10">
            <div>
              <p className="text-[10px] text-gold uppercase tracking-[0.35em] font-bold mb-5">Feynman Management Core</p>
              <h1 className="font-heading text-4xl text-cream font-bold leading-tight mb-4">
                Admin Portal
              </h1>
              <p className="font-body text-cream/70 text-sm leading-relaxed">
                Operate destinations, bookings, customers, and dispatches from one secure dashboard.
              </p>
            </div>
            <div className="space-y-4 border-t border-cream/10 pt-8">
              {[
                { icon: ShieldCheck, text: "Secure access for operations" },
                { icon: Compass, text: "Destination and itinerary control" },
                { icon: MessageSquare, text: "Live customer inquiry handling" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-cream/70 text-sm">
                  <item.icon className="h-4 w-4 text-gold" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-center mb-6">
              <Link href="/" className="inline-flex items-center gap-3 mb-4">
                <span className="font-heading text-3xl font-bold tracking-wider text-cream">FEYNMAN</span>
              </Link>
              <div className="gold-divider mb-4" />
              <p className="quote-text text-sm text-cream/60 italic">
                "What I cannot create, I do not understand."
              </p>
            </div>

            <Card className="rounded-none border-cream/10 bg-cream/5 backdrop-blur-md text-cream shadow-2xl">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="font-heading text-2xl">Sign In</CardTitle>
                <CardDescription className="text-cream/50 font-body">
                  Enter your credentials to access the operations dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest text-gold opacity-80">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-cream/40" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@feynmansafaris.com"
                        className="pl-10 bg-white/5 border-white/10 rounded-none focus:border-gold/50 transition-colors"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-xs uppercase tracking-widest text-gold opacity-80">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-cream/40" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-10 bg-white/5 border-white/10 rounded-none focus:border-gold/50 transition-colors"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground hover:bg-gold-light rounded-none font-body font-semibold tracking-wide transition-all duration-300 h-11"
                    disabled={loading}
                  >
                    {loading ? "Authenticating..." : "Sign In to Dashboard"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <div className="w-full text-center">
                  <Link href="/" className="text-xs text-cream/40 hover:text-gold transition-colors inline-flex items-center gap-1">
                    Back to Public Site <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] text-cream/30 uppercase tracking-[0.3em]">
          Feynman Safaris &copy; {new Date().getFullYear()} — Management Core
        </p>
      </div>
    </div>
  );
}

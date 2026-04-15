import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "404 - Page Not Found | Feynman Safaris",
  description: "The page you're looking for doesn't exist. Return to Feynman Safaris for premium African safari experiences.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center space-y-8 max-w-md">
        <div className="gold-divider mx-auto w-24 h-px bg-gold mb-4" />
        <h1 className="font-heading text-6xl lg:text-8xl font-bold uppercase tracking-tighter text-white">404</h1>
        <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-gold">Nature is elusive.</h2>
        <p className="font-body text-neutral-400 leading-relaxed text-lg lowercase italic tracking-wider">
          This destination could not be found in our records. It may have drifted into the savanna mist.
        </p>
        <Link href="/">
          <Button variant="outline" className="rounded-none border-gold text-gold hover:bg-gold hover:text-charcoal uppercase tracking-[0.3em] text-[10px] h-14 px-10 transition-all font-bold">
            Back to Explorations
          </Button>
        </Link>
      </div>
    </div>
  );
}
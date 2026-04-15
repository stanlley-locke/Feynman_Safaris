"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import logoImage from "@/assets/image.png";
import { feynmanQuotes } from "@/lib/quotes";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteFading, setQuoteFading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteFading(true);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % feynmanQuotes.length);
        setQuoteFading(false);
      }, 500);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Safaris", path: "/safaris" },
    { label: "Destinations", path: "/destinations" },
    { label: "Stays", path: "/accommodations" },
    { label: "Fleet", path: "/fleet" },
    { label: "Our Story", path: "/our-story" },
    { label: "Journal", path: "/journal" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="section-padding">
        <div className="flex items-center justify-between py-3 lg:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/assets/image.png" alt="Feynman Safaris" className="w-10 h-10 rounded-none object-contain" />
            <div className="flex flex-col">
              <span className="font-heading text-xl lg:text-2xl font-bold tracking-wider text-foreground">
                FEYNMAN
              </span>
              <span className="text-[9px] lg:text-[10px] tracking-[0.25em] text-muted-foreground font-body uppercase">
                Adventure. Connect. Entertain.
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="feynman-link text-sm font-body font-medium tracking-wide text-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 px-6 py-2.5 border border-accent text-accent text-sm font-body font-medium tracking-wide hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Quote Rotator */}
        <div className="hidden lg:block pb-3 border-b border-accent/20">
          <p
            className={`quote-text text-center text-sm transition-opacity duration-500 ${quoteFading ? "opacity-0" : "opacity-100"}`}
          >
            "{feynmanQuotes[quoteIndex]}"
          </p>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border animate-fade-up">
          <nav className="section-padding py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="font-heading text-xl text-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 px-6 py-3 border border-accent text-accent text-center font-body font-medium tracking-wide hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              Book Now
            </Link>
            <p className="quote-text text-sm mt-4">
              "{feynmanQuotes[quoteIndex]}"
            </p>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

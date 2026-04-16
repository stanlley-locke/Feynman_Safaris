"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import logoImage from "@/assets/image.png";
import { feynmanQuotes } from "@/lib/quotes";
import { Mail, MessageCircle, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * feynmanQuotes.length);
    setQuote(feynmanQuotes[randomIndex]);
  }, []);

  return (
    <footer className="bg-charcoal text-cream">
      <div className="section-padding py-16 lg:py-20">
        {/* Logo */}
        <div className="mb-12 flex items-center gap-3">
          <img src="/assets/image.png" alt="Feynman Safaris" className="w-10 h-10 rounded-none object-contain" />
          <div>
            <span className="font-heading text-2xl font-bold tracking-wider">FEYNMAN</span>
            <p className="text-[10px] tracking-[0.25em] mt-0.5 opacity-60 font-body uppercase">
              Adventure. Connect. Entertain.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 text-gold">Excursions</h4>
            <ul className="space-y-2.5 font-body text-xs opacity-75 tracking-wider">
              <li><Link href="/safaris" className="hover:text-gold transition-colors">Private Safaris</Link></li>
              <li><Link href="/safaris" className="hover:text-gold transition-colors">Luxury Safaris</Link></li>
              <li><Link href="/safaris" className="hover:text-gold transition-colors">Group joining</Link></li>
              <li><Link href="/accommodations" className="hover:text-gold transition-colors">The Stays</Link></li>
              <li><Link href="/fleet" className="hover:text-gold transition-colors">The Fleet</Link></li>
              <li><Link href="/journal" className="hover:text-gold transition-colors">Field Journal</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 text-gold">Destinations</h4>
            <ul className="space-y-2.5 font-body text-sm opacity-75">
              <li><Link href="/destinations/maasai-mara" className="hover:text-gold transition-colors">Maasai Mara</Link></li>
              <li><Link href="/destinations/amboseli" className="hover:text-gold transition-colors">Amboseli</Link></li>
              <li><Link href="/destinations/samburu" className="hover:text-gold transition-colors">Samburu</Link></li>
              <li><Link href="/destinations/tsavo" className="hover:text-gold transition-colors">Tsavo</Link></li>
              <li><Link href="/destinations/diani-beach" className="hover:text-gold transition-colors">Diani Beach</Link></li>
              <li><Link href="/destinations/serengeti" className="hover:text-gold transition-colors">Serengeti</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 text-gold">About</h4>
            <ul className="space-y-2.5 font-body text-sm opacity-75">
              <li><Link href="/our-story" className="hover:text-gold transition-colors">Our Story</Link></li>
              <li><Link href="/philosophy" className="hover:text-gold transition-colors">The Feynman Philosophy</Link></li>
              <li><Link href="/guides" className="hover:text-gold transition-colors">Our Guides</Link></li>
              <li><Link href="/sustainability" className="hover:text-gold transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 text-gold">Connect</h4>
            <ul className="space-y-2.5 font-body text-sm opacity-75">
              <li><a href="mailto:info@feynmansafaris.com" className="hover:text-gold transition-colors">info@feynmansafaris.com</a></li>
              <li><a href="tel:+254000000000" className="hover:text-gold transition-colors">+254 752 032 884</a></li>
              <li><a href="https://wa.me/254752032884" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">WhatsApp</a></li>
              <li className="pt-4 flex gap-4">
                <a href="mailto:hello@feynmansafaris.com" target="_blank" rel="noopener noreferrer" title="Email" className="hover:text-gold transition-colors">
                  <Mail className="h-4 w-4" />
                </a>
                <a href="https://wa.me/254712345678" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="hover:text-gold transition-colors">
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a href="https://facebook.com/feynmansafaris" target="_blank" rel="noopener noreferrer" title="Facebook" className="hover:text-gold transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="https://x.com/feynmansafaris" target="_blank" rel="noopener noreferrer" title="X" className="hover:text-gold transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="https://instagram.com/feynmansafaris" target="_blank" rel="noopener noreferrer" title="Instagram" className="hover:text-gold transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="https://linkedin.com/company/feynmansafaris" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:text-gold transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://tiktok.com/@feynmansafaris" target="_blank" rel="noopener noreferrer" title="TikTok" className="hover:text-gold transition-colors">
                  <FaTiktok className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-cream/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="font-body text-xs opacity-50">
              © {new Date().getFullYear()} Feynman Safaris. All rights reserved. <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link> | <Link href="/terms" className="hover:text-gold transition-colors">Terms & Conditions</Link>
            </p>
            <div className="flex gap-4 items-center">
              <a href="https://www.tripadvisor.com/feynmansafaris" target="_blank" rel="noopener noreferrer" title="TripAdvisor" className="hover:opacity-90 transition-opacity duration-300">
                <img src="https://static.tacdn.com/assets/s/b1e5c3f0.ico" alt="TripAdvisor" className="h-6 w-auto" />
              </a>
              <a href="https://www.google.com/search?q=feynman+safaris" target="_blank" rel="noopener noreferrer" title="Google Reviews" className="hover:opacity-90 transition-opacity duration-300">
                <img src="http://solvotoursandsafaris.com/G-Review.png" alt="Google Reviews" className="h-6 w-auto" />
              </a>
            </div>
            <Link
              href="/contact"
              className="inline-block px-6 py-2 bg-accent text-accent-foreground font-body text-sm tracking-wider hover:bg-gold-light transition-all duration-300"
            >
              Plan My Safari
            </Link>
            <p className="quote-text text-sm opacity-60">
              "{quote}" — Richard Feynman
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

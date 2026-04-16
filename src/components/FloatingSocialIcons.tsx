"use client";

import { Mail, MessageCircle, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import Link from "next/link";

const FloatingSocialIcons = () => {
  const socials = [
    { icon: Mail, href: "mailto:hello@feynmansafaris.com", label: "Email" },
    { icon: MessageCircle, href: "https://wa.me/254712345678", label: "WhatsApp" },
    { icon: Facebook, href: "https://facebook.com/feynmansafaris", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/feynmansafaris", label: "X" },
    { icon: Instagram, href: "https://instagram.com/feynmansafaris", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/feynmansafaris", label: "LinkedIn" },
    { icon: FaTiktok, href: "https://tiktok.com/@feynmansafaris", label: "TikTok" },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
      {socials.map((social) => (
        <Link
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          title={social.label}
          className="group relative h-12 w-12 rounded-full bg-gradient-to-br from-gold to-accent text-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <social.icon className="h-5 w-5" />
          <span className="absolute right-full mr-3 px-3 py-1 bg-foreground text-cream text-xs font-body rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {social.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default FloatingSocialIcons;

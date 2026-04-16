import Layout from "@/components/Layout";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PrivacyPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/destinations-hero.jpg" alt="Privacy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/50 to-foreground/70" />
        </div>
        <div className="relative z-10 text-center section-padding">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-cream">Privacy Policy</h1>
        </div>
      </section>

      <section className="section-padding pt-16 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="font-body text-muted-foreground leading-relaxed mb-10">
            Feynman Safaris values your privacy and is committed to protecting personal data in compliance with Kenyan data protection laws and global best practices.
          </p>

          <div className="space-y-8 font-body text-neutral-700 leading-relaxed">
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-3">1. Introduction</h2>
              <p>Feynman Safaris values your privacy and is committed to protecting personal data in compliance with Kenyan data protection laws and global best practices.</p>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-3">2. Information We Collect</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Personal Data:</strong> Name, email, phone number, nationality, passport details.</li>
                <li><strong>Booking Data:</strong> Travel dates, safari preferences, dietary needs.</li>
                <li><strong>Payment Data:</strong> Secure payment records (M-Pesa, bank transfer, card).</li>
                <li><strong>Device Data:</strong> IP address, browser type, cookies.</li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-3">3. How We Use Information</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To confirm bookings and deliver safari services.</li>
                <li>To communicate itineraries, updates, and offers.</li>
                <li>To comply with legal and regulatory requirements.</li>
                <li>To improve website performance and client experience.</li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-3">4. Sharing of Information</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Shared only with trusted partners (lodges, airlines, guides) to fulfill bookings.</li>
                <li>Never sold to third parties.</li>
                <li>Disclosed only if required by law.</li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-3">5. Data Security</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Secure servers and encrypted payment gateways.</li>
                <li>Restricted staff access to sensitive data.</li>
                <li>Regular audits to maintain compliance.</li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-3">6. Cookies & Tracking</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Our website uses cookies to improve user experience.</li>
                <li>Analytics tools (Google, Facebook, LinkedIn) may track usage patterns.</li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-3">7. Your Rights</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Right to access, correct, or delete personal data.</li>
                <li>Right to opt-out of marketing communications.</li>
                <li>Right to lodge complaints with Kenya’s Data Protection Commissioner.</li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-3">8. Updates</h2>
              <p>Policies may be updated periodically. Latest version will always be available on www.feynmansafaris.com.</p>
            </div>
          </div>

          <Link href="/" className="feynman-link inline-flex items-center gap-2 mt-10 font-body text-sm font-medium tracking-wide">
            Return home <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}

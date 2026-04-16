import Layout from "@/components/Layout";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TermsPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/campfire-night.jpg" alt="Terms" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/50 to-foreground/70" />
        </div>
        <div className="relative z-10 text-center section-padding">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-cream">Terms & Conditions</h1>
        </div>
      </section>

      <section className="section-padding pt-16 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="font-body text-muted-foreground leading-relaxed mb-10">
            These Terms and Conditions govern your use of Feynman Safaris website and services. By accessing our site or booking with us, you agree to these terms.
          </p>

          <div className="space-y-8 font-body text-neutral-700 leading-relaxed">
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-3">1. Booking Terms</h2>
              <p>Bookings are subject to availability. A booking confirmation is provided once payment has been received and the itinerary is confirmed.</p>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-3">2. Payment</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Payments can be made through M-Pesa, bank transfer, or card.</li>
                <li>All prices are listed in USD unless otherwise stated.</li>
                <li>Full payment terms are provided at booking confirmation.</li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-3">3. Cancellations</h2>
              <p>Cancellations must be made in writing. Refunds are subject to supplier policies and any applicable fees.</p>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-3">4. Liability</h2>
              <p>Feynman Safaris acts as an arranger for safari services and is not liable for loss, injury, or damage arising from third-party suppliers beyond our control.</p>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-3">5. Changes</h2>
              <p>We reserve the right to amend itineraries, suppliers, or pricing where necessary. We will notify you promptly of any major changes.</p>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-3">6. Intellectual Property</h2>
              <p>All website content remains the property of Feynman Safaris and may not be reproduced without permission.</p>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-3">7. Governing Law</h2>
              <p>These terms are governed by the laws of Kenya. Any disputes will be subject to the jurisdiction of Kenyan courts.</p>
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

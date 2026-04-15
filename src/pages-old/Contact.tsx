import { useState } from "react";
import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", country: "", whatsapp: "",
    interest: "", dates: "", travelers: "", budget: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate submission (replace with Lovable Cloud backend later)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Thank you for your inquiry! We'll respond within 24 hours.", {
      description: "A real person will review your request and get back to you personally.",
    });

    setFormData({
      name: "", email: "", country: "", whatsapp: "",
      interest: "", dates: "", travelers: "", budget: "", message: "",
    });
    setSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <div className="gold-divider mb-6" />
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Let's Start Your Journey</h1>
          <p className="font-body text-muted-foreground">Tell us your dreams. We'll build something beautiful together.</p>
        </div>
      </section>

      {/* Form + Contact */}
      <section className="section-padding pb-20 lg:pb-28">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <ScrollReveal className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
                  <input name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-card border border-border font-body text-sm focus:border-accent focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-card border border-border font-body text-sm focus:border-accent focus:outline-none transition-colors" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Country</label>
                  <input name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-3 bg-card border border-border font-body text-sm focus:border-accent focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-1.5 block">WhatsApp (optional)</label>
                  <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full px-4 py-3 bg-card border border-border font-body text-sm focus:border-accent focus:outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="font-body text-sm font-medium text-foreground mb-1.5 block">I'm interested in</label>
                <select name="interest" value={formData.interest} onChange={handleChange} className="w-full px-4 py-3 bg-card border border-border font-body text-sm focus:border-accent focus:outline-none transition-colors">
                  <option value="">Select...</option>
                  <option>Private Safari</option>
                  <option>Luxury Safari</option>
                  <option>Group Joining Tour</option>
                  <option>Air Safari</option>
                  <option>Airport Transfer</option>
                  <option>Accommodation Booking</option>
                  <option>Custom Itinerary</option>
                </select>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Preferred Dates</label>
                  <input name="dates" value={formData.dates} onChange={handleChange} placeholder="e.g. July 2026" className="w-full px-4 py-3 bg-card border border-border font-body text-sm focus:border-accent focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Travelers</label>
                  <input name="travelers" value={formData.travelers} onChange={handleChange} placeholder="e.g. 2 adults" className="w-full px-4 py-3 bg-card border border-border font-body text-sm focus:border-accent focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Budget Range</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} className="w-full px-4 py-3 bg-card border border-border font-body text-sm focus:border-accent focus:outline-none transition-colors">
                    <option value="">Select...</option>
                    <option>Budget</option>
                    <option>Mid-Range</option>
                    <option>Luxury</option>
                    <option>Flexible</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Message / Special Requests</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full px-4 py-3 bg-card border border-border font-body text-sm focus:border-accent focus:outline-none transition-colors resize-none" />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-8 py-4 bg-accent text-accent-foreground font-body text-sm tracking-wider hover:bg-gold-light transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Send Inquiry"}
              </button>
              <p className="font-body text-xs text-muted-foreground text-center">
                Every inquiry receives a personal response within 24 hours. No automated replies.
              </p>
            </form>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={0.2} className="lg:col-span-2 space-y-10">
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-6">Direct Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">Email</p>
                    <a href="mailto:info@feynmansafaris.com" className="font-body text-sm text-muted-foreground hover:text-accent transition-colors">info@feynmansafaris.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">Phone/WhatsApp</p>
                    <a href="tel:+254000000000" className="font-body text-sm text-muted-foreground hover:text-accent transition-colors">+254 XXX XXX XXX</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-accent mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">Office Hours</p>
                    <p className="font-body text-sm text-muted-foreground">Mon–Fri: 8am–6pm (EAT)</p>
                    <p className="font-body text-sm text-muted-foreground">Sat: 9am–2pm (EAT)</p>
                    <p className="font-body text-sm text-muted-foreground">Sun: Closed (we're in the bush)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">Visit Us</p>
                    <p className="font-body text-sm text-muted-foreground">Nairobi, Kenya</p>
                    <p className="font-body text-xs text-muted-foreground">Appointments recommended.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="bg-warm-white p-8 border border-border">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-6">What Happens Next?</h3>
              <div className="space-y-6">
                {[
                  { step: "1", title: "You Inquire", desc: "Tell us your dreams. The more details, the better." },
                  { step: "2", title: "We Design", desc: "Within 24 hours, a real person responds. We build a draft itinerary together." },
                  { step: "3", title: "You Refine", desc: "Change anything. Add days. Remove activities. This is your journey." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-body text-sm font-bold flex-shrink-0">
                      {s.step}
                    </span>
                    <div>
                      <p className="font-body text-sm font-semibold text-foreground">{s.title}</p>
                      <p className="font-body text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote */}
      <section className="section-padding py-16 text-center bg-warm-white">
        <p className="quote-text text-lg max-w-2xl mx-auto">
          "What I cannot create, I do not understand."
        </p>
      </section>
    </Layout>
  );
};

export default Contact;

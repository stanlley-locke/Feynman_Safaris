import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Plane, Car, Hotel, Compass } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Air Safaris",
    desc: "Private charters and shared flights between parks. Get to your next destination in minutes, not hours—while enjoying stunning aerial views."
  },
  {
    icon: Car,
    title: "Airport Transfers",
    desc: "Seamless, private transfers from the airport to your hotel or domestic terminal. Always on time. Always reliable."
  },
  {
    icon: Hotel,
    title: "Accommodation Booking",
    desc: "Let us handle your city stays and boutique lodge bookings. We only recommend places that meet the Feynman standards of excellence."
  },
  {
    icon: Compass,
    title: "Bespoke Itineraries",
    desc: "Every journey with us is tailored to your curiosity. We take care of every detail, so you can focus on the discovery."
  }
];

const Services = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-warm-white bg-gradient-to-b from-warm-white to-background">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="gold-divider mb-8" />
              <h1 className="font-heading text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Beyond the Safari
              </h1>
              <p className="font-body text-xl text-muted-foreground leading-relaxed italic max-w-2xl mx-auto">
                "We obsess over your experience so you can obsess over the wonder around you."
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding py-20 lg:py-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <div className="p-10 bg-warm-white border border-accent/10 hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <service.icon className="w-16 h-16" />
                </div>
                <div className="gold-divider-left mb-6 w-8 group-hover:w-12 transition-all duration-500" />
                <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">{service.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="bg-charcoal text-cream py-20 lg:py-32 section-padding text-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold mb-8">
              "The same equations have the most beautiful solutions."
            </h2>
            <p className="font-body opacity-80 leading-relaxed mb-12">
              Our travel logistics are designed with mathematical precision but delivered with human warmth. We ensure every connection is seamless, every transfer is comfortable, and every detail is considered.
            </p>
            <div className="gold-divider mx-auto" />
          </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
};

export default Services;

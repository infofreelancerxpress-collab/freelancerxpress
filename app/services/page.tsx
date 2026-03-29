import { HeroSection } from "@/components/home/HeroSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { CTASection } from "@/components/home/CTASection";
import { services } from "@/data/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services - FreelancerXpress",
  description: "Explore our comprehensive digital marketing services including web design, social media marketing, email campaigns, and more.",
};

function ServicesHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16 gradient-primary-radial">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="font-heading font-bold text-white">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Comprehensive digital marketing solutions designed to elevate your brand and drive measurable results.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What We Offer"
            subtitle="Expert services tailored to your business needs"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline />
      <CTASection />
    </>
  );
}

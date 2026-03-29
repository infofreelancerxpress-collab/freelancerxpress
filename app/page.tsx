import { HeroSection } from "@/components/home/HeroSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { CTASection } from "@/components/home/CTASection";
import { OfferPopup } from "@/components/home/OfferPopup";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <WhyChooseUs />
      <StatsSection />
      <TestimonialsCarousel />
      <CTASection />
      <OfferPopup />
    </>
  );
}


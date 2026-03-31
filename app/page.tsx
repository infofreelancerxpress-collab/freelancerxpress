import { HeroSection } from "@/components/home/HeroSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { StatsSection } from "@/components/home/StatsSection";
import { CTASection } from "@/components/home/CTASection";
import { OfferPopup } from "@/components/home/OfferPopup";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";

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


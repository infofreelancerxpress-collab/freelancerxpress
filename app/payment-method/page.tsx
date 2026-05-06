import { AnimatedSection } from "@/components/shared/AnimatedSection";
import type { Metadata } from "next";
import PaymentMethodClient from "@/components/payment/PaymentMethodClient";

export const metadata: Metadata = {
  title: "Payment Method - FreelancerXpress",
  description:
    "Secure payment methods for FreelancerXpress services — bKash, Nagad, Upay, Rocket, and Bank Transfer.",
};

export default function PaymentMethodPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 gradient-text">
              Payment Method
            </h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              Choose your preferred payment method and follow the steps to
              complete your payment securely.
            </p>

            <PaymentMethodClient />
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

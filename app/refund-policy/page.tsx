import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy - FreelancerXpress",
  description: "Refund Policy for FreelancerXpress services.",
};

export default function RefundPolicyPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 gradient-text">
              Refund Policy
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Freelancer Express strives to ensure the highest satisfaction of our
              clients, however, due to the nature of our services, refunds may
              not be applicable in some cases. Below is a summary of our refund
              policy:
            </p>

            <div className="space-y-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading">
                  1. General Policy
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>No refunds are generally applicable after work has begun.</li>
                  <li>
                    A new order will be required for major changes or
                    cancellations after final delivery.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading">
                  2. Special Cases Refunds
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  In the following cases...
                </p>
                <div className="p-4 bg-muted/50 rounded-lg border border-border mt-4">
                  <p className="text-sm text-muted-foreground">
                    Note: The content for this section was incomplete in the
                    provided information.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

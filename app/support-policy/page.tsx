import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MessageCircle, Phone, Facebook } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Policy - FreelancerXpress",
  description: "Support channels and policy for FreelancerXpress.",
};

export default function SupportPolicyPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 gradient-text">
              Support Policy
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Freelancer Express provides 24/7 support services to our clients,
              ensuring your business never stops.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-muted/30 border border-border rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground">
                  Fast and effective support for immediate assistance.
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Call Support</h3>
                <p className="text-sm text-muted-foreground">
                  Direct voice support (Please note priority levels below).
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Facebook className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Messenger</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with us through our Facebook Page.
                </p>
              </div>
            </div>

            <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>📌</span> Additional Notes
              </h3>
              <p className="text-muted-foreground">
                We give the lowest priority to call support; as a result, calls
                may not be received at times. We strongly recommend using{" "}
                <span className="font-bold text-primary">Live Chat</span> for
                fast and effective support.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

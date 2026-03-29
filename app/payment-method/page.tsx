import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";
import { BadgeDollarSign, CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Method - FreelancerXpress",
  description: "Available payment methods for FreelancerXpress services.",
};

export default function PaymentMethodPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 gradient-text">
              Payment Method
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              You can easily pay for our services through any means. All available
              payment options are given below:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-heading">
                    Mobile Banking
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center border-b pb-2">
                      <span className="font-semibold">bKash</span>
                      <span className="font-mono text-muted-foreground">
                        01577164844
                      </span>
                    </li>
                    <li className="flex justify-between items-center border-b pb-2">
                      <span className="font-semibold">Nagad</span>
                      <span className="font-mono text-muted-foreground">
                        01996538146
                      </span>
                    </li>
                    <li className="flex justify-between items-center border-b pb-2">
                      <span className="font-semibold">Upay</span>
                      <span className="font-mono text-muted-foreground">
                        01996538146
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-semibold">Rocket</span>
                      <span className="font-mono text-muted-foreground">
                        01577164844
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-heading">
                    Bank Transfer
                  </h3>
                  <div className="space-y-2">
                    <p className="font-semibold">Account Number:</p>
                    <p className="font-mono text-xl text-primary">
                      20502420203714314
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span><BadgeDollarSign className="text-primary" /></span> Payment Confirmation
              </h3>
              <p className="text-muted-foreground mb-4">
                After completing the payment, Proof/Payment information may be
                requested. Please keep the following details ready:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Screenshot of the transaction</li>
                <li>Transaction ID (TrxID)</li>
                <li>Last 4 digits of the sender number</li>
              </ul>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

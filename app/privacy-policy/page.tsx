import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - FreelancerXpress",
  description: "Privacy Policy for FreelancerXpress users.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 gradient-text">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Freelancer Express is committed to protecting the privacy of users'
              personal information. Through this Privacy Policy, we explain how
              user information is collected, used, stored, and protected.
            </p>

            <div className="space-y-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading">
                  1. Information Collection
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may collect various types of information from users through
                  our website, Facebook page, inbox or other digital platforms,
                  such as:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Mobile number</li>
                  <li>Business information</li>
                  <li>Necessary payment information</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading">
                  2. Purpose of use of information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The information collected is used for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>To ensure service provision and delivery</li>
                  <li>To communicate and support with clients</li>
                  <li>To send offers, updates and service-related notifications</li>
                  <li>To improve work quality and maintain records</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading">
                  3. Document collection in special cases
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  In the following special situations, the National Identity Card
                  (NID) or other valid documents may be requested from the user:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>In case of changing account or important information</li>
                  <li>During client or account verification</li>
                  <li>If a service is temporarily suspended</li>
                  <li>For the need to provide special or custom services</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading">
                  4. Confidentiality of information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  All information provided by the user is stored with complete
                  confidentiality by Freelancer Express. Under no circumstances
                  will the user's personal information be shared with third
                  parties except as required by law.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading">
                  5. Information Security
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We take necessary technical and administrative measures to keep
                  user information secure. However, it is not possible to guarantee
                  100% security due to the use of the Internet.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading">
                  6. User Responsibilities
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The user is responsible for keeping his account information
                  (email, password, etc.) confidential. Freelancer Express will
                  not be liable for any loss caused by the user's negligence.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading">
                  7. Legal Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If any user violates the Terms & Conditions or Privacy Policy of
                  Freelancer Express, then Freelancer Express reserves the right
                  to take legal action using the information provided by the
                  user, if necessary, in accordance with applicable law.
                </p>
              </section>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

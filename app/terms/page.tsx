import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - FreelancerXpress",
  description: "Terms and conditions of service for FreelancerXpress.",
};

const services = [
  {
    name: "Facebook Ad Campaign",
    time: "Maximum 24 hours (Setup and Publish)",
  },
  {
    name: "Logo Design",
    time: "1 to 3 working days",
  },
  {
    name: "Graphics Design (Banner, Poster etc.)",
    time: "1 to 3 working days",
  },
  {
    name: "Web Design & Development",
    time: "3 to 7 working days (depending on complexity)",
  },
  {
    name: "Other Digital Services",
    time: "1 to 7 working days",
  },
];

export default function TermsAndConditionsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 gradient-text">
              Terms & Conditions
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Our Digital Services and Terms governing your use of Freelancer
              Express.
            </p>

            <div className="space-y-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading">
                  🌐 Web Design
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We provide modern, responsive and user-friendly website design
                  and development services as per the client's needs. The client
                  must provide the required content and information before
                  starting the work.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground text-sm">
                    <li>
                      Charges may apply for additional changes beyond the
                      scheduled revision.
                    </li>
                    <li>
                      Major changes after delivery will be considered a new
                      project.
                    </li>
                  </ul>
                </div>
              </section>

              <section className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold font-heading">
                    1. Service Type and Timeframe
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    At Freelancer X press, we are committed to completing each
                    project with utmost professionalism and speed. The delivery
                    time of our services is detailed below:
                  </p>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Service Name</TableHead>
                        <TableHead>Delivery Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services.map((service) => (
                        <TableRow key={service.name}>
                          <TableCell className="font-medium">
                            {service.name}
                          </TableCell>
                          <TableCell>{service.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  Note: The delivery time may be slightly less or more based on
                  the size of the project or the special needs of the client. In
                  that case, the time will be determined through discussion.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading">
                  2. Work Updates and Communication
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We believe that transparency and proper communication are the
                  keys to a successful project.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    <span className="font-semibold text-foreground">
                      Step-by-step Updates:
                    </span>{" "}
                    We will provide you with updates at every step during the
                    work.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">
                      Feedback:
                    </span>{" "}
                    After the initial draft of the design or development is
                    prepared, your feedback will be taken and the final delivery
                    will be given after revision as needed.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading">
                  3. Our Commitment
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    <span className="font-semibold text-foreground">
                      Fast Delivery:
                    </span>{" "}
                    We strive to complete the work in the fastest time while
                    maintaining the quality standards.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">
                      Accurate Quality:
                    </span>{" "}
                    Our main goal is to ensure the best quality output within the
                    stipulated time.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Support:</span>{" "}
                    Our team is ready to assist you in any post-delivery needs.
                  </li>
                </ul>
                <div className="mt-8 pt-6 border-t">
                  <p className="text-xl font-heading font-medium text-center gradient-text">
                    Freelancer Express is always by your side to increase the
                    speed of your business.
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

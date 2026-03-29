"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Zap, Award } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description:
      "We focus on delivering measurable results that impact your bottom line and drive business growth.",
  },
  {
    icon: Users,
    title: "Client-Focused",
    description:
      "Your success is our success. We work closely with you to understand and achieve your unique goals.",
  },
  {
    icon: Zap,
    title: "Innovative Solutions",
    description:
      "Stay ahead with cutting-edge strategies and the latest digital marketing technologies.",
  },
  {
    icon: Award,
    title: "Proven Expertise",
    description:
      "Years of experience and hundreds of successful projects across diverse industries.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Choose FreelancerXpress?"
          subtitle="We combine creativity, strategy, and technology to deliver exceptional results"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <Card className="h-full text-center group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                  <CardContent className="pt-8 pb-8 space-y-4">
                    <div className="w-16 h-16 rounded-full gradient-primary mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

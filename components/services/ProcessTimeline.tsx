"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "We start by understanding your business goals, target audience, and unique challenges to create a tailored strategy.",
  },
  {
    number: "02",
    title: "Planning & Design",
    description: "Our team develops a comprehensive plan and creates stunning designs that align with your brand identity.",
  },
  {
    number: "03",
    title: "Development & Implementation",
    description: "We bring your vision to life with expert execution, whether it's a website, campaign, or creative project.",
  },
  {
    number: "04",
    title: "Testing & Optimization",
    description: "Rigorous testing ensures everything works flawlessly before launch, with continuous optimization for best results.",
  },
  {
    number: "05",
    title: "Launch & Support",
    description: "We launch your project and provide ongoing support to ensure continued success and growth.",
  },
];

export function ProcessTimeline() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Process"
          subtitle="A proven workflow that delivers exceptional results every time"
        />

        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          {steps.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 0.1}>
              <div className="relative pl-8 md:pl-12 pb-12 last:pb-0">
                {/* Timeline Line */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-[19px] md:left-[27px] top-12 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent" />
                )}

                {/* Step Number Circle */}
                <div className="absolute left-0 top-0 w-10 h-10 md:w-14 md:h-14 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                  <span className="text-white font-bold text-sm md:text-base">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="bg-card rounded-lg p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-3 mb-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <h3 className="font-heading font-semibold text-xl md:text-2xl">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground ml-9">
                    {step.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function FAQAccordion() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services"
          />
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item) => (
              <div key={item.id} className="bg-card rounded-lg px-6 py-4 border">
                <div className="font-semibold">{item.question}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our services"
        />

        <div className="max-w-3xl mx-auto">
          <Accordion id="faq-accordion" type="single" collapsible className="space-y-4">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="bg-card rounded-lg px-6 border"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

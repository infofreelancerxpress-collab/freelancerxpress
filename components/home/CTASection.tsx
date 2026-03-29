"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-16 lg:p-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-float" />
            <div
              className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"
              style={{ animationDelay: "1s" }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">
                  Ready to Get Started?
                </span>
              </div>

              <h2 className="font-heading font-bold text-white text-balance">
                Let's Transform Your Digital Presence Together
              </h2>

              <p className="text-xl text-white/90 max-w-2xl mx-auto text-balance">
                Join hundreds of satisfied clients who have elevated their
                brands with our expert digital marketing services.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  asChild
                  size="xl"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 shadow-xl group"
                >
                  <Link href="/contact">
                    Start Your Project
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="xl"
                  variant="outline"
                  className="border-white/30 text-primary dark:text-white hover:bg-white/10"
                >
                  <Link href="/services">Browse Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ScrollReveal, StaggerContainer } from "@/components/ui/scroll-reveal";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";

export function ServicesOverview() {
  const newServices = services.slice(0, -2);
  return (
    <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal direction="up">
          <SectionHeading
            title="Our Services"
            subtitle="Comprehensive digital marketing solutions tailored to your business needs"
          />
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {newServices.map((service, index) => {
            const Icon = (Icons as any)[service.icon];
            return (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="h-full group relative overflow-hidden transition-all duration-300 hover:shadow-glow border-2 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-secondary/10 group-hover:to-accent/10 transition-all duration-500 pointer-events-none" />
                  
                  <CardHeader className="relative">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-14 h-14 rounded-lg gradient-vibrant flex items-center justify-center mb-4 shadow-lg"
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <CardTitle className="font-heading text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <ul className="space-y-2 mb-4">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          viewport={{ once: true }}
                          className="text-sm text-muted-foreground flex items-start"
                        >
                          <motion.span
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: idx * 0.1 + 0.2, type: "spring" }}
                            viewport={{ once: true }}
                            className="text-primary mr-2 font-bold"
                          >
                            ✓
                          </motion.span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    <Link
                      href={`/services#${service.id}`}
                      className="text-primary font-medium text-sm inline-flex items-center group/link hover:gap-2 transition-all"
                    >
                      Learn More
                      <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </StaggerContainer>

        <ScrollReveal delay={0.3} className="text-center mt-12">
          <MagneticButton strength={0.15}>
            <Button asChild size="lg" variant="gradient" className="shadow-glow hover:shadow-glow-lg transition-all">
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </MagneticButton>
        </ScrollReveal>
      </div>
    </section>
  );
}

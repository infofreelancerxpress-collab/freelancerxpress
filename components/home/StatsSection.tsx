"use client";

import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer } from "@/components/ui/scroll-reveal";
import { CountUp } from "@/components/ui/animated-counter";
import { SectionHeading } from "@/components/shared/SectionHeading";

const stats = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 200, suffix: "+", label: "Happy Clients"},
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export function StatsSection() {
  return (
    <section className="py-20 md:py-32 gradient-vibrant relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 right-10 w-72 h-72 bg-white/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-10 left-10 w-64 h-64 bg-white/15 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="scale">
          <SectionHeading
            title="Our Track Record"
            subtitle="Numbers that speak for themselves"
            className="text-white [&_h2]:text-white [&_p]:text-white/90"
          />
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.8 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ scale: 1.08, y: -5 }}
              className="relative group"
            >
              <div className="glass-card p-6 h-full rounded-2xl text-center space-y-3 relative overflow-hidden">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/5 transition-all duration-500 rounded-2xl" />
                
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      delay: index * 0.1 + 0.3,
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                    }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-heading drop-shadow-lg"
                  >
                    <CountUp end={stat.value} duration={2500} suffix={stat.suffix} />
                  </motion.div>
                  <div className="text-white/95 font-medium mt-2 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

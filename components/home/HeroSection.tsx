"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CountUp } from "@/components/ui/animated-counter";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background with Enhanced Gradient */}
      <div className="absolute inset-0 gradient-primary-radial opacity-10 dark:opacity-20" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -8, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full blur-3xl"
        />
        
        {/* Additional smaller orbs for depth */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-1/3 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/3 left-2/3 w-28 h-28 bg-secondary/20 rounded-full blur-2xl"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge with Enhanced Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-primary/20 hover:border-primary/40 transition-all cursor-default"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Digital Marketing Excellence
              </span>
            </motion.div>
          </motion.div>

          {/* Headline with Stagger Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading font-bold text-balance"
          >
            Transform Your Digital Presence with{" "}
            <span className="gradient-text-vibrant">FreelancerXpress</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance"
          >
            Expert web design, social media marketing, and creative solutions
            that drive real results for your business.
          </motion.p>

          {/* CTA Buttons with Magnetic Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton strength={0.15} className="w-full sm:w-auto">
              <Button asChild size="xl" variant="gradient" className="group w-full">
                <Link href="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.15} className="w-full sm:w-auto">
              <Button asChild size="xl" variant="outline" className="w-full hover:shadow-glow">
                <Link href="/services">Explore Services</Link>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Stats with Count-Up Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12"
          >
            {[
              { value: 500, suffix: "+", label: "Projects Completed" },
              { value: 200, suffix: "+", label: "Happy Clients" },
              { value: 10, suffix: "+", label: "Years Experience" },
              { value: 98, suffix: "%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="space-y-1 cursor-default"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text-vibrant">
                  <CountUp end={stat.value} duration={2000} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}

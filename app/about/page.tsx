import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { CTASection } from "@/components/home/CTASection";
import { Target, Heart, Lightbulb, Users, Award, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - FreelancerXpress",
  description: "Learn about FreelancerXpress, our mission, values, and the team dedicated to transforming your digital presence.",
};

function AboutHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16 gradient-primary-radial">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="font-heading font-bold text-white">
            About FreelancerXpress
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            We're passionate about helping businesses thrive in the digital world through innovative marketing solutions.
          </p>
        </div>
      </div>
    </section>
  );
}

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To empower businesses of all sizes with cutting-edge digital marketing strategies that drive real, measurable results and sustainable growth.",
  },
  {
    icon: Heart,
    title: "Client-Centric",
    description: "We put our clients first, building lasting partnerships based on trust, transparency, and exceptional service delivery.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We stay ahead of digital trends, constantly evolving our strategies to leverage the latest technologies and best practices.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of teamwork, working closely with our clients to achieve shared goals and mutual success.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We're committed to delivering the highest quality work, exceeding expectations, and setting new standards in digital marketing.",
  },
  {
    icon: TrendingUp,
    title: "Growth Mindset",
    description: "We're dedicated to continuous learning and improvement, both for ourselves and for the businesses we serve.",
  },
];

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* Our Story */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <SectionHeading
                title="Our Story"
                subtitle="Building digital success stories since 2014"
                centered={false}
              />
              
              <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
                <p>
                  FreelancerXpress was founded with a simple yet powerful vision: to make professional digital marketing accessible to businesses of all sizes. What started as a small team of passionate marketers has grown into a full-service digital agency serving hundreds of clients worldwide.
                </p>
                <p>
                  Over the past decade, we've witnessed the digital landscape evolve dramatically. Through every change, we've remained committed to one core principle: delivering exceptional results that drive real business growth. Our success is measured not just in metrics and analytics, but in the success stories of the businesses we've helped transform.
                </p>
                <p>
                  Today, FreelancerXpress stands as a trusted partner for businesses looking to establish, grow, and dominate their digital presence. From startups to established enterprises, we bring the same level of dedication, creativity, and strategic thinking to every project we undertake.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Values"
            subtitle="The principles that guide everything we do"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.title} delay={index * 0.1}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-8 pb-8 space-y-4">
                      <div className="w-14 h-14 rounded-lg gradient-primary flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-heading font-semibold text-xl">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <SectionHeading
                title="Why We're Different"
                subtitle="What sets FreelancerXpress apart from the rest"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-heading font-semibold text-xl">
                    Data-Driven Decisions
                  </h3>
                  <p className="text-muted-foreground">
                    Every strategy we develop is backed by thorough research and analytics. We don't guess – we know what works because the data tells us so.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-heading font-semibold text-xl">
                    Transparent Communication
                  </h3>
                  <p className="text-muted-foreground">
                    You'll always know exactly what we're doing, why we're doing it, and what results we're achieving. No jargon, no hidden fees, just honest communication.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-heading font-semibold text-xl">
                    Customized Solutions
                  </h3>
                  <p className="text-muted-foreground">
                    We don't believe in one-size-fits-all. Every business is unique, and our strategies are tailored specifically to your goals, industry, and audience.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-heading font-semibold text-xl">
                    Proven Track Record
                  </h3>
                  <p className="text-muted-foreground">
                    With over 500 successful projects and a 98% client satisfaction rate, our results speak for themselves. We've helped businesses grow from startups to industry leaders.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

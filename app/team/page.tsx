import { getTeamMembers } from "@/app/actions/team";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Team - FreelancerXpress",
  description:
    "Meet the talented team behind FreelancerXpress. Experts in digital marketing, design, development, and strategy.",
};

function TeamHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16 gradient-primary-radial">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="font-heading font-bold text-white">Meet Our Team</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Talented professionals dedicated to your success. Each team member
            brings unique expertise and passion to every project.
          </p>
        </div>
      </div>
    </section>
  );
}

export default async function TeamPage() {
  const { data: teamMembers = [] } = await getTeamMembers();

  return (
    <>
      <TeamHero />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="The People Behind Your Success"
            subtitle="A diverse team of experts working together to achieve your goals"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-heading font-bold gradient-text">
              Join Our Team
            </h2>
            <p className="text-xl text-muted-foreground">
              We're always looking for talented individuals who are passionate
              about digital marketing and want to make a real impact.
            </p>
            <Button asChild size="lg" variant="gradient" className="group">
              <Link href="/contact">
                Get In Touch
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

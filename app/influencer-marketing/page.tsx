"use client";

import { useState } from "react";
import { HeroSection } from "@/components/influencer/HeroSection";
import { InfluencerFilter } from "@/components/influencer/InfluencerFilter";
import { InfluencerGrid } from "@/components/influencer/InfluencerGrid";
import { HowItWorks } from "@/components/influencer/HowItWorks";
import { Benefits } from "@/components/influencer/Benefits";
import { CTASection } from "@/components/influencer/CTASection";
import { influencers } from "@/components/influencer/data";

export default function InfluencerMarketingPage() {
  // In a real app, filtering logic would go here
  const [filteredInfluencers, setFilteredInfluencers] = useState(influencers);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black">
      <HeroSection />

      <div className="container px-4 md:px-6 mx-auto py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4">
            <InfluencerFilter />
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Featured Influencers</h2>
              <p className="text-muted-foreground text-sm">
                Showing {filteredInfluencers.length} results
              </p>
            </div>
            <InfluencerGrid influencers={filteredInfluencers} />
          </main>
        </div>
      </div>

      <HowItWorks />
      <Benefits />
      <CTASection />
    </div>
  );
}

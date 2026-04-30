"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { HeroSection } from "@/components/influencer/HeroSection";
import { InfluencerFilter } from "@/components/influencer/InfluencerFilter";
import { InfluencerGrid } from "@/components/influencer/InfluencerGrid";
import { HowItWorks } from "@/components/influencer/HowItWorks";
import { Benefits } from "@/components/influencer/Benefits";
import { CTASection } from "@/components/influencer/CTASection";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type { Influencer } from "@/components/influencer/data";

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

function InfluencerMarketingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1, limit: 12, total: 0, totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchInfluencers = useCallback(async (params?: URLSearchParams) => {
    setIsLoading(true);
    try {
      const queryParams = params || searchParams;
      const apiParams = new URLSearchParams();

      // Map search params to API params
      const category = queryParams.get("category");
      const platform = queryParams.get("platform");
      const minEngagement = queryParams.get("minEngagement");
      const search = queryParams.get("search");
      const experienceLevel = queryParams.get("experienceLevel");
      const page = queryParams.get("page") || "1";
      const sortBy = queryParams.get("sortBy") || "createdAt";
      const sortOrder = queryParams.get("sortOrder") || "desc";

      if (category && category !== "All Categories") apiParams.set("category", category);
      if (platform) apiParams.set("platform", platform);
      if (minEngagement) apiParams.set("minEngagement", minEngagement);
      if (search) apiParams.set("search", search);
      if (experienceLevel) apiParams.set("experienceLevel", experienceLevel);
      apiParams.set("page", page);
      apiParams.set("limit", "12");
      apiParams.set("sortBy", sortBy);
      apiParams.set("sortOrder", sortOrder);

      const res = await fetch(`/api/influencers?${apiParams}`);
      const json = await res.json();

      if (json.success) {
        setInfluencers(json.data.influencers);
        setPagination(json.data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch influencers:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchInfluencers();
  }, [fetchInfluencers]);

  const handleFilterChange = (filters: Record<string, string>) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    params.set("page", "1");
    router.push(`/influencer-marketing?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/influencer-marketing?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black">
      <HeroSection />

      <div className="container px-4 md:px-6 mx-auto py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4">
            <InfluencerFilter onFilterChange={handleFilterChange} />
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Featured Influencers</h2>
              <p className="text-muted-foreground text-sm">
                {isLoading ? "Loading..." : `Showing ${influencers.length} of ${pagination.total} results`}
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <InfluencerGrid influencers={influencers} />

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page >= pagination.totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <HowItWorks />
      <Benefits />
      <CTASection />
    </div>
  );
}

export default function InfluencerMarketingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-black">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <InfluencerMarketingContent />
    </Suspense>
  );
}

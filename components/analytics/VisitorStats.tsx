"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Users } from "lucide-react";

interface TodayData {
  totalVisits: number;
  uniqueVisitors: number;
}

/**
 * Dashboard cards showing today's total page views and unique visitors.
 * Fetches data client-side from the admin-only API.
 */
export function VisitorStats() {
  const [data, setData] = useState<TodayData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics/today")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Today&apos;s Visitors
          </CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-16 animate-pulse bg-slate-200 dark:bg-slate-800 rounded" />
          ) : (
            <>
              <div className="text-2xl font-bold">
                {data?.totalVisits ?? 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Total page views today
              </p>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Unique Visitors
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-16 animate-pulse bg-slate-200 dark:bg-slate-800 rounded" />
          ) : (
            <>
              <div className="text-2xl font-bold text-indigo-600">
                {data?.uniqueVisitors ?? 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Distinct visitors today
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

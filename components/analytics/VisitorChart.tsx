"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DayData {
  date: string;
  total: number;
  unique: number;
}

/**
 * Area chart showing daily visitor trends.
 * Supports toggling between 7-day and 30-day views.
 */
export function VisitorChart() {
  const [data, setData] = useState<DayData[]>([]);
  const [days, setDays] = useState<7 | 30>(7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetch(`/api/analytics/summary?days=${days}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [days]);

  /** Format "2026-04-30" → "Apr 30" */
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-indigo-500" />
          <CardTitle className="text-base font-semibold">
            Visitor Trends
          </CardTitle>
        </div>
        <div className="flex gap-1">
          <Button
            variant={days === 7 ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs cursor-pointer"
            onClick={() => setDays(7)}
          >
            7 Days
          </Button>
          <Button
            variant={days === 30 ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs cursor-pointer"
            onClick={() => setDays(30)}
          >
            30 Days
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[280px] flex items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          </div>
        ) : data.length === 0 ? (
          <div className="h-[280px] flex items-center justify-center text-muted-foreground">
            No visitor data available yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradUnique" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
                labelFormatter={formatDate}
              />
              <Area
                type="monotone"
                dataKey="total"
                name="Total Visits"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#gradTotal)"
              />
              <Area
                type="monotone"
                dataKey="unique"
                name="Unique Visitors"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#gradUnique)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {/* Legend */}
        {!loading && data.length > 0 && (
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-indigo-500" />
              Total Visits
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              Unique Visitors
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

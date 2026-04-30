import { VisitorStats } from "@/components/analytics/VisitorStats";
import { VisitorChart } from "@/components/analytics/VisitorChart";

export const dynamic = "force-dynamic";

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                    Visitor Analytics
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                    Track your website traffic and visitor engagement in real time.
                </p>
            </div>

            {/* Today's Stats */}
            <VisitorStats />

            {/* Trend Chart */}
            <VisitorChart />
        </div>
    );
}

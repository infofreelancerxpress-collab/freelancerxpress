import { Card, CardContent } from "@/components/ui/card";
import {
    Users,
    Tag,
    Star,
    MessageSquare,
    TrendingUp,
    CheckCircle,
    ArrowRight,
    ChevronRight,
} from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { VisitorStats } from "@/components/analytics/VisitorStats";
import { VisitorChart } from "@/components/analytics/VisitorChart";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const teamCount = await prisma.teamMember.count();
    const offerCount = await prisma.offer.count();
    const activeOfferCount = await prisma.offer.count({
        where: {
            isActive: true,
            startDate: { lte: new Date() },
            endDate: { gte: new Date() },
        },
    });

    const influencerCount = await prisma.influencer.count();
    const verifiedCount = await prisma.influencer.count({ where: { verified: true } });
    const inquiryCount = await prisma.inquiry.count();
    const pendingInquiries = await prisma.inquiry.count({ where: { status: "pending" } });
    const engagementStats = await prisma.influencer.aggregate({
        _avg: { engagementRate: true },
    });

    const statCards = [
        {
            label: "Team Members",
            value: teamCount,
            subtitle: "Active members in your organization",
            icon: Users,
            color: "blue",
            bgClass: "bg-blue-500/10 dark:bg-blue-500/15",
            iconClass: "text-blue-600 dark:text-blue-400",
            borderClass: "border-b-blue-500",
        },
        {
            label: "Total Offers",
            value: offerCount,
            subtitle: `${activeOfferCount} currently active`,
            icon: Tag,
            color: "amber",
            bgClass: "bg-amber-500/10 dark:bg-amber-500/15",
            iconClass: "text-amber-600 dark:text-amber-400",
            borderClass: "border-b-amber-500",
        },
        {
            label: "Influencers",
            value: influencerCount,
            subtitle: `${verifiedCount} verified`,
            icon: Star,
            color: "purple",
            bgClass: "bg-purple-500/10 dark:bg-purple-500/15",
            iconClass: "text-purple-600 dark:text-purple-400",
            borderClass: "border-b-purple-500",
        },
        {
            label: "Inquiries",
            value: inquiryCount,
            subtitle: `${pendingInquiries} pending`,
            icon: MessageSquare,
            color: "emerald",
            bgClass: "bg-emerald-500/10 dark:bg-emerald-500/15",
            iconClass: "text-emerald-600 dark:text-emerald-400",
            borderClass: "border-b-emerald-500",
        },
    ];

    const quickActions = [
        {
            href: "/dashboard/team",
            icon: Users,
            label: "Manage Team",
            description: "View and manage your organization's team members",
            color: "bg-blue-500/10 dark:bg-blue-500/15",
            iconColor: "text-blue-600 dark:text-blue-400",
        },
        {
            href: "/dashboard/offers",
            icon: Tag,
            label: "Manage Offers",
            description: "Create, edit, and manage service bundle offers",
            color: "bg-amber-500/10 dark:bg-amber-500/15",
            iconColor: "text-amber-600 dark:text-amber-400",
        },
        {
            href: "/dashboard/influencers",
            icon: Star,
            label: "Manage Influencers",
            description: "Add and manage influencer marketplace listings",
            color: "bg-purple-500/10 dark:bg-purple-500/15",
            iconColor: "text-purple-600 dark:text-purple-400",
        },
        {
            href: "/dashboard/inquiries",
            icon: MessageSquare,
            label: "View Inquiries",
            description: "Review and respond to influencer contact inquiries",
            color: "bg-emerald-500/10 dark:bg-emerald-500/15",
            iconColor: "text-emerald-600 dark:text-emerald-400",
        },
    ];

    return (
        <div className="space-y-8">
            {/* ── Welcome Header ──────────────────────────────────── */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                    Welcome back, Admin 👋
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                    Here&apos;s what&apos;s happening with your platform today.
                </p>
            </div>

            {/* ── Primary Stat Cards ──────────────────────────────── */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((card) => (
                    <Card
                        key={card.label}
                        className={`border-b-2 ${card.borderClass} hover:shadow-lg transition-shadow duration-300`}
                    >
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {card.label}
                                    </p>
                                    <p className="text-3xl font-bold tracking-tight">
                                        {card.value}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {card.subtitle}
                                    </p>
                                </div>
                                <div className={`p-2.5 rounded-xl ${card.bgClass}`}>
                                    <card.icon className={`h-5 w-5 ${card.iconClass}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* ── Secondary Metrics ───────────────────────────────── */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="overflow-hidden">
                    <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Avg. Engagement Rate
                                </p>
                                <p className="text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                                    {(engagementStats._avg.engagementRate || 0).toFixed(1)}%
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Across all influencers
                                </p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15">
                                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                        </div>
                        {/* Progress bar */}
                        <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700"
                                style={{ width: `${Math.min((engagementStats._avg.engagementRate || 0) * 10, 100)}%` }}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden">
                    <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Verified Influencers
                                </p>
                                <p className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
                                    {influencerCount > 0 ? Math.round((verifiedCount / influencerCount) * 100) : 0}%
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {verifiedCount} of {influencerCount} verified
                                </p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-blue-500/10 dark:bg-blue-500/15">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        {/* Progress bar */}
                        <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700"
                                style={{ width: `${influencerCount > 0 ? (verifiedCount / influencerCount) * 100 : 0}%` }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ── Quick Actions ────────────────────────────────────── */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {quickActions.map((action) => (
                        <Link key={action.href} href={action.href}>
                            <Card className="group cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full">
                                <CardContent className="p-5 flex flex-col h-full">
                                    <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center mb-3`}>
                                        <action.icon className={`h-5 w-5 ${action.iconColor}`} />
                                    </div>
                                    <p className="font-semibold text-sm mb-1 flex items-center gap-1">
                                        {action.label}
                                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                    </p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {action.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* ── Visitor Analytics ────────────────────────────────── */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Visitor Analytics</h2>
                    <Link
                        href="/dashboard/analytics"
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                    >
                        View Details <ArrowRight className="h-3 w-3" />
                    </Link>
                </div>
                <div className="space-y-4">
                    <VisitorStats />
                    <VisitorChart />
                </div>
            </div>
        </div>
    );
}

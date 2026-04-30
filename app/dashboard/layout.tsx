"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Users,
    LayoutDashboard,
    LogOut,
    Tag,
    Star,
    MessageSquare,
    BarChart3,
    Zap,
    Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleSignOut } from "@/app/actions/auth";

const navSections = [
    {
        label: "Main",
        items: [
            { href: "/dashboard", icon: LayoutDashboard, label: "Overview", exact: true },
        ],
    },
    {
        label: "Management",
        items: [
            { href: "/dashboard/team", icon: Users, label: "Team Members" },
            { href: "/dashboard/offers", icon: Tag, label: "Offers" },
            { href: "/dashboard/influencers", icon: Star, label: "Influencers" },
            { href: "/dashboard/inquiries", icon: MessageSquare, label: "Inquiries" },
            { href: "/dashboard/gallery", icon: ImageIcon, label: "Gallery" },

        ],
    },
    {
        label: "Insights",
        items: [
            { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
        ],
    },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isActive = (href: string, exact?: boolean) => {
        if (exact) return pathname === href;
        return pathname.startsWith(href);
    };

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-zinc-950">
            {/* ── Premium Sidebar ───────────────────────────────────── */}
            <aside className="w-[260px] bg-zinc-900 dark:bg-zinc-950 border-r border-zinc-800 hidden md:flex flex-col shrink-0">
                {/* Brand Header */}
                <div className="p-5 border-b border-zinc-800">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Zap className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-[15px] font-bold text-white tracking-tight">FreelancerXpress</h2>
                            <p className="text-[11px] text-zinc-500 font-medium">Admin Dashboard</p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
                    {navSections.map((section) => (
                        <div key={section.label}>
                            <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                                {section.label}
                            </p>
                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    const active = isActive(item.href, (item as any).exact);
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`
                                                flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium rounded-lg transition-all duration-200
                                                ${active
                                                    ? "bg-indigo-500/10 text-indigo-400 shadow-sm"
                                                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                                                }
                                            `}
                                        >
                                            <item.icon className={`h-[18px] w-[18px] ${active ? "text-indigo-400" : "text-zinc-500"}`} />
                                            {item.label}
                                            {active && (
                                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-zinc-800">
                    <form action={handleSignOut}>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 h-10 text-[13px] font-medium cursor-pointer"
                        >
                            <LogOut className="h-[18px] w-[18px]" />
                            Sign Out
                        </Button>
                    </form>
                </div>
            </aside>

            {/* ── Main Area ─────────────────────────────────────────── */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header Bar */}
                <header className="h-16 border-b bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md flex items-center justify-between px-6 lg:px-8 shrink-0">
                    <div>
                        <p className="text-sm font-medium text-foreground">
                            {navSections.flatMap(s => s.items).find(i =>
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                (i as any).exact ? pathname === i.href : pathname.startsWith(i.href) && !(i as any).exact
                            )?.label || "Dashboard"}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="text-xs text-muted-foreground hidden sm:block">{today}</p>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-6 lg:p-8 max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

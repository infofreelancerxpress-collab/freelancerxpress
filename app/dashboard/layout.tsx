import Link from "next/link";
import { Users, LayoutDashboard, LogOut, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleSignOut } from "@/app/actions/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-zinc-950">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-zinc-900 border-r hidden md:flex flex-col">
                <div className="p-6">
                    <h2 className="text-2xl font-bold tracking-tight">Admin</h2>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                        <LayoutDashboard className="h-4 w-4" />
                        Overview
                    </Link>
                    <Link href="/dashboard/team" className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                        <Users className="h-4 w-4" />
                        Team Members
                    </Link>
                    <Link href="/dashboard/offers" className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                        <Tag className="h-4 w-4" />
                        Offers
                    </Link>
                </nav>
                <div className="p-4 border-t">
                    <form action={handleSignOut}>
                        <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

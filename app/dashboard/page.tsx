import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Tag } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Team Members
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{teamCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Active members in your organization
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Offers
                        </CardTitle>
                        <Tag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{offerCount}</div>
                        <p className="text-xs text-muted-foreground">
                            {activeOfferCount} currently active
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    <Link href="/dashboard/team">
                        <Button className="cursor-pointer">Manage Team</Button>
                    </Link>
                    <Link href="/dashboard/offers">
                        <Button className="cursor-pointer" variant="outline">Manage Offers</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

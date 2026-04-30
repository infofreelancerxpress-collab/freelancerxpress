"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Search, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface InfluencerRow {
    id: string;
    name: string;
    username: string;
    email: string;
    category: string;
    experienceLevel: string;
    verified: boolean;
    engagementRate: number;
    totalFollowers: number;
    profilePhoto: string;
}

interface PaginationData {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export default function InfluencersManagementPage() {
    const [influencers, setInfluencers] = useState<InfluencerRow[]>([]);
    const [pagination, setPagination] = useState<PaginationData>({
        page: 1, limit: 10, total: 0, totalPages: 0,
    });
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchInfluencers = async (page = 1, searchQuery = "") => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: "10",
                sortBy: "createdAt",
                sortOrder: "desc",
            });
            if (searchQuery) params.set("search", searchQuery);

            const res = await fetch(`/api/influencers?${params}`);
            const json = await res.json();

            if (json.success) {
                setInfluencers(json.data.influencers);
                setPagination(json.data.pagination);
            }
        } catch (error) {
            toast.error("Failed to fetch influencers");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInfluencers();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchInfluencers(1, search);
    };

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            const res = await fetch(`/api/influencers/${id}`, { method: "DELETE" });
            const json = await res.json();

            if (json.success) {
                toast.success("Influencer deleted successfully");
                fetchInfluencers(pagination.page, search);
            } else {
                toast.error(json.message || "Failed to delete");
            }
        } catch (error) {
            toast.error("Failed to delete influencer");
        } finally {
            setDeletingId(null);
        }
    };

    const formatFollowers = (count: number): string => {
        if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
        if (count >= 1_000) return `${(count / 1_000).toFixed(0)}K`;
        return count.toString();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Influencers</h1>
                    <p className="text-muted-foreground">
                        Manage your influencer marketplace listings
                    </p>
                </div>
                <Link href="/dashboard/influencers/create">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Influencer
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search influencers by name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button type="submit" variant="outline">Search</Button>
                    </form>
                </CardContent>
            </Card>

            {/* Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">
                        All Influencers ({pagination.total})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-10 text-muted-foreground">Loading...</div>
                    ) : influencers.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">
                            No influencers found. Add your first one!
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Level</TableHead>
                                            <TableHead>Followers</TableHead>
                                            <TableHead>Engagement</TableHead>
                                            <TableHead>Verified</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {influencers.map((inf) => (
                                            <TableRow key={inf.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={inf.profilePhoto}
                                                            alt={inf.name}
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                        <div>
                                                            <p className="font-medium">{inf.name}</p>
                                                            <p className="text-xs text-muted-foreground">{inf.username}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className="text-xs">
                                                        {inf.category}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="text-xs">
                                                        {inf.experienceLevel}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{formatFollowers(inf.totalFollowers)}</TableCell>
                                                <TableCell>
                                                    <span className="text-green-600 font-medium">
                                                        {inf.engagementRate}%
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    {inf.verified ? (
                                                        <CheckCircle className="h-4 w-4 text-blue-500" />
                                                    ) : (
                                                        <span className="text-muted-foreground text-xs">No</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={`/dashboard/influencers/${inf.id}/edit`}>
                                                            <Button variant="ghost" size="sm">
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="text-red-500 hover:text-red-600"
                                                                    disabled={deletingId === inf.id}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Delete Influencer</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Are you sure you want to delete {inf.name}? This action cannot be undone and will also delete all associated inquiries.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDelete(inf.id)}
                                                                        className="bg-red-600 hover:bg-red-700"
                                                                    >
                                                                        Delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <p className="text-sm text-muted-foreground">
                                        Page {pagination.page} of {pagination.totalPages}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => fetchInfluencers(pagination.page - 1, search)}
                                            disabled={pagination.page <= 1}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => fetchInfluencers(pagination.page + 1, search)}
                                            disabled={pagination.page >= pagination.totalPages}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

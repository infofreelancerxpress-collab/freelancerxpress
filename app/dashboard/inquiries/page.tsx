"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Mail, Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface InquiryRow {
    id: string;
    name: string;
    email: string;
    message: string;
    status: string;
    createdAt: string;
    influencer: {
        id: string;
        name: string;
        username: string;
        profilePhoto: string;
    };
}

interface PaginationData {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export default function InquiriesManagementPage() {
    const [inquiries, setInquiries] = useState<InquiryRow[]>([]);
    const [pagination, setPagination] = useState<PaginationData>({ page: 1, limit: 20, total: 0, totalPages: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const fetchInquiries = async (page = 1, status = "all") => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({ page: page.toString(), limit: "20" });
            if (status !== "all") params.set("status", status);
            const res = await fetch(`/api/inquiries?${params}`);
            const json = await res.json();
            if (json.success) {
                setInquiries(json.data.inquiries);
                setPagination(json.data.pagination);
            }
        } catch { toast.error("Failed to fetch inquiries"); }
        finally { setIsLoading(false); }
    };

    useEffect(() => { fetchInquiries(); }, []);

    const handleStatusFilter = (val: string) => {
        setStatusFilter(val);
        fetchInquiries(1, val);
    };

    const statusBadge = (status: string) => {
        const variants: Record<string, string> = {
            pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
            responded: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
            closed: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
        };
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${variants[status] || variants.pending}`}>{status}</span>;
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Inquiries</h1>
                <p className="text-muted-foreground">Manage influencer contact inquiries</p>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">Status:</span>
                        <Select value={statusFilter} onValueChange={handleStatusFilter}>
                            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="responded">Responded</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-sm text-muted-foreground ml-auto">{pagination.total} total inquiries</span>
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <Card>
                <CardHeader><CardTitle className="text-lg">All Inquiries</CardTitle></CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-10 text-muted-foreground">Loading...</div>
                    ) : inquiries.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">No inquiries found.</div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>From</TableHead>
                                            <TableHead>Influencer</TableHead>
                                            <TableHead>Message</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {inquiries.map((inq) => (
                                            <TableRow key={inq.id}>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{inq.name}</p>
                                                        <p className="text-xs text-muted-foreground">{inq.email}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <img src={inq.influencer.profilePhoto} alt={inq.influencer.name} className="w-6 h-6 rounded-full object-cover" />
                                                        <span className="text-sm">{inq.influencer.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-sm max-w-[200px] truncate" title={inq.message}>{inq.message}</p>
                                                </TableCell>
                                                <TableCell>{statusBadge(inq.status)}</TableCell>
                                                <TableCell>
                                                    <span className="text-sm text-muted-foreground">
                                                        {new Date(inq.createdAt).toLocaleDateString()}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <a href={`mailto:${inq.email}`}>
                                                        <Button variant="ghost" size="sm"><Mail className="h-4 w-4" /></Button>
                                                    </a>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            {pagination.totalPages > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <p className="text-sm text-muted-foreground">Page {pagination.page} of {pagination.totalPages}</p>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => fetchInquiries(pagination.page - 1, statusFilter)} disabled={pagination.page <= 1}><ChevronLeft className="h-4 w-4" /></Button>
                                        <Button variant="outline" size="sm" onClick={() => fetchInquiries(pagination.page + 1, statusFilter)} disabled={pagination.page >= pagination.totalPages}><ChevronRight className="h-4 w-4" /></Button>
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

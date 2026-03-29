"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import { Pencil, Trash2, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import Link from "next/link";

interface OfferService {
  serviceId: string;
  service: {
    id: string;
    title: string;
  };
}

interface Offer {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  services: OfferService[];
  createdAt: string;
}

interface OfferTableProps {
  offers: Offer[];
}

export function OfferTable({ offers: initialOffers }: OfferTableProps) {
  const router = useRouter();
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isCurrentlyActive = (offer: Offer) => {
    const now = new Date();
    const start = new Date(offer.startDate);
    const end = new Date(offer.endDate);
    return offer.isActive && start <= now && end >= now;
  };

  const handleToggleActive = async (offer: Offer) => {
    setLoadingId(offer.id);
    try {
      const res = await fetch(`/api/offers/${offer.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !offer.isActive }),
      });

      if (!res.ok) throw new Error("Failed to update");

      setOffers((prev) =>
        prev.map((o) =>
          o.id === offer.id ? { ...o, isActive: !o.isActive } : o
        )
      );
      toast.success(
        `Offer ${!offer.isActive ? "activated" : "deactivated"} successfully`
      );
    } catch {
      toast.error("Failed to toggle offer status");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/offers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");

      setOffers((prev) => prev.filter((o) => o.id !== id));
      toast.success("Offer deleted successfully");
      router.refresh();
    } catch {
      toast.error("Failed to delete offer");
    } finally {
      setLoadingId(null);
    }
  };

  if (offers.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/30">
        <p className="text-muted-foreground mb-4">No offers found</p>
        <Link href="/dashboard/offers/new">
          <Button>Create Your First Offer</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="text-center">Discount</TableHead>
            <TableHead>Date Range</TableHead>
            <TableHead className="text-center">Services</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offers.map((offer) => (
            <TableRow key={offer.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{offer.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                    {offer.description}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="secondary" className="font-mono">
                  {offer.discountPercentage}%
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <p>{formatDate(offer.startDate)}</p>
                  <p className="text-muted-foreground">
                    to {formatDate(offer.endDate)}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="outline">
                  {offer.services.length} service{offer.services.length !== 1 ? "s" : ""}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                {isCurrentlyActive(offer) ? (
                  <Badge className="bg-green-500/10 text-green-600 border-green-200 dark:border-green-800">
                    Active
                  </Badge>
                ) : offer.isActive ? (
                  <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-800">
                    Scheduled
                  </Badge>
                ) : (
                  <Badge variant="secondary">Inactive</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleActive(offer)}
                    disabled={loadingId === offer.id}
                    title={offer.isActive ? "Deactivate" : "Activate"}
                  >
                    {loadingId === offer.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : offer.isActive ? (
                      <ToggleRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                  <Link href={`/dashboard/offers/${offer.id}/edit`}>
                    <Button variant="ghost" size="icon" title="Edit">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Delete"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Offer</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete &quot;{offer.title}&quot;? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(offer.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
  );
}

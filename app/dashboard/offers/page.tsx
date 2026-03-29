import prisma from "@/lib/prisma";
import { OfferTable } from "@/components/offers/OfferTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function OffersPage() {
  const offers = await prisma.offer.findMany({
    include: {
      services: {
        include: {
          service: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Serialize dates for client component
  const serializedOffers = offers.map((offer) => ({
    ...offer,
    startDate: offer.startDate.toISOString(),
    endDate: offer.endDate.toISOString(),
    createdAt: offer.createdAt.toISOString(),
    updatedAt: offer.updatedAt.toISOString(),
    services: offer.services.map((os) => ({
      ...os,
      service: os.service,
    })),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Offers</h1>
          <p className="text-muted-foreground mt-1">
            Manage your service bundle offers and promotions.
          </p>
        </div>
        <Link href="/dashboard/offers/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Offer
          </Button>
        </Link>
      </div>

      <OfferTable offers={serializedOffers} />
    </div>
  );
}

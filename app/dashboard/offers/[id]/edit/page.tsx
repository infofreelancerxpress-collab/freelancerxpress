import prisma from "@/lib/prisma";
import { OfferForm } from "@/components/offers/OfferForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditOfferPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const offer = await prisma.offer.findUnique({
    where: { id },
    include: {
      services: {
        include: {
          service: true,
        },
      },
    },
  });

  if (!offer) {
    notFound();
  }

  const serializedOffer = {
    id: offer.id,
    title: offer.title,
    description: offer.description,
    discountPercentage: offer.discountPercentage,
    startDate: offer.startDate.toISOString(),
    endDate: offer.endDate.toISOString(),
    isActive: offer.isActive,
    services: offer.services.map((os) => ({
      serviceId: os.serviceId,
    })),
  };

  return (
    <div>
      <OfferForm mode="edit" initialData={serializedOffer} />
    </div>
  );
}

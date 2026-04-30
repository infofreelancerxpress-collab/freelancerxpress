import prisma from "@/lib/prisma";
import { GalleryTable } from "@/components/gallery/GalleryTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function GalleryDashboardPage() {
  const galleryItems = await prisma.galleryItem.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const serializedItems = galleryItems.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio projects and showcase items.
          </p>
        </div>
        <Link href="/dashboard/gallery/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Item
          </Button>
        </Link>
      </div>

      <GalleryTable items={serializedItems} />
    </div>
  );
}

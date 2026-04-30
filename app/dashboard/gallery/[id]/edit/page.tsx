import { GalleryForm } from "@/components/gallery/GalleryForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditGalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const item = await prisma.galleryItem.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!item) {
    notFound();
  }

  return (
    <div>
      <GalleryForm mode="edit" initialData={item} />
    </div>
  );
}

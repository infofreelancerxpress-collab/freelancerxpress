import prisma from "@/lib/prisma";
import { GalleryShowcase } from "@/components/gallery/GalleryShowcase";
import { CTASection } from "@/components/home/CTASection";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Work - FreelancerXpress",
  description: "Explore our portfolio of successful digital marketing campaigns, web designs, and case studies.",
};

function GalleryHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-16 bg-zinc-950">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-white tracking-tight">
            Our Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Masterpieces</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            A curated gallery of successful campaigns, stunning web designs, and marketing strategies that drive real results.
          </p>
        </div>
      </div>
    </section>
  );
}

export default async function GalleryPage() {
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
    <>
      <GalleryHero />
      <GalleryShowcase initialItems={serializedItems} />
      <CTASection />
    </>
  );
}

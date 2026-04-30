"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  category: string;
  imageUrl: string;
  link: string | null;
  createdAt: string;
}

interface GalleryShowcaseProps {
  initialItems: GalleryItem[];
}

export function GalleryShowcase({ initialItems }: GalleryShowcaseProps) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(initialItems.map((item) => item.category)))];

  const filteredItems = filter === "All" 
    ? initialItems 
    : initialItems.filter((item) => item.category === filter);

  return (
    <div className="py-20 md:py-32 bg-slate-50 dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                  : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 aspect-[4/3] shadow-sm hover:shadow-xl transition-shadow duration-500"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Glassmorphic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <Badge variant="secondary" className="mb-3 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-white/10">
                      {item.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    {item.link && (
                      <a 
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors mt-2"
                      >
                        Read Case Study <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

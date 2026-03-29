"use client";

import { Influencer } from "./data";
import { InfluencerCard } from "./InfluencerCard";
import { motion } from "framer-motion";
import { Frown } from "lucide-react";

interface InfluencerGridProps {
    influencers: Influencer[];
}

export function InfluencerGrid({ influencers }: InfluencerGridProps) {
    if (influencers.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-dashed border-2 border-slate-200 dark:border-slate-800">
                <Frown className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-bold mb-2">No influencers found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {influencers.map((influencer, index) => (
                <motion.div
                    key={influencer.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                    <InfluencerCard influencer={influencer} />
                </motion.div>
            ))}
        </div>
    );
}

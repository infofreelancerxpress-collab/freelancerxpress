
"use client";

import Link from "next/link";
import { Influencer } from "./data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, BarChart2, CheckCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface InfluencerCardProps {
    influencer: Influencer;
}

export function InfluencerCard({ influencer }: InfluencerCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                <div className="relative h-48 w-full overflow-hidden">
                    <img
                        src={influencer.image}
                        alt={influencer.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                        {influencer.verified && (
                            <div className="bg-blue-500/90 text-white p-1 rounded-full shadow-lg backdrop-blur-sm" title="Verified Influencer">
                                <CheckCircle className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
                        {influencer.platforms.slice(0, 3).map((platform) => (
                            <Badge key={platform.name} variant="secondary" className="bg-white/90 dark:bg-black/90 backdrop-blur-sm text-xs font-medium">
                                {platform.name}
                            </Badge>
                        ))}
                    </div>
                </div>

                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                                {influencer.name}
                            </h3>
                            <p className="text-sm text-muted-foreground font-medium">{influencer.handle}</p>
                        </div>
                        <Badge variant="outline" className="text-xs uppercase font-bold tracking-wider">
                            {influencer.experience}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="flex-grow pb-4">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                            {influencer.category} • {influencer.location}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                            <Users className="w-8 h-8 text-blue-500 p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full" />
                            <div>
                                <p className="text-sm font-bold">{influencer.stats.totalReach}</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wide">Reach</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                            <BarChart2 className="w-8 h-8 text-green-500 p-1.5 bg-green-100 dark:bg-green-900/30 rounded-full" />
                            <div>
                                <p className="text-sm font-bold">{influencer.stats.engagementRate}</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wide">Engage</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                        {influencer.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                                #{tag}
                            </span>
                        ))}
                        {influencer.tags.length > 3 && (
                            <span className="text-[10px] px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                                +{influencer.tags.length - 3}
                            </span>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="pt-0">
                    <Button asChild className="w-full group" variant="default">
                        <Link href={`/influencer-marketing/${influencer.id}`}>
                            View Profile
                            <ExternalLink className="w-4 h-4 ml-2 opacity-70 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

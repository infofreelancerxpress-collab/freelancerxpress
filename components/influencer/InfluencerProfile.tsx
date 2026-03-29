"use client";

import { Influencer } from "./data";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    MapPin,
    CheckCircle,
    Link as LinkIcon,
    Instagram,
    Youtube,
    Twitter,
    Linkedin,
    Mail,
    Calendar,
    Award
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfluencerProfileProps {
    influencer: Influencer;
}

export function InfluencerProfile({ influencer }: InfluencerProfileProps) {
    return (
        <div className="min-h-screen pt-20 pb-12 bg-slate-50 dark:bg-black">
            {/* Header Section */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Profile Image */}
                        <div className="w-full md:w-auto flex-shrink-0">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl mx-auto md:mx-0"
                            >
                                <img
                                    src={influencer.image}
                                    alt={influencer.name}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </div>

                        {/* Basic Info */}
                        <div className="flex-grow text-center md:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-2">
                                    <h1 className="text-3xl font-bold">{influencer.name}</h1>
                                    {influencer.verified && (
                                        <CheckCircle className="text-blue-500 w-6 h-6" />
                                    )}
                                </div>
                                <p className="text-lg text-muted-foreground mb-4">{influencer.handle}</p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                                    <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                                        <MapPin className="w-4 h-4" />
                                        {influencer.location}
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                                        <Award className="w-4 h-4" />
                                        {influencer.category}
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                    {influencer.tags.map(tag => (
                                        <Badge key={tag} variant="secondary">#{tag}</Badge>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            <Button size="lg" className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700">
                                <Mail className="w-4 h-4 mr-2" /> Contact Influencer
                            </Button>
                            <Button variant="outline" size="lg" className="w-full md:w-auto">
                                Download Media Kit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Stats & platforms */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-muted-foreground">Total Reach</span>
                                    <span className="font-bold text-lg">{influencer.stats.totalReach}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-muted-foreground">Engagement</span>
                                    <span className="font-bold text-lg text-green-600">{influencer.stats.engagementRate}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-muted-foreground">Price Range</span>
                                    <span className="font-bold text-lg">{influencer.priceRange}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-muted-foreground">Experience</span>
                                    <Badge>{influencer.experience}</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Platforms</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {influencer.platforms.map((platform) => (
                                    <div key={platform.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                {platform.name === 'Instagram' && <Instagram className="w-5 h-5" />}
                                                {platform.name === 'YouTube' && <Youtube className="w-5 h-5" />}
                                                {platform.name === 'Twitter' && <Twitter className="w-5 h-5" />}
                                                {platform.name === 'LinkedIn' && <Linkedin className="w-5 h-5" />}
                                                {platform.name === 'TikTok' && <span className="font-bold text-xs">TT</span>}
                                            </div>
                                            <div>
                                                <p className="font-medium">{platform.name}</p>
                                                <p className="text-xs text-muted-foreground">{platform.handle}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">{platform.followers}</p>
                                            <p className="text-xs text-muted-foreground">Followers</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Middle & Right Column - Bio & Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-4">About</h3>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {influencer.bio}
                                </p>
                            </CardContent>
                        </Card>

                        <Tabs defaultValue="portfolio" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                                <TabsTrigger value="audience">Audience Demographics</TabsTrigger>
                            </TabsList>
                            <TabsContent value="portfolio" className="mt-6">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative group cursor-pointer">
                                            <img
                                                src={`https://source.unsplash.com/random/400x400?${influencer.tags[0]}&sig=${i}`}
                                                alt="Portfolio Item"
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                                                View Post
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="audience" className="mt-6">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <h4 className="font-semibold mb-4">Age Distribution</h4>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm"><span>18-24</span><span>35%</span></div>
                                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="bg-indigo-500 h-full w-[35%]"></div></div>

                                                    <div className="flex justify-between text-sm mt-2"><span>25-34</span><span>45%</span></div>
                                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="bg-indigo-500 h-full w-[45%]"></div></div>

                                                    <div className="flex justify-between text-sm mt-2"><span>35-44</span><span>15%</span></div>
                                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="bg-indigo-500 h-full w-[15%]"></div></div>

                                                    <div className="flex justify-between text-sm mt-2"><span>45+</span><span>5%</span></div>
                                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="bg-indigo-500 h-full w-[5%]"></div></div>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-4">Gender</h4>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-32 h-32 rounded-full border-8 border-indigo-100 flex items-center justify-center relative">
                                                        <div className="text-center">
                                                            <div className="text-xs text-muted-foreground">Female</div>
                                                            <div className="font-bold text-xl">65%</div>
                                                        </div>
                                                    </div>
                                                    <div className="w-24 h-24 rounded-full border-8 border-slate-100 flex items-center justify-center relative">
                                                        <div className="text-center">
                                                            <div className="text-xs text-muted-foreground">Male</div>
                                                            <div className="font-bold text-lg">35%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}

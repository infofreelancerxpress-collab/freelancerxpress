"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden bg-slate-900 text-white">
            {/* Background Gradient & Pattern */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-slate-900 to-purple-600/20" />
                <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] rounded-full bg-blue-600/10 blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/10 blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Connect with the Perfect <br className="hidden md:block" />
                        <span className="text-indigo-400">Influencers</span> for Your Brand
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Discover top-tier content creators across every niche. Streamline your campaign management and maximize your ROI with data-driven matches.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20 p-2">
                        <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                        <Input
                            type="text"
                            placeholder="Search by name, niche, or platform..."
                            className="w-full bg-transparent border-none pl-10 pr-4 text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 h-10 md:h-12 dark:bg-transparent"
                        />
                        <Button className="rounded-full px-6 md:px-8 bg-indigo-600 hover:bg-indigo-700 text-white h-10 md:h-12 font-medium transition-all hover:scale-105 cursor-pointer">
                            Search
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 flex justify-center gap-6 text-sm text-slate-400"
                >
                    <p>✓ 10k+ Verified Creators</p>
                    <p>✓ Real-time Analytics</p>
                    <p>✓ Secure Payments</p>
                </motion.div>
            </div>
        </section>
    );
}

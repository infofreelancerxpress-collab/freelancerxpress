"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CTASection() {
    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
            </div>

            <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6">
                    <Sparkles className="w-4 h-4" />
                    <span>Start your journey today</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                    Ready to Scale Your Brand?
                </h2>

                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                    Join thousands of brands leveraging our platform to build meaningful connections with influencers and their audiences.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg h-14 px-8 rounded-full" asChild>
                        <Link href="/contact">
                            Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="text-black border-slate-600 hover:bg-slate-800 text-lg h-14 px-8 rounded-full hover:text-white" asChild>
                        <Link href="/about">
                            Learn More
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

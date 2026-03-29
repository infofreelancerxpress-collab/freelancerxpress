"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, BarChart } from "lucide-react";

const benefits = [
    {
        icon: ShieldCheck,
        title: "Verified Authenticity",
        description: "Every influencer is manually vetted to ensure genuine audience and authentic engagement."
    },
    {
        icon: BarChart,
        title: "Data-Driven Insights",
        description: "Access deep analytics on audience demographics, growth trends, and engagement quality."
    },
    {
        icon: Zap,
        title: "Fast Turnaround",
        description: "Streamlined communication and workflow tools to get your campaigns live faster."
    },
    {
        icon: CheckCircle2,
        title: "Quality Guarantee",
        description: "We hold payments in escrow until deliverables are approved to ensure your satisfaction."
    }
];

export function Benefits() {
    return (
        <section className="py-20 bg-white dark:bg-slate-950">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Why Choose Our Platform?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 text-neutral-600 dark:text-neutral-400">
                            We bridge the gap between brands and creators with technology that ensures transparency, efficiency, and results.
                        </p>

                        <div className="space-y-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                                            <benefit.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                                        <p className="text-muted-foreground text-sm lg:text-base">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                            <img
                                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                                alt="Team analyzing influencer data"
                                className="w-full h-full object-cover"
                            />
                            {/* Floating Stats Card */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Total Active Influencers</p>
                                        <h4 className="text-2xl font-bold text-indigo-600">12,500+</h4>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground mb-1">Campaigns Launched</p>
                                        <h4 className="text-2xl font-bold text-green-600">850+</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative Background Element */}
                        <div className="absolute -top-10 -right-10 w-full h-full border-2 border-indigo-600/20 rounded-2xl z-0 hidden md:block" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

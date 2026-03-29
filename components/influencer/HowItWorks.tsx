"use client";

import { motion } from "framer-motion";
import { Search, UserCheck, MessageSquare, Rocket } from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "Discover",
        description: "Browse our curated network of verified influencers using smart filters to match your niche and audience."
    },
    {
        icon: UserCheck,
        title: "Evaluate",
        description: "Review detailed profiles, performance metrics, and content portfolios to ensure the perfect fit."
    },
    {
        icon: MessageSquare,
        title: "Connect",
        description: "Reach out directly through our platform to discuss your campaign and collaboration terms."
    },
    {
        icon: Rocket,
        title: "Launch",
        description: "Execute your campaign and track real-time performance results through our dashboard."
    }
];

export function HowItWorks() {
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                    <p className="text-muted-foreground text-lg">
                        We've simplified the influencer marketing process into four easy steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            <div className="mb-6 relative">
                                <div className="absolute inset-0 bg-indigo-500/10 rounded-full scale-150 rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                                <div className="relative w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-700">
                                    <step.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 rounded-full text-white text-xs font-bold flex items-center justify-center border-2 border-white dark:border-slate-800">
                                    {index + 1}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {step.description}
                            </p>

                            {/* Connector Line for Desktop */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-slate-200 via-indigo-200 to-slate-200" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

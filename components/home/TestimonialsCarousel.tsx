"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

/**
 * Enhanced reviews with realistic professional data and high-quality ImageKit screenshots.
 * We use 9 unique items to fill 3 vertical columns perfectly.
 */
const reviews = [
  {
    name: "Sarah Jenkins",
    role: "CEO, TechBloom",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    body: "Working with FreelancerXpress was a game-changer for our brand. The website they built is stunning and our sales have increased by 40%!",
    img: "https://ik.imagekit.io/iuzrfgsmv/reviews/baac3293-a01b-45b1-8bef-846731965e8f.jpeg",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Founder, DevStream",
    avatar: "https://i.pravatar.cc/150?u=david",
    body: "The attention to detail in their UI design is phenomenal. They created a digital experience that our users love and keep coming back to.",
    img: "https://ik.imagekit.io/iuzrfgsmv/reviews/9fa931a7-64ae-48c4-8bfc-fae1c75ad0c3.jpeg",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Marketing Director, Solis",
    avatar: "https://i.pravatar.cc/150?u=emma",
    body: "Fast, professional, and creative. They turned our vision into a masterpiece ahead of schedule. Highly recommended for any scaling business.",
    img: "https://ik.imagekit.io/iuzrfgsmv/reviews/48fcfe05-f3cb-4b7d-bba6-5125d54cdb53.jpeg",
    rating: 5,
  },
  {
    name: "Michael Thompson",
    role: "Owner, MT Fitness",
    avatar: "https://i.pravatar.cc/150?u=michael",
    body: "The ROI on our social campaigns has never been higher. Their performance marketing strategies are truly top-tier.",
    img: "https://ik.imagekit.io/iuzrfgsmv/reviews/8f63baa8-0c35-482b-b35a-56fb31c3561e.jpeg",
    rating: 5,
  },
  {
    name: "Lisa Wong",
    role: "Senior Designer, PixelPlus",
    avatar: "https://i.pravatar.cc/150?u=lisa",
    body: "Exceptional design workflow and even better results. They understand modern UI/UX trends perfectly and deliver premium quality.",
    img: "https://ik.imagekit.io/iuzrfgsmv/reviews/0643b56d-4868-476d-be38-5496e4ed7cfa.jpeg",
    rating: 5,
  },
  {
    name: "Alex Rivera",
    role: "Creative Lead, Horizon",
    avatar: "https://i.pravatar.cc/150?u=alex",
    body: "Stunning attention to detail. Every pixel was considered. 10/10 service and result. They are our go-to for all digital needs.",
    img: "https://ik.imagekit.io/iuzrfgsmv/reviews/fd3ca958-64ef-4d0d-a376-e10f10dd9601.jpeg",
    rating: 5,
  },
  {
    name: "John Smith",
    role: "CTO, CloudScale",
    avatar: "https://i.pravatar.cc/150?u=johnsmith",
    body: "Reliable and highly skilled. They handled our complex requirements with ease and delivered a robust, scalable platform.",
    img: "https://ik.imagekit.io/iuzrfgsmv/reviews/417d51d6-ebce-43ae-8ab6-04f3d455892b.jpeg",
    rating: 5,
  },
  {
    name: "Jessica Moore",
    role: "Owner, Bloom Floral",
    avatar: "https://i.pravatar.cc/150?u=jessica",
    body: "They completely revitalized our online brand. We're seeing more organic traffic than ever before since the launch.",
    img: "https://ik.imagekit.io/iuzrfgsmv/reviews/88488f9f-3493-4173-8479-5c1c88a534cf.jpeg",
    rating: 5,
  },
  {
    name: "Robert Taylor",
    role: "VP, Global Systems",
    avatar: "https://i.pravatar.cc/150?u=robert",
    body: "A truly professional agency. Their communication, transparency, and delivery are benchmarks in the digital service industry.",
    img: "https://ik.imagekit.io/iuzrfgsmv/reviews/342cf53f-590c-4b46-bbce-137df8a3060c.jpeg",
    rating: 5,
  },
];

// Split reviews into 3 columns for the vertical marquee
const firstColumn = reviews.slice(0, 3);
const secondColumn = reviews.slice(3, 6);
const thirdColumn = reviews.slice(6, 9);

interface ReviewCardProps {
  avatar: string;
  name: string;
  body: string;
  rating: number;
  role: string;
  img?: string;
}

const ReviewCard = ({
  avatar,
  name,
  body,
  rating,
  role,
  img,
}: ReviewCardProps) => {
  return (
    <motion.figure
      whileHover={{ y: -5, scale: 1.01 }}
      className={cn(
        "relative w-full cursor-pointer overflow-hidden rounded-[2rem] border p-6 transition-all duration-500",
        "glass-card hover:shadow-glow-lg",
        "bg-white/5 dark:bg-black/40 backdrop-blur-md"
      )}
    >
      <div className="flex flex-row items-center gap-4 mb-5">
        <div className="relative shrink-0">
          <Image
            className="rounded-full border-2 border-primary/20 p-0.5 object-cover"
            width="48"
            height="48"
            alt={name}
            src={avatar}
          />
          <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1 border border-background shadow-lg">
            <Quote className="w-2.5 h-2.5 text-primary-foreground fill-primary-foreground" />
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <figcaption className="text-base font-bold dark:text-white truncate">
            {name}
          </figcaption>
          <p className="text-xs font-semibold text-primary/80 truncate uppercase tracking-widest">{role}</p>
        </div>
      </div>
      
      <div className="flex gap-0.5 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
        ))}
      </div>

      <blockquote className="text-sm leading-relaxed text-muted-foreground/90 italic mb-6">
        &ldquo;{body}&rdquo;
      </blockquote>

      {img && (
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-2 bg-black/20">
          <Image
            src={img}
            alt={`${name}'s Project Showcase`}
            width={714}
            height={1599}
            className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105"
            priority={false}
          />
          {/* Subtle gradient overlay to enhance visual depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
      )}
      
      {/* Ghost decorative quote icon */}
      <div className="absolute top-6 right-6 opacity-[0.03] pointer-events-none">
        <Quote className="w-20 h-20 rotate-180" />
      </div>
    </motion.figure>
  );
};

export function TestimonialsCarousel() {
  return (
    <section id="testimonials" className="relative py-32 overflow-hidden bg-background/50">
      {/* Ambient background animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
           animate={{
             x: [0, 100, 0],
             y: [0, 70, 0],
             opacity: [0.1, 0.2, 0.1],
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full"
        />
        <motion.div
           animate={{
             x: [0, -80, 0],
             y: [0, 100, 0],
             opacity: [0.1, 0.15, 0.1],
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute -bottom-[20%] -right-[10%] w-[55%] h-[55%] bg-secondary/20 blur-[150px] rounded-full"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 mb-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center space-x-3 px-6 py-2 rounded-full glass border border-primary/20 shadow-glow"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.3em] bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Verified Reviews
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tight"
          >
            Client <span className="gradient-text-vibrant">Success</span> Stories
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            We don&apos;t just build projects; we build results. Join hundreds of satisfied 
            leaders who have scaled their vision with FreelancerXpress.
          </motion.p>
        </div>
      </div>

      {/* Main Vertical Marquee Container */}
      <div className="relative max-w-[1400px] mx-auto px-6 h-[1100px] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 h-full">
          {/* Column 1 */}
          <Marquee vertical pauseOnHover className="[--duration:45s] [--gap:2.5rem]">
            {firstColumn.map((review, i) => (
              <ReviewCard key={`col1-${i}`} {...review} />
            ))}
          </Marquee>
          
          {/* Column 2 - Reverse Direction */}
          <div className="hidden md:flex">
            <Marquee vertical reverse pauseOnHover className="[--duration:55s] [--gap:2.5rem]">
              {secondColumn.map((review, i) => (
                <ReviewCard key={`col2-${i}`} {...review} />
              ))}
            </Marquee>
          </div>
          
          {/* Column 3 */}
          <div className="hidden lg:flex">
            <Marquee vertical pauseOnHover className="[--duration:50s] [--gap:2.5rem]">
              {thirdColumn.map((review, i) => (
                <ReviewCard key={`col3-${i}`} {...review} />
              ))}
            </Marquee>
          </div>
        </div>

        {/* Global Vertical Gradient Fades */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-background via-background/80 to-transparent z-20"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent z-20"></div>
      </div>
      
      {/* Decorative separation line */}
      <div className="mt-32 border-t border-primary/10 w-full max-w-6xl mx-auto opacity-30 shadow-[0_-1px_10px_rgba(var(--primary),0.05)]" />
    </section>
  );
}

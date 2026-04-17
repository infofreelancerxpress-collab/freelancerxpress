"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle, ArrowRight, Gift, X, Zap } from "lucide-react";
import Link from "next/link";

interface OfferService {
  serviceId: string;
  service: {
    id: string;
    title: string;
    description: string | null;
  };
}

interface Offer {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  services: OfferService[];
}

// Module-level flag: resets on full page load/reload, persists during SPA navigation
let hasShownOffer = false;

export function OfferPopup() {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Already shown during this page lifecycle — skip
    if (hasShownOffer) {
      setLoading(false);
      return;
    }

    const fetchOffer = async () => {
      try {
        const res = await fetch("/api/offers/active");
        if (res.ok) {
          const data = await res.json();
          if (data && data.title) {
            setOffer(data);
            hasShownOffer = true;
            setTimeout(() => {
              setIsOpen(true);
              // Trigger staggered animations after dialog opens
              setTimeout(() => setIsAnimating(true), 100);
            }, 2000);
          }
        }
      } catch (error) {
        console.error("Failed to fetch offer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, []);

  const handleClose = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 150);
  }, []);

  if (loading || !offer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[440px] overflow-hidden p-0 border-0 bg-transparent shadow-none [&>button]:hidden">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(65% 0.25 285), oklch(68% 0.24 250), oklch(72% 0.20 195))",
            padding: "2px",
          }}
        >
          <div className="relative bg-background rounded-[14px] overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Gradient orbs */}
              <div
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-20 animate-float-slow"
                style={{
                  background:
                    "radial-gradient(circle, oklch(65% 0.25 285), transparent 70%)",
                }}
              />
              <div
                className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full opacity-15 animate-float"
                style={{
                  background:
                    "radial-gradient(circle, oklch(72% 0.20 195), transparent 70%)",
                }}
              />
              {/* Dot pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center transition-all hover:scale-110 hover:rotate-90 duration-300 group"
              aria-label="Close offer"
            >
              <X className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>

            {/* Top gradient accent */}
            <div
              className="h-1.5 w-full"
              style={{
                background:
                  "linear-gradient(90deg, oklch(65% 0.25 285), oklch(68% 0.24 250), oklch(72% 0.20 195), oklch(68% 0.24 250), oklch(65% 0.25 285))",
                backgroundSize: "200% 100%",
                animation: "shimmer 3s linear infinite",
              }}
            />

            <div className="relative z-10 px-7 pt-7 pb-6">
              {/* Top section: Icon + Discount badge */}
              <div
                className={`flex items-center justify-between mb-5 transition-all duration-700 ${
                  isAnimating
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shadow-glow"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(65% 0.25 285), oklch(68% 0.24 250))",
                    }}
                  >
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Limited Offer
                    </p>
                    <p className="text-[11px] text-muted-foreground/60 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Available now
                    </p>
                  </div>
                </div>

                {/* Animated discount badge */}
                <div
                  className="relative group cursor-default"
                  style={{ animation: "bounceSubtle 2s ease-in-out infinite" }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl blur-md opacity-40"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(65% 0.25 285), oklch(72% 0.20 195))",
                    }}
                  />
                  <div
                    className="relative px-4 py-2 rounded-2xl text-white font-bold text-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(65% 0.25 285), oklch(68% 0.24 250))",
                    }}
                  >
                    {offer.discountPercentage}% OFF
                  </div>
                </div>
              </div>

              {/* Header */}
              <DialogHeader
                className={`text-left mb-4 transition-all duration-700 delay-100 ${
                  isAnimating
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <DialogTitle className="text-[22px] font-bold leading-tight tracking-tight">
                  <span className="gradient-text-vibrant">
                    {offer.title}
                  </span>
                </DialogTitle>
                <DialogDescription className="text-sm mt-2 text-muted-foreground leading-relaxed">
                  {offer.description}
                </DialogDescription>
              </DialogHeader>

              {/* Included Services */}
              {offer.services && offer.services.length > 0 && (
                <div
                  className={`mb-5 transition-all duration-700 delay-200 ${
                    isAnimating
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
                    What&apos;s included
                  </p>
                  <div className="space-y-1.5">
                    {offer.services.map((os, index) => (
                      <div
                        key={os.serviceId}
                        className="flex items-center gap-2.5 py-1.5 px-3 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors group/item"
                        style={{
                          transitionDelay: `${index * 50}ms`,
                        }}
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(65% 0.25 285 / 0.15), oklch(72% 0.20 195 / 0.15))",
                          }}
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-sm text-foreground/80 group-hover/item:text-foreground transition-colors">
                          {os.service.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div
                className={`h-px w-full mb-5 transition-all duration-700 delay-300 ${
                  isAnimating
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-0"
                }`}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(65% 0.25 285 / 0.2), oklch(72% 0.20 195 / 0.2), transparent)",
                }}
              />

              {/* CTAs */}
              <div
                className={`space-y-2.5 transition-all duration-700 delay-[350ms] ${
                  isAnimating
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full h-12 text-[15px] font-semibold rounded-xl text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group/btn"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(65% 0.25 285), oklch(68% 0.24 250))",
                  }}
                >
                  <Link
                    href="/services"
                    onClick={handleClose}
                    className="flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Claim This Offer
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-muted/50"
                >
                  No thanks, maybe later
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Shimmer animation keyframe */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}} />
      </DialogContent>
    </Dialog>
  );
}

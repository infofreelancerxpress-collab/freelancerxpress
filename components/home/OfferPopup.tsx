"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle } from "lucide-react";
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

export function OfferPopup() {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        // Already shown this session — don't show again
        const shownThisSession = sessionStorage.getItem("offerShownThisSession");
        if (shownThisSession) {
          setLoading(false);
          return;
        }

        // Track visit count (incremented once per session)
        const isNewSession = !sessionStorage.getItem("sessionCounted");
        let visitCount = parseInt(localStorage.getItem("visitCount") || "0", 10);
        if (isNewSession) {
          visitCount += 1;
          localStorage.setItem("visitCount", visitCount.toString());
          sessionStorage.setItem("sessionCounted", "true");
        }

        // Determine whether to show the offer based on visit count.
        // 1st visit: always show (100%)
        // 2nd visit: 30%
        // 3rd visit: 40%  ...  8th+ visit: 100%
        // Formula: probability = min(1, 0.3 + (visitCount - 2) * 0.1) for visits > 1
        let showProbability = 1;
        if (visitCount > 1) {
          showProbability = Math.min(1, 0.3 + (visitCount - 2) * 0.1);
        }

        if (Math.random() > showProbability) {
          setLoading(false);
          return;
        }

        const res = await fetch("/api/offers/active");
        if (res.ok) {
          const data = await res.json();
          if (data && data.title) {
            setOffer(data);
            setTimeout(() => setIsOpen(true), 2000);
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

  const handleClose = () => {
    setIsOpen(false);
    // Mark as shown for this session so it won't appear again this visit
    sessionStorage.setItem("offerShownThisSession", "true");
  };

  if (loading || !offer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md overflow-hidden p-0 border-0 bg-transparent shadow-2xl">
        <div className="relative bg-background rounded-lg overflow-hidden border">
          {/* Gradient accent bar */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-secondary/10 z-0" />
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-secondary" />

          <div className="relative z-10 p-6 flex flex-col items-center text-center space-y-4">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>

            {/* Header */}
            <DialogHeader className="items-center">
              <DialogTitle className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Special Offer: {offer.discountPercentage}% OFF!
              </DialogTitle>
              <DialogDescription className="text-base mt-2 text-foreground/80">
                {offer.title}
              </DialogDescription>
            </DialogHeader>

            {/* Description */}
            <p className="text-sm text-muted-foreground">
              {offer.description}
            </p>

            {/* Included Services */}
            {offer.services && offer.services.length > 0 && (
              <div className="w-full text-left space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Included Services
                </p>
                <div className="space-y-1.5">
                  {offer.services.map((os) => (
                    <div
                      key={os.serviceId}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>{os.service.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Discount Badge */}
            <Badge
              variant="secondary"
              className="text-lg px-4 py-1 font-mono bg-primary/10 text-primary"
            >
              {offer.discountPercentage}% OFF
            </Badge>

            {/* CTAs */}
            <div className="w-full pt-2 space-y-2">
              <Button
                asChild
                className="w-full bg-linear-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              >
                <Link href="/services" onClick={handleClose}>
                  Claim Offer Now
                </Link>
              </Button>
              <Button variant="ghost" className="w-full" onClick={handleClose}>
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

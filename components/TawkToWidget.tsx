"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TawkAPI {
    hideWidget: () => void;
    toggle: () => void;
    onLoad?: () => void;
    [key: string]: unknown;
}

declare global {
    interface Window {
        Tawk_API: TawkAPI;
        Tawk_LoadStart: Date;
    }
}

export function TawkToWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        window.Tawk_API.onLoad = function () {
            window.Tawk_API.hideWidget();
            setIsLoaded(true);
        };

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://embed.tawk.to/68f6ec84559a7e194c802008/1j828nrp9";
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");
        document.body.appendChild(script);

        return () => {
            if (script.parentNode) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const toggleChat = () => {
        if (window.Tawk_API) {
            window.Tawk_API.toggle();
            setIsOpen(!isOpen);
        }
    };

    if (!isLoaded) return null;

    return (
        <Button
            onClick={toggleChat}
            className={`fixed bottom-5 right-5 z-[9999] h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-110 ${isOpen ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
                }`}
            size="icon"
            aria-label="Toggle Live Chat"
        >
            {isOpen ? (
                <X className="h-6 w-6 text-white" />
            ) : (
                <MessageCircle className="h-6 w-6 text-white" />
            )}
        </Button>
    );
}

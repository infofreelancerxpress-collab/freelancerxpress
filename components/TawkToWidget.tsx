"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X, Headphones } from "lucide-react";

interface TawkAPI {
    hideWidget: () => void;
    toggle: () => void;
    maximize: () => void;
    minimize: () => void;
    onLoad?: () => void;
    onChatMaximized?: () => void;
    onChatMinimized?: () => void;
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
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        // Force the default widget to be at the bottom right, just in case it overrides hideWidget
        window.Tawk_API.customStyle = {
            visibility: {
                desktop: { position: 'br', xOffset: 20, yOffset: 20 },
                mobile: { position: 'br', xOffset: 20, yOffset: 20 }
            }
        };

        window.Tawk_API.onLoad = function () {
            window.Tawk_API.hideWidget();
            setIsLoaded(true);
        };

        window.Tawk_API.onChatMaximized = function () {
            setIsOpen(true);
        };

        window.Tawk_API.onChatMinimized = function () {
            setIsOpen(false);
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
            if (isOpen) {
                window.Tawk_API.minimize();
            } else {
                window.Tawk_API.maximize();
            }
        }
    };

    if (!isLoaded) return null;

    return (
        <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3">
            {/* Tooltip / Label - shows on hover when chat is closed */}
            <div
                className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-2xl rounded-br-md
                    bg-white dark:bg-zinc-900 shadow-xl shadow-black/10 dark:shadow-black/30
                    border border-slate-200/80 dark:border-zinc-700
                    transition-all duration-300 origin-bottom-right
                    ${isHovered && !isOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-90 translate-y-2 pointer-events-none"
                    }
                `}
            >
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <p className="text-sm font-medium text-foreground whitespace-nowrap">
                        Chat with us
                    </p>
                </div>
                <p className="text-xs text-muted-foreground whitespace-nowrap">
                    We&apos;re online
                </p>
            </div>

            {/* Main Button */}
            <button
                onClick={toggleChat}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
                    group relative h-14 w-14 rounded-full
                    flex items-center justify-center
                    transition-all duration-300 ease-out
                    cursor-pointer outline-none
                    ${isOpen
                        ? "bg-zinc-800 dark:bg-zinc-700 shadow-lg shadow-zinc-800/20 hover:bg-zinc-700 dark:hover:bg-zinc-600 rotate-0"
                        : "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-110"
                    }
                `}
                aria-label="Toggle Live Chat"
            >
                {/* Pulse ring when closed */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-indigo-500/20 duration-1000" style={{ animationDuration: "2s" }} />
                )}

                {/* Icon with smooth transition */}
                <div className="relative">
                    <MessageCircle
                        className={`
                            h-6 w-6 text-white absolute inset-0 m-auto
                            transition-all duration-300
                            ${isOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}
                        `}
                    />
                    <X
                        className={`
                            h-6 w-6 text-white
                            transition-all duration-300
                            ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}
                        `}
                    />
                </div>
            </button>
        </div>
    );
}

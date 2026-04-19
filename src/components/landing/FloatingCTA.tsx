"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      const shouldShow = window.scrollY > 500;
      setIsVisible(shouldShow && !isDismissed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile FAB */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <div className="relative">
          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-navy-900 rounded-full
              flex items-center justify-center border-2 border-white shadow-lg z-10
              hover:bg-navy-800 transition-colors duration-200"
            aria-label="Закрити"
          >
            <X className="h-3 w-3 text-white" />
          </button>

          {/* Main button with pulse animation */}
          <a href="mailto:iirdu@proton.me">
            <Button
              size="lg"
              className="w-16 h-16 rounded-full bg-gradient-to-r from-gold-500 to-gold-600
                hover:from-gold-600 hover:to-gold-700
                shadow-2xl shadow-gold-500/50
                relative overflow-hidden group"
            >
              {/* Pulse rings */}
              <span className="absolute inset-0 rounded-full bg-gold-500 animate-ping opacity-75" />
              <span className="absolute inset-0 rounded-full bg-gold-500 animate-ping opacity-50" style={{ animationDelay: "0.5s" }} />

              {/* Icon */}
              <Send className="h-7 w-7 text-navy-900 relative z-10
                group-hover:scale-110 transition-transform duration-300" />
            </Button>
          </a>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100
            transition-opacity duration-300 pointer-events-none">
            <div className="bg-navy-900 text-white text-xs font-medium px-3 py-2 rounded-lg
              whitespace-nowrap shadow-xl">
              {locale === "uk" ? "Замовити висновок" : "Order conclusion"}
              {/* Arrow */}
              <div className="absolute top-full right-6 -mt-1">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4
                  border-l-transparent border-r-transparent border-t-navy-900" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sticky bar (optional - shows at bottom) */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-40
        bg-gradient-to-r from-navy-900 to-navy-800 border-t border-white/10
        backdrop-blur-lg transform transition-transform duration-500"
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl
                flex items-center justify-center shadow-lg">
                <Send className="h-6 w-6 text-navy-900" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">
                  {locale === "uk" ? "Готові замовити висновок?" : "Ready to order a conclusion?"}
                </div>
                <div className="text-white/60 text-xs">
                  {locale === "uk"
                    ? "Відповідь за 24 години • 100% прийнято"
                    : "Response in 24 hours • 100% accepted"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDismissed(true)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Закрити"
              >
                <X className="h-5 w-5" />
              </button>

              <a href="mailto:iirdu@proton.me">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gold-500 to-gold-600
                    hover:from-gold-600 hover:to-gold-700
                    text-navy-900 font-bold shadow-gold-glow
                    transition-all duration-300 hover:scale-105"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {locale === "uk" ? "Замовити зараз" : "Order now"}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

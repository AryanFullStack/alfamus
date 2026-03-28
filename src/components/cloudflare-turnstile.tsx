"use client";

import { useEffect, useRef, useState } from "react";

interface CloudflareTurnstileProps {
  onVerify?: (token: string) => void;
  className?: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "flexible" | "compact";
}

export default function CloudflareTurnstile({
  onVerify,
  className = "",
  theme = "auto",
  size = "flexible",
}: CloudflareTurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // You should replace this with your actual Site Key from Cloudflare Dashboard
  const SITE_KEY = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

  useEffect(() => {
    // Check if turnstile is already loaded
    const checkTurnstile = () => {
      if (window.turnstile) {
        setIsLoaded(true);
      } else {
        setTimeout(checkTurnstile, 500);
      }
    };

    checkTurnstile();

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isLoaded && containerRef.current && !widgetIdRef.current) {
      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          theme: theme,
          size: size,
          callback: (token: string) => {
            if (onVerify) onVerify(token);
          },
        });
      } catch (error) {
        console.error("Cloudflare Turnstile render error:", error);
      }
    }
  }, [isLoaded, SITE_KEY, theme, size, onVerify]);

  return (
    <div className={`cloudflare-turnstile-container ${className}`}>
      <div ref={containerRef} id="cloudflare-turnstile-widget"></div>
      {!isLoaded && (
        <div className="text-[10px] text-[#9CA3AF] animate-pulse">
          Verifying secure connection...
        </div>
      )}
    </div>
  );
}

// Global declaration for Turnstile
declare global {
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: string;
          size?: string;
          callback?: (token: string) => void;
          "error-callback"?: (error: any) => void;
          "expired-callback"?: () => void;
        }
      ) => string;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
    };
  }
}

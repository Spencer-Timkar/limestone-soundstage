"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
type Pixel = ((...args: unknown[]) => void) & {
    queue: unknown[][];
    callMethod?: (...args: unknown[]) => void;
    push?: Pixel;
    loaded?: boolean;
    version?: string;
};
declare global {
    interface Window { fbq?: Pixel; _fbq?: Pixel; }
}

export default function MetaTracking() {
    const pathname = usePathname();
    const [fromAd, setFromAd] = useState(false);
    const lastTrackedPath = useRef<string | null>(null);
    const enabled = Boolean(pixelId && /^\d+$/.test(pixelId));
    const releasePage = pathname === "/mothers-daughter" || pathname === "/grace";

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const source = params.get("utm_source")?.toLowerCase();
        const medium = params.get("utm_medium")?.toLowerCase();
        const adVisit = params.has("fbclid") || (
            ["meta", "facebook", "instagram", "fb", "ig"].includes(source || "") &&
            ["paid_social", "paid", "cpc", "ppc"].includes(medium || "")
        );
        setFromAd(adVisit);
        // Meta's SDK persists across client navigation. Unload it with a full
        // navigation when leaving an eligible ad landing page.
        if ((!releasePage || !adVisit) && window.fbq) {
            window.fbq("consent", "revoke");
            window.location.reload();
        }
    }, [pathname, releasePage]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const currentAdVisit = params.has("fbclid") || (
            ["meta", "facebook", "instagram", "fb", "ig"].includes(params.get("utm_source")?.toLowerCase() || "") &&
            ["paid_social", "paid", "cpc", "ppc"].includes(params.get("utm_medium")?.toLowerCase() || "")
        );
        if (!enabled || !releasePage || !fromAd || !currentAdVisit || !pixelId) return;
        if (!window.fbq) {
            const fbq = function (...args: unknown[]) {
                if (fbq.callMethod) fbq.callMethod(...args);
                else fbq.queue.push(args);
            } as Pixel;
            fbq.queue = [];
            fbq.push = fbq;
            fbq.loaded = true;
            fbq.version = "2.0";
            window.fbq = window._fbq = fbq;
            fbq("consent", "grant");
            fbq("set", "autoConfig", false, pixelId);
            fbq("init", pixelId);
            const script = document.createElement("script");
            script.id = "limestone-meta-pixel";
            script.async = true;
            script.src = "https://connect.facebook.net/en_US/fbevents.js";
            document.head.appendChild(script);
        }
        if (lastTrackedPath.current !== pathname) {
            window.fbq("track", "PageView");
            lastTrackedPath.current = pathname;
        }

        const handleClick = (event: MouseEvent) => {
            const anchor = event.target instanceof Element ? event.target.closest("a") : null;
            if (!anchor) return;
            const url = new URL(anchor.href);
            const platforms: Record<string, string> = {
                "open.spotify.com": "Spotify", "music.apple.com": "Apple Music",
                "link.deezer.com": "Deezer", "www.deezer.com": "Deezer",
                "youtu.be": "YouTube", "www.youtube.com": "YouTube",
                "itunes.apple.com": "iTunes",
            };
            const platform = platforms[url.hostname];
            if (!platform) return;
            // Artist/social links aren't release-streaming conversions.
            if (url.pathname.includes("/artist/") || url.pathname.includes("/@")) return;
            const release = pathname === "/mothers-daughter" ? "Mother's Daughter"
                : pathname === "/grace" ? "Grace" : null;
            if (!release) return;
            window.fbq?.("trackCustom", "StreamingLinkClick", { release, platform, page: pathname });
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [enabled, pathname, releasePage, fromAd]);

    return null;
}

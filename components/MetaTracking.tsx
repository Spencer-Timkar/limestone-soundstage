"use client";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";
import { createReleaseTracker, dispatchReleaseEvent, isMetaAd, releaseFor, type ReleaseEvent } from "@/lib/releaseTracking";

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
type Pixel = ((...args: unknown[]) => void) & { queue: unknown[][]; callMethod?: (...args: unknown[]) => void; push?: Pixel; loaded?: boolean; version?: string };
declare global { interface Window { fbq?: Pixel; _fbq?: Pixel } }
let tracker: ReturnType<typeof createReleaseTracker> | undefined;
function getTracker() {
    if (!tracker) {
        let storage: Storage | undefined;
        try { storage = window.sessionStorage; } catch { /* Use memory when storage is blocked. */ }
        tracker = createReleaseTracker(storage);
    }
    return tracker;
}
function send(event: ReleaseEvent | null, metaEnabled: boolean) {
    if (!event) return;
    dispatchReleaseEvent(event, track, metaEnabled ? (name, data, options) => window.fbq?.("trackCustom", name, data, options) : undefined);
}
export default function MetaTracking() {
    const pathname = usePathname();
    const query = useSearchParams().toString();
    const lastPageView = useRef<string | null>(null);
    useEffect(() => {
        const search = query ? `?${query}` : "";
        const pageViewKey = `${pathname}?${query}`;
        const releasePage = Boolean(releaseFor(pathname));
        const metaEnabled = Boolean(pixelId && /^\d+$/.test(pixelId) && releasePage && isMetaAd(search));
        if (!metaEnabled && window.fbq) {
            window.fbq("consent", "revoke");
            window.location.reload();
            return;
        }
        if (!releasePage) return;
        if (metaEnabled && !window.fbq) {
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
        if (metaEnabled && lastPageView.current !== pageViewKey) {
            window.fbq?.("track", "PageView");
            lastPageView.current = pageViewKey;
        }
        send(getTracker().landing(pathname, search), metaEnabled);
        const handleClick = (event: MouseEvent) => {
            const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[data-music-platform]") : null;
            const platform = anchor?.dataset.musicPlatform;
            if (!anchor || !platform) return;
            send(getTracker().landing(pathname, window.location.search), metaEnabled);
            send(getTracker().click(pathname, window.location.search, platform, anchor.dataset.musicKind === "channel"), metaEnabled);
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [pathname, query]);
    return null;
}

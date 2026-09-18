"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const consentKey = "limestone-meta-consent-v1";
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
    const [consent, setConsent] = useState<string | null>(null);
    const [ready, setReady] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const lastTrackedPath = useRef<string | null>(null);
    const enabled = Boolean(pixelId && /^\d+$/.test(pixelId));

    useEffect(() => {
        try {
            const saved = localStorage.getItem(consentKey);
            setConsent(saved === "accepted" || saved === "declined" ? saved : null);
        } catch { /* Ask again if storage is unavailable. */ }
        setReady(true);
    }, []);

    useEffect(() => {
        if (!enabled || consent !== "accepted" || !pixelId) return;
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
                : pathname === "/grace" ? "Grace"
                : pathname === "/limestone" || anchor.closest("#ep") ? "Limestone EP" : null;
            if (!release) return;
            window.fbq?.("trackCustom", "StreamingLinkClick", { release, platform, page: pathname });
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [consent, enabled, pathname]);

    function choose(value: "accepted" | "declined") {
        try { localStorage.setItem(consentKey, value); } catch { /* Still honor the choice for this visit. */ }
        if (value === "declined" && consent === "accepted") {
            window.fbq?.("consent", "revoke");
            // Reload to remove the already-loaded advertising SDK entirely.
            window.location.reload();
            return;
        }
        setConsent(value);
        setSettingsOpen(false);
    }

    if (!enabled || !ready) return null;
    return <>
        <button type="button" onClick={() => setSettingsOpen(true)} className="fixed bottom-3 left-3 z-50 rounded bg-black/90 px-3 py-2 text-xs text-white border border-white/30">Ad privacy settings</button>
        {(!consent || settingsOpen) && <section aria-label="Advertising privacy preferences" className="fixed bottom-14 left-3 right-3 z-50 mx-auto max-w-lg rounded-xl border border-white/30 bg-zinc-950 p-5 text-white shadow-xl">
            <p className="font-semibold mb-2">Optional advertising tracking</p>
            <p className="text-sm text-zinc-300">With your permission, Meta receives page visits and streaming-link clicks to measure our Facebook and Instagram ads and support remarketing. Declining won’t affect the site. <Link href="/privacy" className="underline">Privacy details</Link></p>
            <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => choose("declined")} className="rounded border border-white px-4 py-2">Decline</button>
                <button type="button" onClick={() => choose("accepted")} className="rounded border border-white px-4 py-2">Accept</button>
            </div>
        </section>}
    </>;
}

export const VISIT_TIMEOUT = 30 * 60 * 1000;
export const STORAGE_KEY = "limestone-release-visit-v2";
const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "campaign_id", "adset_id", "ad_id"] as const;
type Attribution = Partial<Record<typeof KEYS[number], string>>;
type Visit = { version: 2; lastActivity: number; attribution: Attribution; seen: string[]; startedAt: Record<string, number> };
type Store = Pick<Storage, "getItem" | "setItem">;
export type ReleaseEvent = { name: "ReleaseLanding" | "StreamingLinkClick" | "MusicChannelClick"; data: Record<string, string | number>; id: string };
export function dispatchReleaseEvent(event: ReleaseEvent | null,
    analytics: (name: string, data: ReleaseEvent["data"]) => void,
    meta?: (name: string, data: ReleaseEvent["data"], options: { eventID: string }) => void) {
    if (!event) return;
    try { analytics(event.name === "StreamingLinkClick" ? "Hyperfollow Conversion" : event.name, event.data); } catch { /* One destination failing must not block the other. */ }
    try { meta?.(event.name, event.data, { eventID: event.id }); } catch { /* Music navigation remains usable. */ }
}
export function isMetaAd(search: string) {
    const p = new URLSearchParams(search);
    return p.has("fbclid") || (["meta", "facebook", "instagram", "fb", "ig"].includes(p.get("utm_source")?.toLowerCase() || "") && ["paid_social", "paid", "cpc", "ppc"].includes(p.get("utm_medium")?.toLowerCase() || ""));
}
export function attributionFrom(search: string): Attribution {
    const p = new URLSearchParams(search);
    const result: Attribution = {};
    for (const key of KEYS) {
        const value = p.get(key)?.trim().slice(0, 200);
        if (value) result[key] = value;
    }
    return result;
}
export function releaseFor(path: string) {
    return path === "/mothers-daughter" ? "Mother's Daughter" : path === "/grace" ? "Grace" : null;
}
// Session storage survives reloads in one tab. Memory handles unavailable storage.
export function createReleaseTracker(store?: Store, now = () => Date.now(), uuid = () => crypto.randomUUID()) {
    let memory: Visit | undefined;
    function visit(search: string): Visit {
        let current = memory;
        if (!current) try {
            const parsed = JSON.parse(store?.getItem(STORAGE_KEY) || "null");
            if (parsed?.version === 2 && Number.isFinite(parsed.lastActivity) &&
                parsed.attribution && typeof parsed.attribution === "object" &&
                Object.values(parsed.attribution).every(v => typeof v === "string") &&
                Array.isArray(parsed.seen) && parsed.seen.every((v: unknown) => typeof v === "string") &&
                parsed.startedAt && typeof parsed.startedAt === "object" &&
                Object.values(parsed.startedAt).every(v => typeof v === "number" && Number.isFinite(v))) current = parsed;
        } catch { /* Unavailable storage or an old value. */ }
        const incoming = attributionFrom(search);
        const changedAd = Object.keys(incoming).length > 0 && JSON.stringify(incoming) !== JSON.stringify(current?.attribution);
        if (!current || now() - current.lastActivity >= VISIT_TIMEOUT || changedAd) current = { version: 2, lastActivity: now(), attribution: incoming, seen: [], startedAt: {} };
        current.lastActivity = now();
        memory = current;
        return current;
    }
    function save(current: Visit) {
        memory = current;
        try { store?.setItem(STORAGE_KEY, JSON.stringify(current)); } catch { /* Keep in-memory uniqueness. */ }
    }
    function event(name: ReleaseEvent["name"], page: string, search: string, platform?: string): ReleaseEvent | null {
        const release = releaseFor(page);
        if (!release) return null;
        const current = visit(search);
        const key = `${page}:${name}`;
        if (current.seen.includes(key)) { save(current); return null; }
        current.seen.push(key);
        current.startedAt[page] ??= now();
        const data: Record<string, string | number> = { ...current.attribution, source: current.attribution.utm_source || "direct", release, page, tracking_version: 2 };
        if (platform) {
            data.platform = platform;
            data.seconds_to_click = Math.max(0, Math.round((now() - current.startedAt[page]) / 1000));
        }
        save(current);
        return { name, data, id: uuid() };
    }
    return {
        landing: (page: string, search: string) => event("ReleaseLanding", page, search),
        click: (page: string, search: string, platform: string, channel = false) => event(channel ? "MusicChannelClick" : "StreamingLinkClick", page, search, platform),
    };
}

"use client";
import { useState } from "react";
import { createReleaseTracker, dispatchReleaseEvent } from "@/lib/releaseTracking";

export default function TrackingReview() {
    const [rows, setRows] = useState<{ action: string; analytics: string; meta: string; details: string }[]>([]);
    function run() {
        const map = new Map<string, string>();
        let time = 1000, sequence = 0;
        const storage = { getItem: (key: string) => map.get(key) || null, setItem: (key: string, value: string) => { map.set(key, value); } };
        const make = () => createReleaseTracker(storage, () => time, () => `example-${++sequence}`);
        let tracker = make();
        const query = "?utm_source=meta&utm_medium=paid_social&utm_campaign=mothers_daughter&utm_content=v1_stan_lee&ad_id=123";
        const result: typeof rows = [];
        function record(action: string, event: ReturnType<typeof tracker.landing>) {
            let analytics = "No additional event", meta = "No additional event";
            dispatchReleaseEvent(event, name => { analytics = name; }, name => { meta = name; });
            result.push({ action, analytics, meta, details: event ? JSON.stringify(event.data, null, 2) : "Repeat suppressed" });
        }
        record("Arrive from the Stan Lee ad", tracker.landing("/mothers-daughter", query));
        time += 5000;
        record("Tap TIDAL", tracker.click("/mothers-daughter", query, "TIDAL"));
        record("Tap TIDAL again", tracker.click("/mothers-daughter", query, "TIDAL"));
        record("Then tap Amazon Music", tracker.click("/mothers-daughter", query, "Amazon Music"));
        tracker = make();
        record("Reload the same page", tracker.landing("/mothers-daughter", query));
        const other = query.replace("v1_stan_lee", "amazon_example").replace("ad_id=123", "ad_id=456");
        record("Arrive from a different ad", tracker.landing("/mothers-daughter", other));
        record("Choose Amazon Music on that visit", tracker.click("/mothers-daughter", other, "Amazon Music"));
        record("Open Grace", tracker.landing("/grace", other));
        record("Tap Grace’s YouTube Music song link", tracker.click("/grace", other, "YouTube Music"));
        setRows(result);
    }
    return <main className="mx-auto max-w-5xl px-5 py-10 text-white">
        <h1 className="text-3xl font-bold">Release tracking review</h1>
        <p className="mt-3 text-zinc-300">Local demonstration. Uses the same tracking logic as both release pages. Sends no events to Meta or Vercel.</p>
        <p className="mt-3 text-zinc-300">One landing and one streaming conversion per release, per visit. A new ad or 30 minutes between tracked actions starts a new visit.</p>
        <button onClick={run} className="my-6 rounded-lg bg-white px-5 py-3 font-semibold text-black">Run example visit</button>
        <div aria-live="polite" className="space-y-3">{rows.map((row, i) => <section key={i} className="rounded-lg border border-white/20 p-4">
            <h2 className="font-semibold">{row.action}</h2>
            <p className="mt-2 text-zinc-300">Vercel: {row.analytics}</p><p className="text-zinc-300">Meta: {row.meta}</p>
            <details className="mt-2"><summary>Event details</summary><pre className="mt-2 whitespace-pre-wrap break-words text-sm">{row.details}</pre></details>
        </section>)}</div>
    </main>;
}

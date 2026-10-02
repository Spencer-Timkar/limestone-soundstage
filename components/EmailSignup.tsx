"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { track } from "@vercel/analytics";

type EmailSignupProps = {
    page: string;
};

type SubmissionState = "idle" | "submitting" | "success" | "error";

export default function EmailSignup({ page }: EmailSignupProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<SubmissionState>("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("submitting");
        setMessage("");

        const formData = new FormData(event.currentTarget);
        const urlParams = new URLSearchParams(window.location.search);
        const source = urlParams.get("utm_source") || "direct";

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    page,
                    source,
                    website: formData.get("website"),
                }),
            });

            const result = (await response.json()) as { message?: string };

            if (!response.ok) {
                throw new Error(result.message || "We couldn't add you right now. Please try again.");
            }

            setStatus("success");
            setMessage("You're on the list. Thanks for joining!");
            setEmail("");
            track("Email List Signup", { page, source });
        } catch (error) {
            setStatus("error");
            setMessage(error instanceof Error ? error.message : "We couldn't add you right now. Please try again.");
        }
    };

    return (
        <section className="w-full px-4 py-8 md:px-6" aria-labelledby={`email-signup-${page}`}>
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/15 bg-zinc-950/80 px-5 py-7 text-center shadow-2xl backdrop-blur-md md:px-9 md:py-9">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-red-400">
                    Stay in the loop
                </p>
                <h2 id={`email-signup-${page}`} className="text-2xl font-black uppercase tracking-wide text-white md:text-3xl">
                    Join our Email List!
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-400 md:text-base">
                    Get new music, upcoming shows, and Limestone updates in your inbox.
                </p>

                {status === "success" ? (
                    <p className="mt-6 rounded-xl border border-green-400/30 bg-green-400/10 px-4 py-3 font-semibold text-green-300" role="status">
                        {message}
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-xl">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <label htmlFor={`email-${page}`} className="sr-only">Email address</label>
                            <input
                                id={`email-${page}`}
                                type="email"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                autoComplete="email"
                                placeholder="Email address"
                                required
                                disabled={status === "submitting"}
                                className="min-w-0 flex-1 rounded-full border border-white/20 bg-black/70 px-5 py-3.5 text-base text-white outline-none transition placeholder:text-zinc-600 focus:border-white/60 focus:ring-2 focus:ring-white/10 disabled:opacity-60"
                            />
                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="rounded-full bg-white px-7 py-3.5 text-sm font-black uppercase tracking-wider text-black transition hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-wait disabled:opacity-60"
                            >
                                {status === "submitting" ? "Joining…" : "Join the list"}
                            </button>
                        </div>

                        <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
                            <label htmlFor={`website-${page}`}>Website</label>
                            <input id={`website-${page}`} type="text" name="website" tabIndex={-1} autoComplete="off" />
                        </div>

                        <p className="mt-3 text-xs leading-relaxed text-zinc-600">
                            By joining, you agree to receive emails from Limestone. Unsubscribe anytime. See our{" "}
                            <Link href="/privacy" className="underline decoration-zinc-700 underline-offset-2 hover:text-zinc-400">
                                privacy information
                            </Link>.
                        </p>

                        {status === "error" && (
                            <p className="mt-3 text-sm font-medium text-red-400" role="alert">
                                {message}
                            </p>
                        )}
                    </form>
                )}
            </div>
        </section>
    );
}

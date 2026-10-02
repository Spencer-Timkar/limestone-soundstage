"use client";

import { FormEvent, useRef, useState } from "react";
import { track } from "@vercel/analytics";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export default function ShowEmailPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<SubmissionState>("idle");
    const [message, setMessage] = useState("");
    const emailInput = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("submitting");
        setMessage("");

        const formData = new FormData(event.currentTarget);

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    page: "showemail",
                    source: "Live Show",
                    website: formData.get("website"),
                }),
            });

            const result = (await response.json()) as { message?: string };

            if (!response.ok) {
                throw new Error(result.message || "We couldn't add that email. Please try again.");
            }

            setEmail("");
            setStatus("success");
            setMessage("Added to the list!");
            track("Email List Signup", { page: "showemail", source: "Live Show" });
            emailInput.current?.focus();
        } catch (error) {
            setStatus("error");
            setMessage(error instanceof Error ? error.message : "We couldn't add that email. Please try again.");
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-black px-5 text-white">
            <form onSubmit={handleSubmit} className="w-full max-w-xl">
                <div className="flex flex-col gap-3 sm:flex-row">
                    <label htmlFor="show-email" className="sr-only">Email address</label>
                    <input
                        ref={emailInput}
                        id="show-email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                            if (status !== "idle") {
                                setStatus("idle");
                                setMessage("");
                            }
                        }}
                        autoComplete="email"
                        autoCapitalize="none"
                        inputMode="email"
                        placeholder="Email address"
                        required
                        autoFocus
                        disabled={status === "submitting"}
                        className="min-w-0 flex-1 rounded-full border border-white/25 bg-zinc-950 px-6 py-4 text-lg text-white outline-none transition placeholder:text-zinc-600 focus:border-white focus:ring-2 focus:ring-white/15 disabled:opacity-60"
                    />
                    <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="rounded-full bg-white px-8 py-4 text-base font-black uppercase tracking-wider text-black transition hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-wait disabled:opacity-60"
                    >
                        {status === "submitting" ? "Adding…" : "Join"}
                    </button>
                </div>

                <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="show-website">Website</label>
                    <input id="show-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                {message && (
                    <p
                        className={`mt-4 text-center text-sm font-semibold ${status === "success" ? "text-green-400" : "text-red-400"}`}
                        role={status === "error" ? "alert" : "status"}
                    >
                        {message}
                    </p>
                )}
            </form>
        </main>
    );
}

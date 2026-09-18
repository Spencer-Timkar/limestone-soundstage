"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Share2, Check, Instagram, Youtube, Music, Radio } from "lucide-react";
import { track } from "@vercel/analytics";

export default function MothersDaughterHyperfollowPage() {
    const [copied, setCopied] = useState(false);
    const iframeWrapperRef = useRef<HTMLDivElement>(null);

    // Track iframe interactions (when user clicks play on embedded player)
    useEffect(() => {
        const handleBlur = () => {
            if (document.activeElement?.tagName === "IFRAME") {
                track("Player Interaction", {
                    release: "Mother’s Daughter",
                    type: "Spotify Embed",
                    page: "/mothers-daughter",
                });
            }
        };
        window.addEventListener("blur", handleBlur);
        return () => window.removeEventListener("blur", handleBlur);
    }, []);

    const handleShare = () => {
        track("Hyperfollow Share", { release: "Mother’s Daughter", page: "/mothers-daughter" });
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handlePlatformClick = (platformName: string, platformUrl: string) => {
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get("utm_source") || "direct";

        track("Hyperfollow Conversion", {
            release: "Mother’s Daughter",
            platform: platformName,
            destination: platformUrl,
            source: utmSource,
            page: "/mothers-daughter",
        });
    };

    const streamingPlatforms = [
        {
            name: "Spotify",
            action: "Play",
            url: "https://open.spotify.com/album/0TN7dJi171h0S8gWcgTGoE",
            icon: (
                <svg className="w-6 h-6 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
            ),
        },
        {
            name: "Apple Music",
            action: "Stream",
            url: "https://music.apple.com/us/album/mothers-daughter-single/6809105687",
            icon: (
<Image src="/images/apple-music-icon.svg" alt="" width={24} height={24} className="w-6 h-6 shrink-0" />
            ),
        },
        {
            name: "Deezer",
            action: "Stream",
            url: "https://link.deezer.com/s/34qNaXVaNjAruiMQy5EaQ",
            icon: <Radio className="w-6 h-6 text-[#FEAA2D]" />,
        },
        {
            name: "YouTube",
            action: "Watch",
            url: "https://youtu.be/r8OeErusPYs",
            icon: <Youtube className="w-6 h-6 text-[#FF0000]" />,
        },
    ];

    return (
        <main className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/mothers_daughter_cover.jpg"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover opacity-50 blur-sm scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black z-0" />
            </div>

            {/* Top Navigation */}
            <header className="relative z-20 container mx-auto px-6 py-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-semibold">limestone.band</span>
                </Link>

                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all text-xs uppercase tracking-wider font-medium text-zinc-300 hover:text-white"
                    aria-label="Share release"
                >
                    {copied ? (
                        <>
                            <Check size={14} className="text-green-400" />
                            <span className="text-green-400">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Share2 size={14} />
                            <span>Share</span>
                        </>
                    )}
                </button>
            </header>

            {/* Main Hyperfollow Container */}
            <section className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center max-w-md">
                {/* Artwork */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-6 group"
                >
                    <Image
                        src="/images/mothers_daughter_cover.jpg"
                        alt="Mother’s Daughter by Limestone"
                        fill
                        sizes="(min-width: 768px) 288px, 256px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                    />
                </motion.div>

                {/* Track Info */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-center mb-6"
                >
                    <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold mb-1 block">
                        New Single Out Now
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-white mb-2 drop-shadow-md">
                        Mother&apos;s Daughter
                    </h1>
                    <p className="text-base md:text-lg font-medium text-zinc-300 tracking-wide">
                        Limestone
                    </p>
                </motion.div>

                {/* Spotify Audio Preview Player */}
                <motion.div
                    ref={iframeWrapperRef}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full mb-6 rounded-2xl overflow-hidden shadow-xl bg-black/60 backdrop-blur-xl border border-white/15 p-2"
                >
                    <iframe
                        data-testid="embed-iframe"
                        style={{ borderRadius: "12px" }}
                        src="https://open.spotify.com/embed/album/0TN7dJi171h0S8gWcgTGoE?utm_source=generator&theme=0"
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Mother’s Daughter Preview"
                    />
                </motion.div>

                {/* Platform Links List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-full space-y-3 mb-8"
                >
                    {streamingPlatforms.map((platform) => (
                        <a
                            key={platform.name}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handlePlatformClick(platform.name, platform.url)}
                            className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-white/30 transition-all duration-300 group backdrop-blur-md shadow-lg"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-black/50 group-hover:scale-110 transition-transform">
                                    {platform.icon}
                                </div>
                                <span className="font-semibold text-zinc-200 group-hover:text-white text-base">
                                    {platform.name}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 group-hover:bg-white text-zinc-200 group-hover:text-black transition-all duration-300 font-bold text-xs uppercase tracking-wider">
                                <span>{platform.action}</span>
                                <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </a>
                    ))}
                </motion.div>

                {/* Social Footer Icons */}
                <div className="flex items-center gap-6 pt-4 border-t border-white/10 w-full justify-center">
                    <a
                        href="https://www.instagram.com/limestone.music/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("Social Link Click", { platform: "Instagram", page: "/mothers-daughter" })}
                        className="text-zinc-400 hover:text-white transition-colors transform hover:scale-110"
                        aria-label="Instagram"
                    >
                        <Instagram size={22} />
                    </a>
                    <a
                        href="https://www.tiktok.com/@limestone.music"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("Social Link Click", { platform: "TikTok", page: "/mothers-daughter" })}
                        className="text-zinc-400 hover:text-white transition-colors transform hover:scale-110"
                        aria-label="TikTok"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                        >
                            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                        </svg>
                    </a>
                    <a
                        href="https://www.youtube.com/@Limestone_music"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("Social Link Click", { platform: "YouTube", page: "/mothers-daughter" })}
                        className="text-zinc-400 hover:text-white transition-colors transform hover:scale-110"
                        aria-label="YouTube"
                    >
                        <Youtube size={22} />
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-6 text-center text-xs text-zinc-500 uppercase tracking-widest border-t border-white/5">
                © {new Date().getFullYear()} Limestone • All Rights Reserved
            </footer>
        </main>
    );
}

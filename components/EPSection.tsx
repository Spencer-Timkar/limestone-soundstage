"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { track as trackAnalytics } from "@vercel/analytics";

export default function EPSection() {
    const tracks = [
        { title: "Magic Tricks", id: "3VY4Xiv9wSDyf8dg7odMeU" },
        { title: "Sedona", id: "0X6zQIdc1MlPBEBlglitHj" },
        { title: "Venomous", id: "0lep6fkjOLyak9wvwkVpYx" },
        { title: "Starving", id: "77H2Bx13YzJcnA7mdAVa2G" },
        { title: "Growing Down", id: "6t6pdFx4NOJYGIR8hSSjTL" },
    ];

    // Track when users interact with any of the embedded song players
    useEffect(() => {
        const handleBlur = () => {
            if (document.activeElement?.tagName === "IFRAME") {
                trackAnalytics("Player Interaction", {
                    release: "Limestone EP",
                    type: "Homepage EP Track Player",
                    location: "Homepage EP Section",
                });
            }
        };
        window.addEventListener("blur", handleBlur);
        return () => window.removeEventListener("blur", handleBlur);
    }, []);

    return (
        <section id="ep" className="relative py-16 md:py-20 bg-transparent text-white overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/LSEPwebbackgeound.webp"
                    alt="Limestone Soundstage Background"
                    fill
                    className="object-cover opacity-60"
                />
            </div>

            {/* Top fade */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-0" />
            
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-0" />

            <div className="relative z-10 container mx-auto px-6 max-w-4xl">
                {/* EP Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 mb-8 pt-4"
                >
                    <div className="relative w-44 h-44 md:w-56 md:h-56 shrink-0 shadow-2xl rounded-md overflow-hidden">
                        <Image
                            src="/images/LSEPcover12_21 copy.webp"
                            alt="Limestone EP Cover"
                            fill
                            className="object-cover"
                        />
                    </div>
                    
                    <div className="flex flex-col text-center md:text-left">
                        <span className="text-xs md:text-sm font-medium tracking-widest uppercase mb-1 drop-shadow-md text-zinc-300">EP</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-3 drop-shadow-lg">
                            Limestone
                        </h2>
                        
                        <div className="flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm font-medium drop-shadow-md text-zinc-300">
                            <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0">
                                <Image
                                    src="/images/hero_high_res.webp"
                                    alt="Limestone Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span>Limestone • 2026 • 5 songs, 24 min 41 sec</span>
                        </div>
                    </div>
                </motion.div>

                {/* Platform Links */}
                <div className="flex justify-center md:justify-start gap-3 mb-8 flex-wrap items-center">
                    <a
                        href="https://open.spotify.com/artist/60Ms8qhGHWJAeZgbOA6Dyq?si=ZoLlYJSpRRuZ7fCmb-fFFQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAnalytics("Artist Profile Click", { platform: "Spotify", location: "Homepage EP Section" })}
                        className="flex items-center gap-2 px-5 py-2.5 border border-zinc-700/50 rounded-full bg-black/40 hover:bg-zinc-800/80 hover:border-zinc-500 transition-all duration-300 backdrop-blur-md group text-xs md:text-sm"
                    >
                        <svg className="w-4 h-4 text-[#1DB954] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
                        <span className="tracking-wider font-medium text-zinc-300 group-hover:text-white">Spotify</span>
                    </a>
                    <a
                        href="https://music.apple.com/us/artist/limestone/1820102301"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAnalytics("Artist Profile Click", { platform: "Apple Music", location: "Homepage EP Section" })}
                        className="flex items-center gap-2 px-5 py-2.5 border border-zinc-700/50 rounded-full bg-black/40 hover:bg-zinc-800/80 hover:border-zinc-500 transition-all duration-300 backdrop-blur-md group text-xs md:text-sm"
                    >
<Image src="/images/apple-music-icon.svg" alt="" width={24} height={24} className="w-6 h-6 shrink-0" />
                        <span className="tracking-wider font-medium text-zinc-300 group-hover:text-white">Apple Music</span>
                    </a>
                    <Link
                        href="/limestone"
                        onClick={() => trackAnalytics("Click Hyperfollow Button", { release: "Limestone EP", location: "Homepage EP Section" })}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-all font-bold text-xs uppercase tracking-widest shadow-lg group"
                    >
                        <span>All Streaming Links</span>
                        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </Link>
                </div>

                {/* Track List - Compact 152px Horizontal Players */}
                <div className="flex flex-col gap-3">
                    {tracks.map((track) => (
                        <motion.div 
                            key={track.title} 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="w-full rounded-xl bg-black/50 shadow-lg backdrop-blur-sm overflow-hidden"
                        >
                            <iframe
                                data-testid="embed-iframe"
                                style={{ borderRadius: "12px" }}
                                src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
                                width="100%"
                                height="152"
                                frameBorder="0"
                                allowFullScreen
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                title={track.title}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

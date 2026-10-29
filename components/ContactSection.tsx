"use client";

import { motion } from "framer-motion";
import { Instagram, Youtube } from "lucide-react";

export default function ContactSection() {
    return (
        <section id="contact" className="pt-8 pb-2 md:pt-24 md:pb-8 bg-transparent text-white relative border-t border-white/10">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold uppercase tracking-widest mb-12"
                >
                    Contact Us
                </motion.h2>

                <div className="flex flex-col items-center gap-8">
                    <p className="text-zinc-400 text-lg uppercase tracking-wider">
                        (we will respond)
                    </p>

                    <a
                        href="mailto:official.limestone.band@gmail.com"
                        className="max-w-full break-words [overflow-wrap:anywhere] text-xl sm:text-2xl md:text-3xl font-bold hover:text-zinc-300 transition-colors"
                    >
                        official.limestone.band<wbr />@gmail.com
                    </a>

                    <div className="flex gap-8 mt-8">
                        <a aria-label="Instagram" href="https://www.instagram.com/limestone.music/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors transform hover:scale-110">
                            <Instagram size={32} />
                        </a>
                        <a aria-label="TikTok" href="https://www.tiktok.com/@limestone.music" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors transform hover:scale-110">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-8 h-8"
                            >
                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                            </svg>
                        </a>
                        <a aria-label="YouTube" href="https://www.youtube.com/@Limestone_music" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors transform hover:scale-110">
                            <Youtube size={32} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

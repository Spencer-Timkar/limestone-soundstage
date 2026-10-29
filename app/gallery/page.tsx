"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Instagram, Youtube } from "lucide-react";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import FanGallerySection from "@/components/FanGallerySection";

export default function GalleryPage() {
    return (
        <main className="relative bg-black min-h-screen">
            {/* Custom Header */}
            <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-4 md:p-6">
                <div className="w-full flex justify-between items-start">
                    {/* Left: Back Button */}
                    <div className="pointer-events-auto z-50">
                        <Link href="/" aria-label="Back to homepage" className="text-white hover:text-zinc-300 transition-colors flex items-center gap-2 group">
                            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="uppercase tracking-widest font-bold hidden sm:block">Back</span>
                        </Link>
                    </div>

                    {/* Right: Social Icons */}
                    <div className="flex gap-4 pointer-events-auto z-50">
                        <a aria-label="Instagram" href="https://www.instagram.com/limestone.music/" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors transform hover:scale-110">
                            <Instagram size={24} />
                        </a>
                        <a aria-label="TikTok" href="https://www.tiktok.com/@limestone.music" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors transform hover:scale-110">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-6 h-6"
                            >
                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                            </svg>
                        </a>
                        <a aria-label="YouTube" href="https://www.youtube.com/@Limestone_music" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors transform hover:scale-110">
                            <Youtube size={24} />
                        </a>
                    </div>
                </div>
            </header>

            {/* Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <StarBackground className="opacity-100" starClassName="top-[130vh] -translate-y-1/2" />
            </div>

            <div className="relative z-10 pt-32 pb-12 flex justify-center">
                <Link href="/">
                    <Image
                        src="/images/limestone_text_logo.webp"
                        alt="Limestone Logo"
                        width={1024}
                        height={216}
                        className="w-[300px] md:w-[500px] h-auto object-contain drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity"
                        priority
                    />
                </Link>
            </div>

            <div className="relative z-10">
                <FanGallerySection />
            </div>

            <div className="relative z-10">
                <Footer />
            </div>
        </main>
    );
}

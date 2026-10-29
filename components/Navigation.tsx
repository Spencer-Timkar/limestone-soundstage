"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Instagram, Youtube } from "lucide-react";

// ... (inside component)



// ... (in JSX)


import Image from "next/image";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuDialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = menuDialog.current;
        if (!isOpen || !dialog) return;
        const previousOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = "hidden";
        const desktop = window.matchMedia("(min-width: 1024px)");
        const closeOnDesktop = () => { if (desktop.matches) dialog.close(); };
        desktop.addEventListener("change", closeOnDesktop);
        return () => {
            desktop.removeEventListener("change", closeOnDesktop);
            dialog.close();
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Music", href: "#music" },
        { name: "EP", href: "#ep" },
        { name: "Shows", href: "#tour" },
        { name: "Gallery", href: "/gallery" },
        { name: "About", href: "#about" },
        { name: "Merch", href: "#merch", external: false },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? "py-8" : "py-12 md:py-20"
                }`}
        >
            {/* Background Layer 1: Gradient (visible when not scrolled) */}
            <div
                className={`absolute inset-0 bg-gradient-to-b from-black via-black/90 to-transparent transition-opacity duration-500 ease-in-out ${scrolled ? "opacity-0" : "opacity-100"
                    }`}
            />

            {/* Background Layer 2: Solid with blur (visible when scrolled) */}
            <div
                className={`absolute inset-0 bg-black/75 backdrop-blur-xl transition-opacity duration-500 ease-in-out ${scrolled ? "opacity-100" : "opacity-0"
                    }`}
            />

            <div
                className={`relative container mx-auto px-6 grid grid-cols-2 items-center ${scrolled
                    ? "lg:grid-cols-[1fr_210px_1fr]"
                    : "lg:grid-cols-[1fr_420px_1fr]"
                    }`}
            >
                {/* LEFT: Navigation Links */}
                <div
                    className={`hidden lg:flex items-center gap-6 transition-all duration-500 ease-in-out absolute left-1/2 -translate-x-1/2 justify-center ${scrolled
                        ? "left-1/6"
                        : "-translate-y-14"
                        }`}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noopener noreferrer" : undefined}
                            className="text-xs lg:text-sm uppercase tracking-[0.2em] text-zinc-300 hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* CENTER: Logo */}
                {/* CENTER: Logo Placeholder (Keeps layout balanced) */}
                <div className="hidden lg:block" />

                {/* Absolute Floating Logo */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none mt-0">
                    <Link href="/" className="pointer-events-auto block transition-all duration-500 group">
                        <div
                            className={`relative transition-all duration-500 origin-center ${scrolled
                                ? "w-[clamp(105px,20vw,210px)]"
                                : "w-[clamp(160px,50vw,450px)] translate-y-8 md:translate-y-12"
                                }`}
                        >
                            <Image
                                src="/images/limestone_text_logo.webp"
                                alt="Limestone Logo"
                                width={1024}
                                height={216}
                                className="object-contain w-full h-auto drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* RIGHT: Social Icons */}
                <div className={`absolute right-12 hidden lg:flex items-center gap-6 justify-end transition-all duration-500 ease-in-out

                    ${scrolled ? "translate-y-0" : "-translate-y-14"}
                `}>
                    <a aria-label="Instagram" href="https://www.instagram.com/limestone.music/" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors transform hover:scale-110"><Instagram size={24} /></a>
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
                    <a aria-label="YouTube" href="https://www.youtube.com/@Limestone_music" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors transform hover:scale-110"><Youtube size={24} /></a>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex lg:hidden justify-end col-start-2">
                    <button
                        className="text-white p-2"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <dialog
                ref={menuDialog}
                id="mobile-navigation"
                aria-label="Navigation menu"
                onClose={() => setIsOpen(false)}
                onKeyDown={(event) => {
                    if (event.key !== "Tab") return;
                    const controls = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
                    const first = controls[0];
                    const last = controls[controls.length - 1];
                    if (event.shiftKey && document.activeElement === first) {
                        event.preventDefault();
                        last?.focus();
                    } else if (!event.shiftKey && document.activeElement === last) {
                        event.preventDefault();
                        first?.focus();
                    }
                }}
                className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-black/95 text-white backdrop:bg-black/80 p-8 overflow-y-auto"
            >
                <button type="button" onClick={() => menuDialog.current?.close()} className="ml-auto mb-8 flex p-3" aria-label="Close menu">
                    <X size={28} />
                </button>
                <div className="flex flex-col gap-8 text-center">
                    <div className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                onClick={() => setIsOpen(false)}
                                className="text-xl uppercase tracking-widest text-zinc-300 hover:text-white transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="w-12 h-px bg-white/20 mx-auto" />
                    <div className="flex justify-center gap-10">
                        <a aria-label="Instagram" href="https://www.instagram.com/limestone.music/" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white"><Instagram size={28} /></a>
                        <a aria-label="TikTok" href="https://www.tiktok.com/@limestone.music" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-7 h-7"
                            >
                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                            </svg>
                        </a>
                        <a aria-label="YouTube" href="https://www.youtube.com/@Limestone_music" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white"><Youtube size={28} /></a>
                    </div>
                </div>
            </dialog>
        </nav>
    );
}

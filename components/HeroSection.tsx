"use client";

import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center pb-32">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero_high_res.webp"
                    alt="Limestone Band"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />
            </div>

            {/* Content */}
            {/* Content removed as requested */}
            <h1 className="sr-only">Limestone — Alternative rock from Lawrence, Kansas</h1>

        </section>

    );
}

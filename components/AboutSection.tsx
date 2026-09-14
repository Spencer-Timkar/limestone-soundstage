"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <section id="about" className="py-16 md:py-24 bg-transparent text-white">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold uppercase tracking-widest mb-8"
                >
                    About
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="prose prose-invert mx-auto"
                >
                    <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
Limestone began in a Lawrence, Kansas basement in the winter of 2024. The five-piece makes alternative rock with a melodic pull and a heavy backbone, pairing emotionally direct songwriting with guitars and vocals that fill a room.

Fronted by Lizzie Scharpf, with Spencer Timkar and Max Lajoie on guitars, Andrew Kotch on bass, and Blake Amren on drums, Limestone brings that sound to life through performances built on energy and connection. In an early live review, The Pitch praised the band’s “polish and shine of scene veterans,” describing a crowd lined up outside the door.

Their 2026 self-titled EP and follow-up single “Grace” mark the first stretch of a band finding its voice, with Lawrence at the center of the story.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

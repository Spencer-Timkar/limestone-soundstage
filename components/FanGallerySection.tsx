"use client";
import { Mail, Camera } from 'lucide-react';
import Image from 'next/image';

import { galleryPhotos } from "@/data/galleryPhotos";

const FanGallerySection = () => {
    // Stable ordering avoids rearranging the gallery after hydration.
    const photos = galleryPhotos;

    return (
        <section id="gallery" className="relative min-h-screen py-24 text-white">
            {/* Header Container */}
            <div className="container mx-auto max-w-6xl px-6 mb-16">
                <div className="text-center">
                    <h1
                        className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-6"
                    >
                        Gallery
                    </h1>
                    <p
                        className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8"
                    >
                        We want to see your faces! Send us photos of you at our shows or rocking Limestone merch to be featured here.
                    </p>

                    <div>
                        <a
                            href="mailto:official.limestone.band@gmail.com?subject=Fan Photo Submission&body=Here is a photo for the Limestone Fan Gallery!"
                            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-zinc-200 transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                            Submit a Photo
                        </a>
                    </div>
                </div>
            </div>

            {/* Edge-to-Edge Gallery Grid */}
            <div className="w-full px-2">
                {photos.length > 0 ? (
                    <div className="columns-2 md:columns-4 lg:columns-5 gap-4 space-y-4">
                        {photos.map((photo) => (
                            <div
                                key={photo.src}
                                className="break-inside-avoid relative overflow-hidden rounded-xl"
                            >
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    className="w-full h-auto object-cover"
                                    width={photo.width}
                                    height={photo.height}
                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 border border-white/10 rounded-2xl bg-white/5">
                        <Camera className="w-16 h-16 text-zinc-600 mb-4" />
                        <p className="text-zinc-500 text-lg">No photos yet. Be the first to submit!</p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default FanGallerySection;

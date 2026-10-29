import type { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Gallery', description: 'Live photos and fan moments from Limestone shows.',
    alternates: { canonical: "/gallery" },
    openGraph: { title: 'Gallery' + " | Limestone", description: 'Live photos and fan moments from Limestone shows.', url: "/gallery", images: [{ url: '/images/hero_high_res.webp', alt: 'Gallery' }] },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

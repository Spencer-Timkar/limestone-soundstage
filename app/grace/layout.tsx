import type { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Grace', description: 'Listen to Grace by Limestone on your favorite music service.',
    alternates: { canonical: "/grace" },
    openGraph: { title: 'Grace' + " | Limestone", description: 'Listen to Grace by Limestone on your favorite music service.', url: "/grace", images: [{ url: '/images/grace_cover.webp', alt: 'Grace' }] },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

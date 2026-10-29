import type { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Limestone EP', description: 'Listen to Limestone’s debut five-track EP.',
    alternates: { canonical: "/limestone" },
    openGraph: { title: 'Limestone EP' + " | Limestone", description: 'Listen to Limestone’s debut five-track EP.', url: "/limestone", images: [{ url: '/images/LSEPcover12_21 copy.webp', alt: 'Limestone EP' }] },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

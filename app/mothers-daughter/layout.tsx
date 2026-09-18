import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mother's Daughter",
    description: "Listen to Mother's Daughter by Limestone on Spotify, Apple Music, Deezer, and YouTube.",
    openGraph: {
        title: "Mother's Daughter | Limestone",
        description: "Listen to the new single by Limestone.",
        url: "https://www.limestone.band/mothers-daughter",
        images: [{ url: "https://www.limestone.band/images/mothers_daughter_cover.jpg", width: 300, height: 300, alt: "Mother's Daughter by Limestone" }],
    },
};

export default function MothersDaughterLayout({ children }: { children: React.ReactNode }) {
    return children;
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import MotionPreferences from "@/components/MotionPreferences";
import MetaTracking from "@/components/MetaTracking";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.limestone.band"),
  openGraph: {
    title: "Limestone — The Official Site",
    description: "Music, shows, and photos from Limestone, an alternative rock band from Lawrence, Kansas.",
    images: [{ url: "/images/hero_high_res.webp", alt: "Limestone performing live" }],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  title: {
    default: "Limestone — The Official Site",
    template: "%s | Limestone",
  },
  description: "Alternative Rock Band from Lawrence, Kansas.",
  icons: {

    icon: "/images/star_cropped.webp",
    shortcut: "/images/star_cropped.webp",
    apple: "/images/star_cropped.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <MotionPreferences>{children}</MotionPreferences>
        <Analytics />
        <Suspense fallback={null}><MetaTracking /></Suspense>
        <SpeedInsights />
      </body>
    </html>
  );
}

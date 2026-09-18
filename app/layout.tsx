import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
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
        {children}
        <MetaTracking />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
export const metadata: Metadata = { title: 'Join our email list', robots: { index: false, follow: false } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

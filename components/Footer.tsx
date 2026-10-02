"use client";

import EmailSignup from "@/components/EmailSignup";

export default function Footer() {
    return (
        <footer className="py-8 bg-black text-zinc-500 text-sm">
            <div className="container mx-auto px-6 flex flex-col items-center gap-6">
                <EmailSignup page="homepage" />
                <div className="flex gap-6 uppercase tracking-widest text-xs">
                    <a href="https://www.instagram.com/limestone.music/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                    <a href="https://open.spotify.com/artist/60Ms8qhGHWJAeZgbOA6Dyq?si=ZoLlYJSpRRuZ7fCmb-fFFQ" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Spotify</a>
                    <a href="https://music.apple.com/us/artist/limestone/1820102301" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Apple Music</a>
                    <a href="https://www.youtube.com/@Limestone_music" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
                </div>
                <p>&copy; {new Date().getFullYear()} Limestone. All rights reserved.</p>
            </div>
        </footer>
    );
}

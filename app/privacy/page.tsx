import Link from "next/link";

export const metadata = { title: "Advertising Privacy" };

export default function PrivacyPage() {
    return <main className="min-h-screen bg-black text-white px-6 py-20">
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Advertising privacy</h1>
            <p>If enabled, our optional Meta Pixel loads only on /mothers-daughter and /grace, only for visits with a Meta click identifier or Meta paid-ad campaign parameters, and only after you accept advertising tracking. It sends page visits and streaming-link clicks, including the release and platform, to Meta to measure Facebook and Instagram ads and support remarketing audiences. Unmarked visits and other pages do not use our Meta Pixel.</p>
            <p>Meta’s technology can process browser and device information, IP addresses, cookies, and advertising click identifiers. A streaming-link click is not a confirmed stream or purchase. We do not include names, email addresses, or booking messages in our custom streaming event.</p>
            <p>Your advertising choice is stored locally in your browser. You can change it using “Ad privacy settings.” Declining prevents our Meta Pixel from loading; withdrawing permission stops future tracking from our integration but does not erase data previously received by Meta.</p>
            <p>This advertising choice controls our Meta Pixel, not separate Vercel analytics or embedded media. Spotify players and external streaming services operate under their own privacy policies.</p>
            <p>See <a href="https://www.facebook.com/privacy/policy/" className="underline">Meta’s Privacy Policy</a>. Questions: <a href="mailto:official.limestone.band@gmail.com" className="underline">official.limestone.band@gmail.com</a>.</p>
            <Link href="/" className="underline">Back to Limestone</Link>
        </div>
    </main>;
}

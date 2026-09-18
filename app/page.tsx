import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MusicSection from "@/components/MusicSection";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { getTourDates } from "@/lib/getTourDates";

const EPSection = dynamic(() => import("@/components/EPSection"));
const TourSection = dynamic(() => import("@/components/TourSection"));
const MerchSection = dynamic(() => import("@/components/MerchSection"));
const AboutSection = dynamic(() => import("@/components/AboutSection"));
const ContactSection = dynamic(() => import("@/components/ContactSection"));
const StarBackground = dynamic(() => import("@/components/StarBackground"));


export const revalidate = 60;

export default async function Home() {
  const tourDates = await getTourDates();

  return (
    <main className="bg-black min-h-screen">
      <Navigation />
      <HeroSection />

      {/* Spacer before Upcoming section */}
      <div className="h-32 md:h-48 bg-black" />

      <MusicSection
        title="Mother’s Daughter"
        background="/images/grace_background.webp"
        embedUrl="https://open.spotify.com/embed/album/0TN7dJi171h0S8gWcgTGoE?utm_source=generator&theme=0"
        href="/mothers-daughter"
        label="New Single Out Now"
      />
      {/* <MusicSection id="grace" /> */}
      <EPSection />

      {/* Unified Bottom Section with Star Background */}
      <div className="relative bg-black overflow-hidden pointer-events-auto ">
        {/* Shared Background Element */}
        <StarBackground />

        {/* Sections */}
        <div className="relative z-10">
          <TourSection tourDates={tourDates} />
          <MerchSection />
          <AboutSection />
          <ContactSection />
        </div>
      </div>
      <Footer />
    </main>
  );
}

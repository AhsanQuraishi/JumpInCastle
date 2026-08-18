import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Attractions from "@/components/Attractions";
import ParkMap from "@/components/ParkMap";
import Parties from "@/components/Parties";
import Schools from "@/components/Schools";
import Membership from "@/components/Membership";
import Safety from "@/components/Safety";
import Gallery from "@/components/Gallery";
import Hours from "@/components/Hours";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Navbar />
      <Hero />
      <Marquee />
      <Attractions />
      <ParkMap />
      <Parties />
      <Schools />
      <Membership />
      <Safety />
      <Gallery />
      <Hours />
      <Faq />
      <Footer />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Book A Slot — Jump In Castle",
  description: "Pick a date and time and reserve your spot at Jump In Castle.",
};

export default function BookPage() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Navbar />

      <section style={{ padding: "70px 40px 90px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "#22d3ee", marginBottom: 12 }}>
              Reserve Your Spot
            </div>
            <h1
              style={{
                fontFamily: "var(--font-archivo-black)",
                fontSize: "clamp(34px,5vw,60px)",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              Book A Slot
            </h1>
            <p style={{ maxWidth: 560, margin: "18px auto 0", color: "rgba(255,255,255,.6)", fontSize: 16 }}>
              Pick a date and time — we&apos;ll hold your spot. Weekends fill up fast.
            </p>
          </div>

          <BookingForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}

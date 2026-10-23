import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import ConfettiLayer from "@/components/ConfettiLayer";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "Jump In Castle — Multan's Biggest Indoor Adventure Park",
  description:
    "19 next-level attractions under one roof — trampolines, ninja courses, laser tag, immersive projection rooms and a whole lot more. Now open in Multan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ScrollProgress />
        <div className="jic-grain" />
        <ConfettiLayer />
        {children}
      </body>
    </html>
  );
}

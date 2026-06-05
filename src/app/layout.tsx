import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "NEKI | Humanity, Delivered.",
  description: "NEKI makes helping people as fast, trusted, and actionable as modern commerce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${playfair.variable} h-full antialiased bg-background text-foreground`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-neki-orange selection:text-white relative">
        <a 
          href="https://forms.gle/NU1WrPnAcR5AyWdz5" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="fixed top-6 right-6 z-50 bg-foreground text-background px-6 py-3 rounded-full font-medium text-sm shadow-xl hover:bg-gray-800 transition-all hover:scale-105"
        >
          Join <span className="text-neki-gold font-playfair italic font-bold">Neki</span> Waitlist
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

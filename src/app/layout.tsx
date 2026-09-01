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
  metadataBase: new URL("https://neki.io"),
  title: "NEKI | India's Live Network of Human Goodness",
  description: "NEKI makes helping people as fast, trusted, and actionable as modern commerce. Track every contribution, verify every mission, and see your impact live.",
  keywords: ["Neki", "Neki for India", "Human goodness network", "social good", "volunteering India", "transparent charity", "NGO coordination India", "verified impact tracking"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NEKI | India's Live Network of Human Goodness",
    description: "Track every contribution, verify every mission, and see your impact live.",
    url: "https://neki.io",
    siteName: "NEKI",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 1200,
        alt: "NEKI – Humanity, Delivered.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEKI | India's Live Network of Human Goodness",
    description: "Track every contribution, verify every mission, and see your impact live.",
    creator: "@nekiforindia",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { WaitlistButton } from "@/components/WaitlistButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NEKI",
    "url": "https://neki.io",
    "logo": "https://neki.io/icon.png",
    "sameAs": [
      "https://www.instagram.com/nekiforindia",
      "https://www.linkedin.com/company/nekiforindia"
    ]
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${playfair.variable} h-full antialiased bg-background text-foreground`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-neki-orange selection:text-white relative">
        <WaitlistButton />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

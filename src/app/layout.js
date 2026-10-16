import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from 'next';
import "./globals.css";
import Header from "./HeaderFooter/Headers";
import Footers from "./HeaderFooter/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s · Addis Eats",
    default: "Addis Eats — food delivery in Addis Ababa",
  },
  description:
    "Traditional Ethiopian food delivered from local kitchens in Addis Ababa.",
  openGraph: {
    siteName: "Addis Eats",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og/imag/hero.webp", width: 1200, height: 630, alt: "Addis Eats" }],
  },
};

const siteJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Addis Eats",
      url: SITE_URL,
      description:
        "Traditional Ethiopian food delivered from local kitchens in Addis Ababa.",
      areaServed: { "@type": "City", name: "Addis Ababa" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Addis Eats",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
}).replace(/</g, "\\u003c");



export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
        <body className="app-body">
          <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: siteJsonLd }}
        />
          <Header />
          {children}
          <Footers />
        </body>
      
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Analytic Bytes — Decision systems architecture, built fast.",
  description:
    "Most data problems are decision problems. Analytic Bytes builds custom decision-system architecture in 90-day arcs — measurement and AI for rigor and speed.",
  metadataBase: new URL("https://analyticbytes.systems"),
  openGraph: {
    title: "Analytic Bytes — Decision systems architecture, built fast.",
    description:
      "Most data problems are decision problems. Fix the system. 90-day operating arcs for decision-grade outcomes.",
    type: "website",
    url: "https://analyticbytes.systems",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Analytic Bytes — Decision systems architecture, built fast.",
    description: "Most data problems are decision problems. Fix the system.",
    images: ["/og-image.png"],
  },
  themeColor: "#FFFFFF",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans bg-bg text-ink">{children}</body>
    </html>
  );
}

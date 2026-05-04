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

export const metadata = {
  title: "Analytic Bytes — Decision Systems Architecture",
  description:
    "Decision systems architecture with senior leadership depth for teams that need data to move execution, align ownership, and build repeatable operating rhythms.",
  openGraph: {
    title: "Analytic Bytes — Decision Systems Architecture",
    description:
      "Decision systems architecture with senior leadership depth for teams that need data to move execution, align ownership, and build repeatable operating rhythms.",
    url: "https://analyticbytes.systems",
    siteName: "Analytic Bytes",
    images: [
      {
        url: "https://analyticbytes.systems/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Analytic Bytes — From fragmented to decision-ready",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Analytic Bytes — Decision Systems Architecture",
    description:
      "Decision systems architecture with senior leadership depth for teams that need data to move execution, align ownership, and build repeatable operating rhythms.",
    images: ["https://analyticbytes.systems/og-image.jpg"],
  },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans bg-bg text-ink">{children}</body>
    </html>
  );
}

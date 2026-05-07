import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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
    "Decision systems architecture with measurement-science depth for teams that need data to move execution, align ownership, and build repeatable operating rhythms.",
  metadataBase: new URL("https://analyticbytes.systems"),
  openGraph: {
    title: "Analytic Bytes — Decision systems architecture, built fast.",
    description:
      "Decision systems architecture with measurement-science depth for teams that need data to move execution, align ownership, and build repeatable operating rhythms.",
    type: "website",
    url: "https://analyticbytes.systems",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Analytic Bytes — Decision systems architecture, built fast.",
    description:
      "Decision systems architecture with measurement-science depth for teams that need data to move execution, align ownership, and build repeatable operating rhythms.",
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
      <body className="font-sans bg-bg text-ink">
        {children}
        {/* Cloudflare Web Analytics — privacy-respecting, cookieless */}
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "f88e873520b34ca4ac7638d3e75478ef"}'
        />
      </body>
    </html>
  );
}

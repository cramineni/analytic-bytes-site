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
  title: "Analytic Bytes — Decision systems architecture, built for action.",
  description:
    "Decision systems architecture with measurement-science depth for teams that need data to move execution, align ownership, and build repeatable operating rhythms.",
  metadataBase: new URL("https://analyticbytes.systems"),
  openGraph: {
    title: "Analytic Bytes — Decision systems architecture, built for action.",
    description:
      "Decision systems architecture with measurement-science depth for teams that need data to move execution, align ownership, and build repeatable operating rhythms.",
    type: "website",
    url: "https://analyticbytes.systems",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Analytic Bytes — Decision systems architecture, built for action.",
    description:
      "Decision systems architecture with measurement-science depth for teams that need data to move execution, align ownership, and build repeatable operating rhythms.",
    images: ["/og-image.png"],
  },
  themeColor: "#FFFFFF",
  // Favicons were pointed at logo.png: a 1254x1254, 801KB PNG served as the
  // tab icon on every page load, and as the Apple touch icon, where a
  // non-square source gets letterboxed. The correctly sized assets were
  // already in public/ and simply unused.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
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

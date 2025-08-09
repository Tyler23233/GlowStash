// app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "GlowStash — Discover & Track Your Favorite Beauty Products",
    template: "%s — GlowStash",
  },
  description:
    "Track your stash, build wishlists, and jump to trusted retailers. Price-drop alerts across Sephora, Ulta, Amazon, and more.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL("https://your-domain.com"), // ← replace with your live domain
  openGraph: {
    title: "GlowStash",
    description:
      "Discover & track your favorite beauty products across top retailers.",
    url: "https://your-domain.com",
    siteName: "GlowStash",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-[#0b0c14] text-white antialiased">
        <AffiliateDisclosure />
        <SiteHeader />
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}

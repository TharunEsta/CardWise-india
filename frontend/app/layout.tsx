import type React from "react";
import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import "./globals.css";

import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { Spotlight } from "@/components/shared/spotlight";
import { Providers } from "@/components/providers";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "CardWise India",
  description: "Premium free credit card discovery and comparison platform for India.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "CardWise India",
    description: "Find the best credit card in India with a premium comparison experience.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        <Providers>
          <Spotlight />
          <div className="relative z-10">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

import type React from "react";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { SidebarProvider } from "@/components/sidebar-context";
import { ThemeProvider } from "@/components/theme-provider";
import { FloatingNavbar } from "@/components/floating-navbar";
import "katex/dist/katex.min.css";

// import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from 'next/font/local'
import {
  Inter,
  JetBrains_Mono,
} from "next/font/google";

// Initialize fonts

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const amoriaregular = localFont({
  src: '../public/fonts/en/AMORIARegular.woff2',
  variable: '--font-amoria-regular',
  display: 'swap',
});
const mozillaHeadline = localFont({
  src: '../public/fonts/en/MozillaHeadline-Regular.woff2',
  variable: '--font-mozilla-headline',
  display: 'swap',
});
const philosopher = localFont({
  src: '../public/fonts/en/Philosopher.woff2',
  variable: '--font-philosopher',
  display: 'swap',
});

import { siteConfig } from "@/lib/config";
import ServiceWorkerRegistrar from "@/components/service-worker-registrar";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: "%s | Blogfolio",
    default: siteConfig.title,
  },
  description: siteConfig.description,
  generator: "PrasadM",
  creator: "Project Team",
  publisher: "Project Team",
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
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Blogfolio",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(siteConfig.title)}`,
        width: 1200,
        height: 630,
        alt: siteConfig.description,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`/api/og?title=${encodeURIComponent(siteConfig.title)}`],
  },
  icons: {
    icon: "/img/favicon/icons8_project_management.ico",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Blogfolio",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${amoriaregular.variable} ${mozillaHeadline.variable} ${philosopher.variable}`}>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <FloatingNavbar className="hidden lg:flex" />
            <Navigation />
            <main className="transition-[padding] duration-300 lg:pl-[var(--sidebar-width,256px)]">
              {children}
            </main>
            <SpeedInsights />
            <ServiceWorkerRegistrar />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
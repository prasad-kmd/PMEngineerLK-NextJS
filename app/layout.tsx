import type React from "react";
import type { Metadata } from "next";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import localFont from "next/font/local";

const amoriaregular = localFont({
  src: "../public/fonts/en/AMORIARegular.woff2",
  variable: "--font-amoria-regular",
  display: "swap",
  preload: true,
});
const mozillaHeadline = localFont({
  src: "../public/fonts/en/MozillaHeadline-Regular.woff2",
  variable: "--font-mozilla-headline",
  display: "swap",
  preload: true,
});
const philosopher = localFont({
  src: "../public/fonts/en/Philosopher.woff2",
  variable: "--font-philosopher",
  display: "swap",
  preload: true,
});

const googleSans = localFont({
  src: "../public/fonts/GoogleSans-Regular.woff2",
  variable: "--font-google-sans",
  display: "swap",
  preload: true,
});

const mozillaText = localFont({
  src: [
    {
      path: "../public/fonts/MozillaText-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/MozillaText-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
  ],
  variable: "--font-mozilla-text",
  display: "swap",
  preload: false,
});

const notoSans = localFont({
  src: "../public/fonts/NotoSans-Regular.woff2",
  variable: "--font-noto-sans",
  display: "swap",
  preload: false,
});

const notoSansDisplay = localFont({
  src: "../public/fonts/NotoSansDisplay-Regular.woff2",
  variable: "--font-noto-sans-display",
  display: "swap",
  preload: false,
});

const notoSerifSinhala = localFont({
  src: "../public/fonts/NotoSerifSinhala-Regular.woff2",
  variable: "--font-noto-serif-sinhala",
  display: "swap",
  preload: false,
});

const roboto = localFont({
  src: "../public/fonts/Roboto-Regular.woff2",
  variable: "--font-roboto",
  display: "swap",
  preload: false,
});

const spaceMono = localFont({
  src: "../public/fonts/SpaceMono-Regular.woff2",
  variable: "--font-space-mono",
  display: "swap",
  preload: false,
});

const localInter = localFont({
  src: "../public/fonts/Inter-Regular.woff2",
  variable: "--font-local-inter",
  display: "swap",
  preload: true,
});

const localJetBrainsMono = localFont({
  src: "../public/fonts/JetBrainsMono-Regular.woff2",
  variable: "--font-local-jetbrains-mono",
  display: "swap",
  preload: false,
});

import { siteConfig } from "@/lib/config";
import { ClientProviders } from "@/components/client-providers";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: "%s | PrasadM Blogfolio",
    default: siteConfig.title,
  },
  description: siteConfig.description,
  generator: siteConfig.author,
  creator: siteConfig.author,
  publisher: siteConfig.author,
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
    siteName: `${siteConfig.author}'s Workspace`,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(siteConfig.title)}`,
        width: 1280,
        height: 720,
        alt: siteConfig.description,
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`/api/og?title=${encodeURIComponent(siteConfig.title)}`],
  },
  icons: {
    icon: [
      { url: "/img/favicon/favicon-32.ico" },
      {
        url: "/img/favicon/favicon-16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/img/favicon/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/img/favicon/favicon-64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        url: "/img/favicon/favicon-128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        url: "/img/favicon/favicon-256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        url: "/img/favicon/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/img/favicon/favicon-16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/img/favicon/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/img/favicon/favicon-64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        url: "/img/favicon/favicon-128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        url: "/img/favicon/favicon-256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        url: "/img/favicon/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: `${siteConfig.author} Blogfolio`,
  },
  verification: {
    google: "TymVN0yJdgi74htfNZ1E3oGvCs12mHv-5nnw3dSTpnE",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${amoriaregular.variable} ${mozillaHeadline.variable} ${philosopher.variable} ${googleSans.variable} ${mozillaText.variable} ${notoSans.variable} ${notoSansDisplay.variable} ${notoSerifSinhala.variable} ${roboto.variable} ${spaceMono.variable} ${localInter.variable} ${localJetBrainsMono.variable} antialiased selection:bg-brand-200 selection:text-brand-900`}
        suppressHydrationWarning
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

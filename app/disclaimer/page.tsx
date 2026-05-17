import type { Metadata } from "next";
import DisclaimerPage from "./disclaimer-client";
import { AIContentIndicator } from "@/components/ai-content-indicator";

const title = "Disclaimer";
const description =
  "Legal disclaimer for the engineering documentation platform.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/disclaimer",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(title)}`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`/api/og?title=${encodeURIComponent(title)}`],
  },
};

export default function Page() {
  return (
    <>
      <DisclaimerPage />
      <AIContentIndicator />
    </>
  );
}

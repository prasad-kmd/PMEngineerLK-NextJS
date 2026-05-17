import type { Metadata } from "next";
import PrivacyPolicyPage from "./privacy-policy-client";
import { AIContentIndicator } from "@/components/ai-content-indicator";

const title = "Privacy Policy";
const description = "How we collect, use, and protect your personal information.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/privacy-policy",
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
      <PrivacyPolicyPage />
      <AIContentIndicator />
    </>
  );
}

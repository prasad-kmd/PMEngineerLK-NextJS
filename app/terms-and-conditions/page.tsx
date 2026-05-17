import type { Metadata } from "next";
import TermsAndConditionsPage from "./terms-client";
import { AIContentIndicator } from "@/components/ai-content-indicator";

export const metadata: Metadata = {
  title: "Terms and Conditions | PrasadM Blogfolio",
  description:
    "Terms and conditions for the engineering documentation platform.",
  openGraph: {
    title: "Terms and Conditions | PrasadM Blogfolio",
    description:
      "Terms and conditions for the engineering documentation platform.",
    url: "/terms-and-conditions",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Terms and Conditions")}`,
        width: 1200,
        height: 630,
        alt: "Terms and Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions | PrasadM Blogfolio",
    description:
      "Terms and conditions for the engineering documentation platform.",
    images: [`/api/og?title=${encodeURIComponent("Terms and Conditions")}`],
  },
};

export default function Page() {
  return (
    <>
      <TermsAndConditionsPage />
      <AIContentIndicator />
    </>
  );
}

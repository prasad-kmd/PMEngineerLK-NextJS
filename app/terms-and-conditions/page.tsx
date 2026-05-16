import type { Metadata } from "next";
import TermsAndConditionsPage from "./terms-client";
import { AIContentIndicator } from "@/components/ai-content-indicator";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for the engineering documentation platform.",
};

export default function Page() {
  return (
    <>
      <TermsAndConditionsPage />
      <AIContentIndicator />
    </>
  );
}
